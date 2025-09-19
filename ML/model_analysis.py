"""
모델 분석 스크립트 - 점수 패턴 및 특성 중요도 분석
"""
import pickle
import pandas as pd
import numpy as np
from sklearn.metrics import classification_report

def analyze_model_behavior():
    """모델 행동 패턴 분석"""
    
    # 모델 로드
    with open('piggy_model_v2.pkl', 'rb') as f:
        model_data = pickle.load(f)
    
    print("=== 모델 특성 중요도 분석 ===")
    
    # 회귀 모델 특성 중요도
    reg_importance = pd.Series(
        model_data['regressor'].feature_importances_,
        index=model_data['feature_names']
    ).sort_values(ascending=False)
    
    print("\n[회귀 모델] 상위 10개 중요 특성:")
    for i, (feature, importance) in enumerate(reg_importance.head(10).items(), 1):
        print(f"{i:2d}. {feature:30s}: {importance:6.0f}")
    
    # 분류 모델 특성 중요도
    cls_importance = pd.Series(
        model_data['classifier'].feature_importances_,
        index=model_data['feature_names']
    ).sort_values(ascending=False)
    
    print("\n[분류 모델] 상위 10개 중요 특성:")
    for i, (feature, importance) in enumerate(cls_importance.head(10).items(), 1):
        print(f"{i:2d}. {feature:30s}: {importance:6.0f}")
    
    return model_data, reg_importance, cls_importance

def test_scoring_patterns():
    """다양한 시나리오에서 점수 패턴 테스트"""
    
    # 모델 로드
    with open('piggy_model_v2.pkl', 'rb') as f:
        model_data = pickle.load(f)
    
    # 테스트 시나리오
    scenarios = [
        {
            'name': '🦁 저축왕 (고소득, 낮은 지출)',
            'income': 800, 'spending': 400, 'transactions': 200, 'mean_spending': 2.0,
            'housing': 0.15, 'food': 0.12, 'transport': 0.10, 'entertainment': 0.05,
            'education': 0.20, 'medical': 0.08, 'other': 0.30
        },
        {
            'name': '🐯 금융고수 (중상위소득, 균형잡힌 지출)',
            'income': 600, 'spending': 450, 'transactions': 180, 'mean_spending': 2.5,
            'housing': 0.20, 'food': 0.15, 'transport': 0.12, 'entertainment': 0.08,
            'education': 0.15, 'medical': 0.10, 'other': 0.20
        },
        {
            'name': '🐼 균형잡힌 (중간소득, 적정 지출)',
            'income': 400, 'spending': 320, 'transactions': 150, 'mean_spending': 2.1,
            'housing': 0.25, 'food': 0.18, 'transport': 0.15, 'entertainment': 0.10,
            'education': 0.12, 'medical': 0.12, 'other': 0.08
        },
        {
            'name': '🐰 절약러 (중간소득, 낮은 지출)',
            'income': 350, 'spending': 250, 'transactions': 120, 'mean_spending': 2.1,
            'housing': 0.22, 'food': 0.20, 'transport': 0.18, 'entertainment': 0.08,
            'education': 0.10, 'medical': 0.15, 'other': 0.07
        },
        {
            'name': '🐱 보통 (중간소득, 보통 지출)',
            'income': 350, 'spending': 320, 'transactions': 140, 'mean_spending': 2.3,
            'housing': 0.28, 'food': 0.18, 'transport': 0.15, 'entertainment': 0.12,
            'education': 0.08, 'medical': 0.12, 'other': 0.07
        },
        {
            'name': '🐹 재무초보 (낮은소득, 높은 지출)',
            'income': 280, 'spending': 300, 'transactions': 100, 'mean_spending': 3.0,
            'housing': 0.35, 'food': 0.20, 'transport': 0.18, 'entertainment': 0.15,
            'education': 0.03, 'medical': 0.05, 'other': 0.04
        },
        {
            'name': '🦊 적자위험 (낮은소득, 매우 높은 지출)',
            'income': 250, 'spending': 350, 'transactions': 80, 'mean_spending': 4.4,
            'housing': 0.40, 'food': 0.22, 'transport': 0.20, 'entertainment': 0.18,
            'education': 0.00, 'medical': 0.00, 'other': 0.00
        }
    ]
    
    print("\n=== 시나리오별 점수 분석 ===")
    
    results = []
    
    for scenario in scenarios:
        # 기본 데이터 구성
        data = {
            'total_spending': scenario['spending'],
            'mean_spending': scenario['mean_spending'],
            'n_transactions': scenario['transactions'],
            '교육육아': scenario['education'],
            '교통': scenario['transport'],
            '기타소비': scenario['other'],
            '보건의료': scenario['medical'],
            '식료품음료': scenario['food'],
            '오락문화': scenario['entertainment'],
            '주거': scenario['housing'],
            'est_income_만원': scenario['income']
        }
        
        # DataFrame 생성
        df = pd.DataFrame([data])
        
        # 파생 특성 생성
        df['savings_rate'] = (df['est_income_만원'] - df['total_spending']) / df['est_income_만원']
        df['savings_rate'] = df['savings_rate'].clip(-1, 1)
        df['spending_income_ratio'] = df['total_spending'] / df['est_income_만원']
        df['essential_spending_ratio'] = df['주거'] + df['식료품음료'] + df['보건의료']
        df['discretionary_spending_ratio'] = df['오락문화'] + df['기타소비']
        df['avg_transaction_size'] = df['total_spending'] / (df['n_transactions'] + 1)
        df['income_low'] = (df['est_income_만원'] < 300).astype(int)
        df['income_mid'] = ((df['est_income_만원'] >= 300) & (df['est_income_만원'] < 600)).astype(int)
        df['income_high'] = (df['est_income_만원'] >= 600).astype(int)
        
        # 특성 순서 맞춤
        X = df[model_data['feature_names']].values
        
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
        savings = scenario['income'] - scenario['spending']
        savings_rate = (savings / scenario['income']) * 100
        
        result = {
            'scenario': scenario['name'],
            'income': scenario['income'],
            'spending': scenario['spending'],
            'savings': savings,
            'savings_rate': savings_rate,
            'score': reg_pred,
            'risk_class': cls_pred,
            'risk_proba': cls_proba
        }
        
        results.append(result)
        
        print(f"\n{scenario['name']}")
        print(f"  소득: {scenario['income']:3d}만원 | 지출: {scenario['spending']:3d}만원 | 저축: {savings:4.0f}만원 ({savings_rate:5.1f}%)")
        print(f"  예측점수: {reg_pred:5.1f} | 위험등급: {cls_pred} | 확률: {cls_proba}")
        
        # 주요 특성값 출력
        essential_ratio = scenario['housing'] + scenario['food'] + scenario['medical']
        discretionary_ratio = scenario['entertainment'] + scenario['other']
        print(f"  필수지출: {essential_ratio:.2f} | 재량지출: {discretionary_ratio:.2f} | 평균거래: {scenario['mean_spending']:.1f}만원")
    
    return results

