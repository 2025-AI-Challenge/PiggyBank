"""
Piggy 재무건전성 예측 웹 애플리케이션
"""
import pickle
import pandas as pd
from flask import Flask, render_template, request, jsonify
import numpy as np
import joblib

app = Flask(__name__)

# 설정: 모델 사용 여부
USE_CONSUMPTION_MODEL = True  # True: 소비패턴 ML 모델 + Rule-based 재무점수

# 소비패턴 모델 로드
consumption_model = None
if USE_CONSUMPTION_MODEL:
    try:
        # 소비패턴 모델 로드
        with open('Fin_model_v1.pkl', 'rb') as f:
            model_data = pickle.load(f)
        
        if isinstance(model_data, dict) and 'regressor' in model_data:
            print("소비패턴 모델 로드 성공: Fin_model_v1.pkl")
            
            # 소비패턴 모델 클래스 생성
            class ConsumptionPatternModel:
                def __init__(self, model_data):
                    self.regressor = model_data['regressor']
                    self.classifier = model_data['classifier']
                    self.scaler = model_data['scaler']
                    self.feature_names = model_data['feature_names']
                    self.training_metadata = model_data.get('training_metadata', {})
                    self.model_version = model_data.get('model_version', 'v1.0')
                
                def predict_consumption_pattern(self, X):
                    """소비패턴 점수 예측 (0-80점)"""
                    if isinstance(X, pd.DataFrame):
                        X_array = X[self.feature_names].values
                    else:
                        X_array = X
                    
                    if self.scaler is not None:
                        X_scaled = self.scaler.transform(X_array)
                    else:
                        X_scaled = X_array
                    
                    consumption_score = self.regressor.predict(X_scaled)
                    risk_class = self.classifier.predict(X_scaled)
                    risk_proba = self.classifier.predict_proba(X_scaled)
                    
                    return {
                        'consumption_score': consumption_score,  # 0-80점
                        'risk_classification': risk_class,
                        'risk_probabilities': risk_proba
                    }
            
            consumption_model = ConsumptionPatternModel(model_data)
            print("소비패턴 모델 래퍼 생성 완료")
            print(f"특성 개수: {len(consumption_model.feature_names)}")
            print(f"모델 버전: {consumption_model.model_version}")
            print(f"특성 목록: {consumption_model.feature_names}")
        else:
            print("모델 형식이 올바르지 않습니다")
            consumption_model = None
        
    except FileNotFoundError:
        print("Fin_model_v1.pkl 파일을 찾을 수 없습니다")
        consumption_model = None
    except Exception as e:
        print(f"소비패턴 모델 로드 실패: {e}")
        consumption_model = None

if consumption_model is None:
    print("소비패턴 모델 사용 불가 - 완전 Rule-based 로직으로 폴백")
    USE_CONSUMPTION_MODEL = False
else:
    print(f"소비패턴 모델 사용 준비 완료 (USE_CONSUMPTION_MODEL={USE_CONSUMPTION_MODEL})")

def calculate_financial_score_with_scaling(consumption_score, income, total_spending, savings_rate):
    """
    소비패턴 점수(0-80)와 소득/지출/저축 비율을 결합하여 최종 재무점수(0-100) 계산
    
    Args:
        consumption_score: 소비패턴 점수 (0-80점)
        income: 월 소득 (만원)
        total_spending: 월 지출 (만원)
        savings_rate: 저축률 (비율, 0.2 = 20%)
    
    Returns:
        final_score: 최종 재무건전성 점수 (0-100점)
    """
    # 1. 소비패턴 점수 (80% 기여도) - 0-80 범위로 클리핑
    pattern_score = max(0, min(80, float(consumption_score)))
    
    # 2. 소득/지출/저축 비율 점수 (20% 기여도)
    financial_ratio_score = 0
    
    # 2-1. 저축률 점수 (12점 만점) - 비율 기준으로 수정
    if savings_rate >= 0.3:  # 30% 이상
        savings_score = 12
    elif savings_rate >= 0.2:  # 20% 이상
        savings_score = 10
    elif savings_rate >= 0.1:  # 10% 이상
        savings_score = 8
    elif savings_rate >= 0:  # 0% 이상
        savings_score = 5
    else:  # 적자
        savings_score = max(0, 5 + savings_rate * 25)  # 적자 정도에 따라 감점
    
    # 2-2. 소득 수준 점수 (4점 만점)
    if income >= 600:
        income_score = 4
    elif income >= 400:
        income_score = 3
    elif income >= 250:
        income_score = 2
    else:
        income_score = 1
    
    # 2-3. 지출 효율성 점수 (4점 만점)
    spending_income_ratio = total_spending / income if income > 0 else 2
    if spending_income_ratio <= 0.6:
        efficiency_score = 4
    elif spending_income_ratio <= 0.8:
        efficiency_score = 3
    elif spending_income_ratio <= 1.0:
        efficiency_score = 2
    else:
        efficiency_score = max(0, 2 - (spending_income_ratio - 1) * 2)
    
    financial_ratio_score = savings_score + income_score + efficiency_score
    
    # 3. 최종 점수 계산
    final_score = pattern_score + financial_ratio_score
    
    # 4. 0-100 범위로 제한
    final_score = max(0, min(100, final_score))
    
    print(f"최종점수 계산: 소비패턴점수({pattern_score:.1f}) + 저축률점수({savings_score:.1f}) + 소득수준점수({income_score:.1f}) + 지출효율점수({efficiency_score:.1f}) = 최종점수({final_score:.1f})")
    
    return final_score

