"""
소비패턴 분석 모델 훈련 스크립트
- 부채 관련 특성 제외
- 순수 소비패턴만 분석
- 소득/지출/저축 비율은 별도 rule-based 처리
"""
import numpy as np
import pandas as pd
import pickle
import joblib
from datetime import datetime
from sklearn.model_selection import train_test_split, GridSearchCV, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.metrics import accuracy_score, roc_auc_score, confusion_matrix, classification_report
from sklearn.metrics import log_loss
from utils import RANDOM_SEED, show_importance
import warnings
warnings.filterwarnings('ignore')

class ConsumptionPatternModel:
    """
    소비패턴 분석 모델
    - 소비 구조와 거래 패턴만 분석
    - 소득/지출/저축 비율은 별도 처리
    """
    
    def __init__(self, use_lightgbm=True, tune_hyperparams=True, calibrate_probs=True):
        self.use_lightgbm = use_lightgbm
        self.tune_hyperparams = tune_hyperparams
        self.calibrate_probs = calibrate_probs
        self.regressor = None
        self.classifier = None
        self.calibrated_classifier = None
        self.scaler = None
        self.feature_names = None
        self.training_metadata = {}
        self.data_quality_report = {}
    
    def validate_data_quality(self, df):
        """데이터 품질 검증 및 정제"""
        print("\n데이터 품질 검증 시작...")
        original_size = len(df)
        
        # 필수 컬럼 (부채 관련 제외)
        required_cols = ['total_spending', 'mean_spending', 'n_transactions',
                        '교육육아', '교통', '기타소비', '보건의료', '식료품음료', '오락문화', '주거',
                        'est_income_만원', '재무건전_점수', '재무건전_라벨']
        
        missing_cols = [col for col in required_cols if col not in df.columns]
        if missing_cols:
            raise ValueError(f"필수 컬럼 누락: {missing_cols}")
        
        df_clean = df.copy()
        
        # 라벨 누락 샘플 제거
        before_label_clean = len(df_clean)
        df_clean = df_clean.dropna(subset=['재무건전_점수', '재무건전_라벨'])
        label_removed = before_label_clean - len(df_clean)
        
        # 음수값 및 이상치 제거
        numeric_cols = ['total_spending', 'mean_spending', 'n_transactions', 'est_income_만원']
        for col in numeric_cols:
            before_clean = len(df_clean)
            df_clean = df_clean[df_clean[col] > 0]
            # 이상치 제거 (IQR 방법)
            Q1 = df_clean[col].quantile(0.25)
            Q3 = df_clean[col].quantile(0.75)
            IQR = Q3 - Q1
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            df_clean = df_clean[(df_clean[col] >= lower_bound) & (df_clean[col] <= upper_bound)]
            outliers_removed = before_clean - len(df_clean)
            if outliers_removed > 0:
                print(f"{col}: {outliers_removed}개 이상치 제거")
        
        # 비율 컬럼 합계 검증
        ratio_cols = ['교육육아', '교통', '기타소비', '보건의료', '식료품음료', '오락문화', '주거']
        df_clean['ratio_sum'] = df_clean[ratio_cols].sum(axis=1)
        before_ratio_clean = len(df_clean)
        df_clean = df_clean[(df_clean['ratio_sum'] >= 0.9) & (df_clean['ratio_sum'] <= 1.1)]
        ratio_removed = before_ratio_clean - len(df_clean)
        df_clean = df_clean.drop('ratio_sum', axis=1)
        
        # 누락값 처리
        for col in ratio_cols:
            df_clean[col] = df_clean[col].fillna(0)
        
        for col in ['total_spending', 'mean_spending', 'est_income_만원']:
            if df_clean[col].isnull().any():
                median_val = df_clean[col].median()
                df_clean[col] = df_clean[col].fillna(median_val)
                print(f"{col}: 누락값을 중앙값({median_val:.2f})으로 채움")
        
        df_clean['n_transactions'] = df_clean['n_transactions'].fillna(0)
        
        # 데이터 품질 리포트
        self.data_quality_report = {
            'original_size': original_size,
            'final_size': len(df_clean),
            'removed_samples': original_size - len(df_clean),
            'label_removed': label_removed,
            'ratio_removed': ratio_removed,
            'removal_rate': (original_size - len(df_clean)) / original_size * 100
        }
        
        print(f"데이터 정제 완료: {original_size} → {len(df_clean)} ({self.data_quality_report['removal_rate']:.1f}% 제거)")
        
        return df_clean
    
    def engineer_consumption_features(self, df):
        """소비패턴 특성 공학 (소득/지출 비율 제외)"""
        df_eng = df.copy()
        
        # 1. 소비 구조 특성
        df_eng['essential_spending_ratio'] = df_eng['주거'] + df_eng['식료품음료'] + df_eng['보건의료']
        df_eng['discretionary_spending_ratio'] = df_eng['오락문화'] + df_eng['기타소비']
        df_eng['investment_spending_ratio'] = df_eng['교육육아']  # 투자성 지출
        df_eng['transport_spending_ratio'] = df_eng['교통']
        
        # 2. 거래 패턴 특성
        df_eng['avg_transaction_size'] = df_eng['total_spending'] / (df_eng['n_transactions'] + 1)
        df_eng['transaction_frequency_score'] = np.where(
            (df_eng['n_transactions'] >= 50) & (df_eng['n_transactions'] <= 300), 1, 0
        )
        
        # 3. 소비 균형도 (표준편차 기반)
        spending_cols = ['교육육아', '교통', '기타소비', '보건의료', '식료품음료', '오락문화', '주거']
        df_eng['spending_balance_score'] = 1 / (1 + df_eng[spending_cols].std(axis=1))
        
        # 4. 합리적 소비 패턴 점수
        df_eng['rational_spending_score'] = (
            (df_eng['essential_spending_ratio'] >= 0.4) & (df_eng['essential_spending_ratio'] <= 0.7) &
            (df_eng['discretionary_spending_ratio'] <= 0.3) &
            (df_eng['investment_spending_ratio'] >= 0.05)
        ).astype(int)
        
        # 5. 지출 크기별 더미 변수 (소득 대비가 아닌 절대적 크기)
        df_eng['spending_low'] = (df_eng['total_spending'] < 200).astype(int)
        df_eng['spending_mid'] = ((df_eng['total_spending'] >= 200) & (df_eng['total_spending'] < 400)).astype(int)
        df_eng['spending_high'] = (df_eng['total_spending'] >= 400).astype(int)
        
        return df_eng
    
    def prepare_features(self, df):
        """소비패턴 특성 준비"""
        # 데이터 품질 검증
        df_clean = self.validate_data_quality(df)
        
        # 소비패턴 특성 공학
        df_eng = self.engineer_consumption_features(df_clean)
        
        # 소비패턴 분석용 특성 선택 (소득 제외)
        base_features = ['total_spending', 'mean_spending', 'n_transactions',
                        '교육육아', '교통', '기타소비', '보건의료', '식료품음료', '오락문화', '주거']
        
        consumption_features = ['essential_spending_ratio', 'discretionary_spending_ratio',
                               'investment_spending_ratio', 'transport_spending_ratio',
                               'avg_transaction_size', 'transaction_frequency_score',
                               'spending_balance_score', 'rational_spending_score',
                               'spending_low', 'spending_mid', 'spending_high']
        
        feature_cols = base_features + consumption_features
        
        X = df_eng[feature_cols].copy()
        
        # 소비패턴 점수로 변환 (0-100 → 0-80, 나머지 20점은 소득/지출/저축 비율로)
        y_reg = (df_eng['재무건전_점수'] * 0.8).copy()  # 소비패턴은 80% 기여
        y_cls = df_eng['재무건전_라벨'].copy()
        
        self.feature_names = feature_cols
        
        print(f"\n소비패턴 특성 준비 완료: {len(feature_cols)}개 특성, {len(X)}개 샘플")
        print(f"특성 목록: {feature_cols}")
        
        return X, y_reg, y_cls
    
    def _get_base_models(self):
        """기본 모델 생성"""
        if self.use_lightgbm:
            try:
                from lightgbm import LGBMRegressor, LGBMClassifier
                
                base_params = {
                    'random_state': RANDOM_SEED,
                    'verbosity': -1,
                    'force_col_wise': True,
                }
                
                reg = LGBMRegressor(
                    n_estimators=400,
                    num_leaves=31,
                    learning_rate=0.05,
                    feature_fraction=0.8,
                    bagging_fraction=0.8,
                    bagging_freq=5,
                    min_data_in_leaf=20,
                    lambda_l1=0.1,
                    lambda_l2=0.1,
                    **base_params
                )
                
                clf = LGBMClassifier(
                    n_estimators=400,
                    num_leaves=31,
                    learning_rate=0.05,
                    feature_fraction=0.8,
                    bagging_fraction=0.8,
                    bagging_freq=5,
                    min_data_in_leaf=20,
                    lambda_l1=0.1,
                    lambda_l2=0.1,
                    class_weight='balanced',
                    **base_params
                )
                
                return reg, clf
            except ImportError:
                print("LightGBM not available, falling back to RandomForest")
        
        from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
        reg = RandomForestRegressor(
            n_estimators=400, 
            max_depth=10,
            min_samples_split=10,
            min_samples_leaf=5,
            random_state=RANDOM_SEED
        )
        clf = RandomForestClassifier(
            n_estimators=400,
            max_depth=10,
            min_samples_split=10,
            min_samples_leaf=5,
            random_state=RANDOM_SEED, 
            class_weight="balanced"
        )
        return reg, clf
    
    def train(self, df, test_size=0.2):
        """모델 훈련"""
        print(f"\n=== 소비패턴 모델 학습 시작 ({datetime.now().strftime('%Y-%m-%d %H:%M:%S')}) ===")
        
        # 데이터 준비
        X, y_reg, y_cls = self.prepare_features(df)
        
        # 데이터 분할
        X_train, X_test, y_reg_train, y_reg_test, y_cls_train, y_cls_test = train_test_split(
            X, y_reg, y_cls, test_size=test_size, random_state=RANDOM_SEED, stratify=y_cls
        )
        
        print(f"데이터 분할: Train({len(X_train)}) / Test({len(X_test)})")
        
        # 특성 스케일링
        self.scaler = StandardScaler()
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # 모델 학습
        self.regressor, self.classifier = self._get_base_models()
        self.regressor.fit(X_train, y_reg_train)
        self.classifier.fit(X_train, y_cls_train)
        
        # 확률 보정
        if self.calibrate_probs:
            print("확률 보정 수행...")
            self.calibrated_classifier = CalibratedClassifierCV(
                self.classifier, method='isotonic', cv=3
            )
            self.calibrated_classifier.fit(X_train, y_cls_train)
        
        # 예측 및 평가
        y_reg_pred = self.regressor.predict(X_test)
        y_cls_pred = self.classifier.predict(X_test)
        y_cls_proba = self.classifier.predict_proba(X_test)
        
        if self.calibrated_classifier:
            y_cls_pred_cal = self.calibrated_classifier.predict(X_test)
            y_cls_proba_cal = self.calibrated_classifier.predict_proba(X_test)
        
        # 메트릭 계산
        rmse = np.sqrt(mean_squared_error(y_reg_test, y_reg_pred))
        mae = mean_absolute_error(y_reg_test, y_reg_pred)
        r2 = r2_score(y_reg_test, y_reg_pred)
        
        acc = accuracy_score(y_cls_test, y_cls_pred)
        try:
            auc = roc_auc_score(y_cls_test, y_cls_proba, multi_class='ovr', average='macro')
        except Exception:
            auc = np.nan
        
        try:
            logloss = log_loss(y_cls_test, y_cls_proba)
        except Exception:
            logloss = np.nan
        
        cm = confusion_matrix(y_cls_test, y_cls_pred)
        
        # 학습 메타데이터
        self.training_metadata = {
            'timestamp': datetime.now().isoformat(),
            'model_type': 'ConsumptionPattern_LightGBM' if self.use_lightgbm else 'ConsumptionPattern_RandomForest',
            'model_purpose': 'consumption_pattern_analysis',
            'score_contribution': 0.8,  # 전체 점수의 80% 기여
            'n_features': len(self.feature_names),
            'n_samples': len(X),
            'train_size': len(X_train),
            'test_size': len(X_test),
            'class_distribution': dict(pd.Series(y_cls_train).value_counts().sort_index()),
            'data_quality': self.data_quality_report
        }
        
        # 결과 정리
        results = {
            'regression': {
                'rmse': rmse,
                'mae': mae,
                'r2': r2,
                'predictions': pd.DataFrame({
                    '실제': y_reg_test.values, 
                    '예측': np.round(y_reg_pred, 1)
                })
            },
            'classification': {
                'accuracy': acc,
                'auc': auc,
                'log_loss': logloss,
                'confusion_matrix': cm,
                'classification_report': classification_report(y_cls_test, y_cls_pred),
                'predictions': pd.DataFrame({
                    '실제': y_cls_test.values, 
                    '예측': y_cls_pred
                })
            },
            'metadata': self.training_metadata
        }
        
        if self.calibrated_classifier:
            acc_cal = accuracy_score(y_cls_test, y_cls_pred_cal)
            try:
                logloss_cal = log_loss(y_cls_test, y_cls_proba_cal)
            except Exception:
                logloss_cal = np.nan
                
            results['calibrated_classification'] = {
                'accuracy': acc_cal,
                'log_loss': logloss_cal,
                'predictions': pd.DataFrame({
                    '실제': y_cls_test.values, 
                    '예측': y_cls_pred_cal
                })
            }
        
        return results
    
    def predict(self, X):
        """소비패턴 점수 예측 (0-80점)"""
        if self.regressor is None or self.classifier is None:
            raise ValueError("Models not trained yet. Call train() first.")
        
        if isinstance(X, pd.DataFrame):
            X_pred = X[self.feature_names].values
        else:
            X_pred = X
        
        if self.scaler is not None:
            X_pred = self.scaler.transform(X_pred)
        
        consumption_score = self.regressor.predict(X_pred)
        risk_class = self.classifier.predict(X_pred)
        
        try:
            risk_proba = self.classifier.predict_proba(X_pred)
        except Exception:
            risk_proba = None
        
        if self.calibrated_classifier:
            try:
                risk_class_cal = self.calibrated_classifier.predict(X_pred)
                risk_proba_cal = self.calibrated_classifier.predict_proba(X_pred)
                
                return {
                    'consumption_score': consumption_score,  # 0-80점
                    'risk_classification': risk_class_cal,
                    'risk_probabilities': risk_proba_cal,
                    'uncalibrated_classification': risk_class,
                    'uncalibrated_probabilities': risk_proba
                }
            except Exception:
                pass
        
        return {
            'consumption_score': consumption_score,
            'risk_classification': risk_class,
            'risk_probabilities': risk_proba
        }
    
    def get_feature_importance(self, model_type='both', topn=10):
        """특성 중요도 분석"""
        results = {}
        
        if model_type in ['regression', 'both'] and self.regressor is not None:
            show_importance(self.regressor, self.feature_names, topn)
            results['regression'] = pd.Series(
                self.regressor.feature_importances_, 
                index=self.feature_names
            ).sort_values(ascending=False)
        
        if model_type in ['classification', 'both'] and self.classifier is not None:
            show_importance(self.classifier, self.feature_names, topn)
            results['classification'] = pd.Series(
                self.classifier.feature_importances_, 
                index=self.feature_names
            ).sort_values(ascending=False)
        
        return results
    
    def save_model(self, filepath):
        """모델 저장"""
        model_data = {
            'regressor': self.regressor,
            'classifier': self.calibrated_classifier if self.calibrated_classifier else self.classifier,
            'scaler': self.scaler,
            'feature_names': self.feature_names,
            'training_metadata': self.training_metadata,
            'data_quality_report': self.data_quality_report,
            'model_version': 'consumption_pattern_v1.0'
        }
        
        with open(filepath, 'wb') as f:
            pickle.dump(model_data, f)
        
        print(f"소비패턴 모델 저장 완료: {filepath}")