def analyze_feature_impact():
    """특성별 영향도 분석"""
    
    print("\n=== 특성별 영향도 분석 ===")
    
    # 모델 로드
    with open('piggy_model_v2.pkl', 'rb') as f:
        model_data = pickle.load(f)
    
    # 기준 시나리오 (중간 수준)
    base_scenario = {
        'total_spending': 300,
        'mean_spending': 2.0,
        'n_transactions': 150,
        '교육육아': 0.10,
        '교통': 0.15,
        '기타소비': 0.15,
        '보건의료': 0.12,
        '식료품음료': 0.18,
        '오락문화': 0.10,
        '주거': 0.20,
        'est_income_만원': 400
    }
    
    def predict_scenario(scenario):
        df = pd.DataFrame([scenario])
        
        # 파생 특성 생성
        df['savings_rate'] = (df['est_income_만원'] - df['total_spending']) / df['est_income_만원']
        df['savings_rate'] = df['savings_rate'].clip(-1, 1)
        df['spending_income_ratio'] = df['total_spending'] / df['est_income_만원']
        df['essential_spending_ratio'] = df['주거'] + df['식료품음료'] + df['보건의료']
        df['discretionary_spending_ratio'] = df['오락문화'] + df['기타소비']
        df['avg_transaction_size'] = df['total_spending'] / (df['n_transactions'] + 1)
        df['income_low'] = (df['est_income_만원'] < 300).astype(int)
        df['income_mid'] = ((df['est_income_만원'] >= 300) & (df['est_income_만원'] < 600)).astype(int)
        df['income_high'] = (df['est_income_만원'] >= 600).astype(int)
        
        X = df[model_data['feature_names']].values
        if model_data['scaler'] is not None:
            X_scaled = model_data['scaler'].transform(X)
        else:
            X_scaled = X
        
        return model_data['regressor'].predict(X_scaled)[0]
    
    base_score = predict_scenario(base_scenario)
    print(f"기준 시나리오 점수: {base_score:.1f}")
    
    # 각 특성별 영향도 테스트
    impact_tests = [
        ('소득 증가 (+200만원)', 'est_income_만원', 600),
        ('소득 감소 (-100만원)', 'est_income_만원', 300),
        ('지출 증가 (+100만원)', 'total_spending', 400),
        ('지출 감소 (-100만원)', 'total_spending', 200),
        ('거래건수 증가 (+100건)', 'n_transactions', 250),
        ('거래건수 감소 (-50건)', 'n_transactions', 100),
        ('주거비 증가 (+10%p)', '주거', 0.30),
        ('오락비 증가 (+10%p)', '오락문화', 0.20),
        ('교육비 증가 (+10%p)', '교육육아', 0.20),
    ]
    
    print("\n특성 변화에 따른 점수 영향:")
    for test_name, feature, new_value in impact_tests:
        test_scenario = base_scenario.copy()
        test_scenario[feature] = new_value
        
        new_score = predict_scenario(test_scenario)
        impact = new_score - base_score
        
        print(f"  {test_name:20s}: {base_score:5.1f} → {new_score:5.1f} (변화: {impact:+5.1f})")

if __name__ == "__main__":
    print("Piggy 모델 행동 분석")
    print("=" * 60)
    
    try:
        # 모델 특성 중요도 분석
        model_data, reg_importance, cls_importance = analyze_model_behavior()
        
        # 시나리오별 점수 분석
        results = test_scoring_patterns()
        
        # 특성별 영향도 분석
        analyze_feature_impact()
        
        print("\n" + "=" * 60)
        print("분석 완료!")
        
    except Exception as e:
        print(f"오류 발생: {e}")
        import traceback
        traceback.print_exc()