def get_persona(score, savings_rate, income, total_spending):
    """점수, 저축률, 소득, 지출을 고려한 페르소나 반환 (savings_rate는 비율)"""
    # 저축률과 소득 수준을 고려한 세분화된 페르소나
    if score >= 80:
        if savings_rate >= 0.3:
            return {"name": "저축왕", "emoji": "lion", "description": f"월 {savings_rate*100:.0f}% 저축! 재무관리의 달인이에요", "level": 5}
        else:
            return {"name": "금융고수", "emoji": "tiger", "description": "뛰어난 재무관리 능력을 가진 당신!", "level": 5}
    elif score >= 60:
        if savings_rate >= 0.2:
            return {"name": "저축달인", "emoji": "koala", "description": f"월 {savings_rate*100:.0f}% 저축으로 안정적 관리!", "level": 4}
        elif income >= 500:
            return {"name": "고소득안정", "emoji": "elephant", "description": "높은 소득으로 안정적인 생활 중", "level": 4}
        else:
            return {"name": "균형잡힌", "emoji": "panda", "description": "적절한 소비와 저축의 균형", "level": 4}
    elif score >= 40:
        if savings_rate > 0:
            return {"name": "절약러", "emoji": "rabbit", "description": f"저축 {savings_rate*100:.0f}%로 꾸준히 모으는 중", "level": 3}
        elif total_spending > income * 0.9:
            return {"name": "소비러", "emoji": "squirrel", "description": "지출 관리에 더 신경써보세요", "level": 3}
        else:
            return {"name": "보통", "emoji": "cat", "description": "조금 더 신경쓰면 더 좋아질 거예요", "level": 3}
    elif score >= 20:
        if savings_rate < 0:
            return {"name": "적자주의", "emoji": "dog", "description": f"월 {abs(savings_rate)*100:.0f}% 적자! 지출 줄이기 필요", "level": 2}
        else:
            return {"name": "재무초보", "emoji": "hamster", "description": "재무관리 공부가 필요해요", "level": 2}
    else:
        if savings_rate < -0.2:
            return {"name": "적자위험", "emoji": "fox", "description": f"심각한 적자 {abs(savings_rate)*100:.0f}%! 긴급 개선 필요", "level": 1}
        else:
            return {"name": "위험신호", "emoji": "wolf", "description": "긴급히 재무상황을 개선해야 해요", "level": 1}