def train_consumption_pattern_model(df, use_lightgbm=True, test_size=0.2):
    """소비패턴 모델 훈련 함수"""
    model = ConsumptionPatternModel(
        use_lightgbm=use_lightgbm,
        tune_hyperparams=False,  # 빠른 훈련을 위해 비활성화
        calibrate_probs=True
    )
    results = model.train(df, test_size=test_size)
    
    # 결과 출력
    print(f"\n=== 소비패턴 모델 학습 결과 ===")
    print(f"[회귀] RMSE={results['regression']['rmse']:.3f} | "
          f"MAE={results['regression']['mae']:.3f} | "
          f"R²={results['regression']['r2']:.3f}")
    print(results['regression']['predictions'].head(10))
    
    auc_str = f"{results['classification']['auc']:.3f}" if not np.isnan(results['classification']['auc']) else 'NA'
    logloss_str = f"{results['classification']['log_loss']:.3f}" if not np.isnan(results['classification']['log_loss']) else 'NA'
    print(f"\n[분류] ACC={results['classification']['accuracy']:.3f} | AUC={auc_str} | LogLoss={logloss_str}")
    print(f"CM:\n{results['classification']['confusion_matrix']}")
    
    if 'calibrated_classification' in results:
        cal_logloss_str = f"{results['calibrated_classification']['log_loss']:.3f}" if not np.isnan(results['calibrated_classification']['log_loss']) else 'NA'
        print(f"[보정된 분류] ACC={results['calibrated_classification']['accuracy']:.3f} | LogLoss={cal_logloss_str}")
    
    # 특성 중요도
    model.get_feature_importance('both')
    
    return model, results

if __name__ == "__main__":
    print("소비패턴 분석 모델 훈련 스크립트")
    
    try:
        # 데이터 로드
        df = pd.read_csv('data/synth_finance_scored_final.csv')
        print(f"데이터 로드 완료: {len(df)} 샘플")
        
        # 모델 훈련
        model, results = train_consumption_pattern_model(
            df, 
            use_lightgbm=True, 
            test_size=0.2
        )
        
        # 모델 저장
        model.save_model('Fin_model_v1.pkl')
        
        print("\n소비패턴 모델 훈련 및 저장 완료!")
        
    except FileNotFoundError:
        print("데이터 파일을 찾을 수 없습니다. 경로를 확인해주세요.")
    except Exception as e:
        print(f"오류 발생: {e}")
        import traceback
        traceback.print_exc()
