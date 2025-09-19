"""
모델 성능 평가 및 특성 중요도 분석 스크립트
"""
import pickle
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import classification_report, confusion_matrix
import warnings
warnings.filterwarnings('ignore')

def load_and_evaluate_model():
    """모델 로드 및 평가"""
    
    # 모델 로드
    with open('piggy_model_v2.pkl', 'rb') as f:
        model_data = pickle.load(f)
    
    print("=== 모델 정보 ===")
    print(f"모델 타입: {model_data['training_metadata']['model_type']}")
    print(f"학습 시간: {model_data['training_metadata']['timestamp']}")
    print(f"특성 개수: {model_data['training_metadata']['n_features']}")
    print(f"학습 샘플 수: {model_data['training_metadata']['train_size']}")
    print(f"테스트 샘플 수: {model_data['training_metadata']['test_size']}")
    
    print("\n=== 데이터 품질 리포트 ===")
    quality = model_data['data_quality_report']
    print(f"원본 데이터: {quality['original_size']} 샘플")
    print(f"정제 후 데이터: {quality['final_size']} 샘플")
    print(f"제거된 샘플: {quality['removed_samples']} ({quality['removal_rate']:.1f}%)")
    
    print("\n=== 클래스 분포 ===")
    class_dist = model_data['training_metadata']['class_distribution']
    for class_id, count in class_dist.items():
        print(f"클래스 {class_id}: {count} 샘플")
    
    print("\n=== 특성 중요도 (회귀) ===")
    reg_importance = pd.Series(
        model_data['regressor'].feature_importances_,
        index=model_data['feature_names']
    ).sort_values(ascending=False)
    
    print(reg_importance.head(10))
    
    print("\n=== 특성 중요도 (분류) ===")
    cls_importance = pd.Series(
        model_data['classifier'].feature_importances_,
        index=model_data['feature_names']
    ).sort_values(ascending=False)
    
    print(cls_importance.head(10))
    
    return model_data

def test_model_prediction():
    """모델 예측 테스트"""
    
    # 모델 로드
    with open('piggy_model_v2.pkl', 'rb') as f:
        model_data = pickle.load(f)
    
    # 테스트 데이터 생성 (샘플 데이터)
    test_samples = [
        {
            'name': '우수 사례',
            'data': {
                'total_spending': 300,
                'mean_spending': 1.2,
                'n_transactions': 250,
                '교육육아': 0.15,
                '교통': 0.12,
                '기타소비': 0.22,
                '보건의료': 0.10,
                '식료품음료': 0.15,
                '오락문화': 0.08,
                '주거': 0.18,
                'est_income_만원': 500
            }
        },
        {
            'name': '평균 사례',
            'data': {
                'total_spending': 280,
                'mean_spending': 1.8,
                'n_transactions': 156,
                '교육육아': 0.08,
                '교통': 0.15,
                '기타소비': 0.10,
                '보건의료': 0.12,
                '식료품음료': 0.18,
                '오락문화': 0.12,
                '주거': 0.25,
                'est_income_만원': 350
            }
        },
        {
            'name': '개선 필요',
            'data': {
                'total_spending': 320,
                'mean_spending': 2.5,
                'n_transactions': 128,
                '교육육아': 0.03,
                '교통': 0.18,
                '기타소비': 0.04,
                '보건의료': 0.05,
                '식료품음료': 0.20,
                '오락문화': 0.15,
                '주거': 0.35,
                'est_income_만원': 280
            }
        }
    ]
    
    print("\n=== 모델 예측 테스트 ===")
    
    for sample in test_samples:
        print(f"\n--- {sample['name']} ---")
        data = sample['data']
        
        # 기본 특성
        base_df = pd.DataFrame([data])
        
        # 파생 특성 생성
        base_df['savings_rate'] = (base_df['est_income_만원'] - base_df['total_spending']) / base_df['est_income_만원']
        base_df['savings_rate'] = base_df['savings_rate'].clip(-1, 1)
        base_df['spending_income_ratio'] = base_df['total_spending'] / base_df['est_income_만원']
        base_df['essential_spending_ratio'] = base_df['주거'] + base_df['식료품음료'] + base_df['보건의료']
        base_df['discretionary_spending_ratio'] = base_df['오락문화'] + base_df['기타소비']
        base_df['avg_transaction_size'] = base_df['total_spending'] / (base_df['n_transactions'] + 1)
        base_df['income_low'] = (base_df['est_income_만원'] < 300).astype(int)
        base_df['income_mid'] = ((base_df['est_income_만원'] >= 300) & (base_df['est_income_만원'] < 600)).astype(int)
        base_df['income_high'] = (base_df['est_income_만원'] >= 600).astype(int)
        
        # 특성 순서 맞춤
        X = base_df[model_data['feature_names']].values
        
        # 스케일링
        if model_data['scaler'] is not None:
            X_scaled = model_data['scaler'].transform(X)
        else:
            X_scaled = X
        
        # 예측
        reg_pred = model_data['regressor'].predict(X_scaled)[0]
        cls_pred = model_data['classifier'].predict(X_scaled)[0]
        cls_proba = model_data['classifier'].predict_proba(X_scaled)[0]
        
        # 저축 정보
        income = data['est_income_만원']
        spending = data['total_spending']
        savings = income - spending
        savings_rate = (savings / income) * 100
        
        print(f"소득: {income}만원, 지출: {spending}만원")
        print(f"저축: {savings}만원 ({savings_rate:.1f}%)")
        print(f"예측 점수: {reg_pred:.1f}")
        print(f"예측 위험도: {cls_pred}")
        print(f"위험도 확률: {cls_proba}")

if __name__ == "__main__":
    print("Piggy 재무건전성 모델 평가")
    print("=" * 50)
    
    try:
        # 모델 평가
        model_data = load_and_evaluate_model()
        
        # 예측 테스트
        test_model_prediction()
        
        print("\n평가 완료!")
        
    except Exception as e:
        print(f"오류 발생: {e}")
        import traceback
        traceback.print_exc()