def calculate_fallback_score(data):
    """향상된 룰베이스 점수 계산 - 저축률 포함"""
    total_spending = float(data['total_spending'])
    income = float(data['income'])
    savings = income - total_spending  # 저축액 계산
    spending_ratio = total_spending / income if income > 0 else 1.0
    savings_rate = savings / income if income > 0 else -1.0  # 저축률 계산
    
    print(f"월소득: {income:.1f}만원, 월지출: {total_spending:.1f}만원, 저축액: {savings:.1f}만원")
    print(f"지출 비율: {spending_ratio:.2f}, 저축률: {savings_rate:.2f}")
    
    # 기본 점수 계산 (50점을 중간 수준으로)
    score = 50.0
    
    # 저축률 기반 평가 (가장 중요한 지표)
    if savings_rate < -0.2:  # 적자 20% 이상
        score -= 60
    elif savings_rate < 0:  # 적자 상태
        score -= 45
    elif savings_rate < 0.05:  # 저축률 5% 미만
        score -= 25
    elif savings_rate < 0.1:  # 저축률 10% 미만
        score -= 15
    elif savings_rate < 0.2:  # 저축률 20% 미만
        score -= 5
    elif savings_rate >= 0.3:  # 저축률 30% 이상
        score += 15
    elif savings_rate >= 0.2:  # 저축률 20% 이상
        score += 10
    else:  # 적정 저축률
        score += 5
    
    # 소득 수준별 가중치
    if income >= 800:  # 고소득
        score += 5
    elif income >= 500:  # 중상위 소득
        score += 3
    elif income >= 300:  # 중간 소득
        score += 0
    elif income >= 150:  # 중하위 소득
        score -= 3
    else:  # 저소득
        score -= 5
    
    # 절대 지출액 평가
    if total_spending > 600:  # 과도한 지출
        score -= 15
    elif total_spending > 400:  # 높은 지출
        score -= 8
    elif total_spending < 50:  # 너무 낮은 지출
        score -= 10
    
    # 필수 지출 비율 체크
    essential_ratio = float(data['food']) + float(data['housing']) + float(data['medical'])
    print(f"필수 지출 비율: {essential_ratio:.2f}")
    if essential_ratio < 0.25:  # 필수 지출 너무 적음
        score -= 15
    elif essential_ratio > 0.8:  # 필수 지출 너무 많음
        score -= 20
    elif essential_ratio > 0.7:
        score -= 10
    elif 0.4 <= essential_ratio <= 0.6:  # 적정 범위
        score += 5
    
    # 거래 패턴 분석
    n_transactions = int(data['n_transactions'])
    if n_transactions < 20:  # 거래 너무 적음
        score -= 15
    elif n_transactions > 500:  # 거래 너무 많음
        score -= 10
    elif n_transactions > 300:
        score -= 5
    elif 50 <= n_transactions <= 200:  # 적정 범위
        score += 3
    
    # 평균 거래 금액
    mean_spending = float(data['mean_spending'])
    if mean_spending > 20:  # 평균 거래 금액 너무 큼
        score -= 15
    elif mean_spending > 10:
        score -= 8
    elif mean_spending < 0.1:  # 너무 작음
        score -= 5
    elif 0.5 <= mean_spending <= 3:  # 적정 범위
        score += 3
    
    # 오락/기타 지출 비율
    entertainment_ratio = float(data['entertainment']) + float(data['other'])
    if entertainment_ratio > 0.4:  # 너무 많음
        score -= 15
    elif entertainment_ratio > 0.3:
        score -= 8
    elif entertainment_ratio < 0.05:  # 너무 적음 (삶의 질)
        score -= 3
    elif 0.1 <= entertainment_ratio <= 0.25:  # 적정 범위
        score += 3
    
    # 교통비 비율
    transport_ratio = float(data['transport'])
    if transport_ratio > 0.3:  # 교통비 너무 많음
        score -= 10
    elif transport_ratio > 0.25:
        score -= 5
    
    # 교육비 비율 (투자 관점)
    education_ratio = float(data['education'])
    if education_ratio > 0.3:  # 너무 많음
        score -= 5
    elif education_ratio > 0.05:  # 적정 투자
        score += 2
    
    print(f"계산된 점수: {score}")
    
    # 점수 범위 조정
    score = max(0, min(100, score))
    
    # 위험도 등급
    if score >= 80:
        risk_label = 0
    elif score >= 60:
        risk_label = 1
    elif score >= 40:
        risk_label = 2
    else:
        risk_label = 3
        
    probabilities = [0.7, 0.2, 0.08, 0.02] if risk_label == 0 else [0.1, 0.6, 0.25, 0.05] if risk_label == 1 else [0.05, 0.25, 0.6, 0.1] if risk_label == 2 else [0.02, 0.08, 0.3, 0.6]
    
    print(f"폴백 계산 완료 - 점수: {score}, 위험도: {risk_label}")
    return score, risk_label, probabilities, savings, savings_rate

def get_risk_level(risk_label):
    """위험도 등급에 따른 정보 반환"""
    risk_levels = {
        0: {"level": "안전", "color": "green", "description": "재무상태가 매우 건전합니다"},
        1: {"level": "주의", "color": "yellow", "description": "약간의 주의가 필요합니다"},
        2: {"level": "위험", "color": "orange", "description": "재무관리 개선이 필요합니다"},
        3: {"level": "고위험", "color": "red", "description": "즉시 재무계획 수정이 필요합니다"}
    }
    return risk_levels.get(risk_label, risk_levels[1])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # 입력 데이터 받기
        data = request.json
        print(f"받은 데이터: {data}")
        
        # 기본 입력 데이터 구성
        base_input_data = pd.DataFrame({
            'total_spending': [float(data['total_spending'])],
            'mean_spending': [float(data['mean_spending'])],
            'n_transactions': [int(data['n_transactions'])],
            '교육육아': [float(data['education'])],
            '교통': [float(data['transport'])],
            '기타소비': [float(data['other'])],
            '보건의료': [float(data['medical'])],
            '식료품음료': [float(data['food'])],
            '오락문화': [float(data['entertainment'])],
            '주거': [float(data['housing'])],
            'est_income_만원': [float(data['income'])]
        })
        
        print(f"기본 입력 데이터 형태: {base_input_data.shape}")
        print(f"USE_CONSUMPTION_MODEL: {USE_CONSUMPTION_MODEL}, 소비패턴모델 상태: {consumption_model is not None}")
        
        if USE_CONSUMPTION_MODEL and consumption_model is not None:
            try:
                print("소비패턴 모델 + Rule-based 재무점수 사용")
                
                # 소비패턴 분석용 특성 생성
                consumption_data = base_input_data.copy()
                
                # 소비 구조 특성
                consumption_data['essential_spending_ratio'] = consumption_data['주거'] + consumption_data['식료품음료'] + consumption_data['보건의료']
                consumption_data['discretionary_spending_ratio'] = consumption_data['오락문화'] + consumption_data['기타소비']
                consumption_data['investment_spending_ratio'] = consumption_data['교육육아']
                consumption_data['transport_spending_ratio'] = consumption_data['교통']
                
                # 거래 패턴 특성
                consumption_data['avg_transaction_size'] = consumption_data['total_spending'] / (consumption_data['n_transactions'] + 1)
                consumption_data['transaction_frequency_score'] = np.where(
                    (consumption_data['n_transactions'] >= 50) & (consumption_data['n_transactions'] <= 300), 1, 0
                )
                
                # 소비 균형도
                spending_cols = ['교육육아', '교통', '기타소비', '보건의료', '식료품음료', '오락문화', '주거']
                consumption_data['spending_balance_score'] = 1 / (1 + consumption_data[spending_cols].std(axis=1))
                
                # 합리적 소비 패턴 점수
                consumption_data['rational_spending_score'] = (
                    (consumption_data['essential_spending_ratio'] >= 0.4) & (consumption_data['essential_spending_ratio'] <= 0.7) &
                    (consumption_data['discretionary_spending_ratio'] <= 0.3) &
                    (consumption_data['investment_spending_ratio'] >= 0.05)
                ).astype(int)
                
                # 지출 크기별 더미 변수
                consumption_data['spending_low'] = (consumption_data['total_spending'] < 200).astype(int)
                consumption_data['spending_mid'] = ((consumption_data['total_spending'] >= 200) & (consumption_data['total_spending'] < 400)).astype(int)
                consumption_data['spending_high'] = (consumption_data['total_spending'] >= 400).astype(int)
                
                print(f"소비패턴 특성 생성 완료: {consumption_data.shape}")
                
                # 소비패턴 모델 예측 (0-80점)
                consumption_prediction = consumption_model.predict_consumption_pattern(consumption_data)
                consumption_score = max(0, min(80, float(consumption_prediction['consumption_score'][0])))  # 0-80 클리핑
                risk_label = int(consumption_prediction['risk_classification'][0])
                probabilities = consumption_prediction['risk_probabilities'][0].tolist()
                
                # 재무 정보 계산 (내부는 비율로 처리)
                income = float(data['income'])
                total_spending = float(data['total_spending'])
                savings = income - total_spending
                savings_rate = (savings / income) if income > 0 else -1.0  # 비율로 계산
                
                # 최종 재무점수 계산 (소비패턴 + 소득/지출/저축 비율)
                final_score = calculate_financial_score_with_scaling(
                    consumption_score, income, total_spending, savings_rate
                )
                
                score = final_score
                
                print(f"ML모델 결과 - 소비패턴점수: {consumption_score:.1f}, 최종재무점수: {score:.1f}, 위험도: {risk_label}, 저축률: {savings_rate:.1%}")
                
            except Exception as e:
                print(f"소비패턴 모델 예측 실패: {e}")
                import traceback
                traceback.print_exc()
                print("완전 Rule-based 로직으로 폴백")
                score, risk_label, probabilities, savings, savings_rate = calculate_fallback_score(data)
        else:
            print("완전 Rule-based 로직 사용")
            score, risk_label, probabilities, savings, savings_rate = calculate_fallback_score(data)
        
        # 저축 정보 확인 (모델 사용 시에는 이미 계산됨)
        if 'savings' not in locals():
            income = float(data['income'])
            total_spending = float(data['total_spending'])
            savings = income - total_spending
            savings_rate = (savings / income) if income > 0 else -1.0  # 비율로 계산
        
        persona = get_persona(score, savings_rate, float(data['income']), float(data['total_spending']))
        risk_info = get_risk_level(risk_label)
        
        result = {
            'score': round(score, 1),
            'risk_label': risk_label,
            'risk_info': risk_info,
            'persona': persona,
            'probabilities': probabilities if isinstance(probabilities, list) else probabilities.tolist(),
            'savings': round(savings, 1),
            'savings_rate': round(savings_rate * 100, 1),  # 응답 시에만 퍼센트로 변환
            'income': round(float(data['income']), 1),
            'total_spending': round(float(data['total_spending']), 1)
        }
        
        print(f"최종 결과: {result}")
        return jsonify(result)
        
    except Exception as e:
        print(f"예측 오류: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'예측 중 오류 발생: {str(e)}'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
