# Piggy 모델 설명서

## 개요

Piggy는 개인의 재무 데이터를 기반으로 재무건전성을 예측하는 LightGBM 기반 머신러닝 모델입니다. 19개의 특성을 사용하여 회귀와 분류 두 가지 방식으로 재무건전성을 평가합니다.

## 모델 성능

- **회귀 성능**: RMSE=3.064, MAE=1.827, R²=0.931
- **분류 성능**: Accuracy=99.4%, LogLoss=0.029
- **데이터 품질**: 983개 샘플 → 882개 샘플 (10.3% 정제)
- **특성 공학**: 11개 기본 특성 + 8개 파생 특성

## 모델 아키텍처

### 1. 회귀 모델 (점수 예측)
- **목적**: 0-100점 범위의 재무건전성 점수 예측
- **알고리즘**: LightGBM Regressor (하이퍼파라미터 튜닝 적용)
- **출력**: 연속적인 점수 값
- **주요 특성**: 재량지출비율, 거래건수, 총지출액

### 2. 분류 모델 (위험도 등급)
- **목적**: 재무 위험도 등급 분류 (0: 안전, 1: 주의, 2: 위험, 3: 고위험)
- **알고리즘**: LightGBM Classifier (확률 보정 적용)
- **출력**: 위험도 등급 및 각 등급별 확률
- **주요 특성**: 재량지출비율, 기타소비, 거래건수

## 입력 데이터 (Input)

### 필수 입력 특성 (11개)
1. **total_spending** (총 지출액, 만원) - 월 총 지출 금액
2. **mean_spending** (평균 거래 금액, 만원) - 총 지출 ÷ 거래 건수
3. **n_transactions** (거래 건수) - 월 총 거래 횟수
4. **est_income_만원** (추정 소득, 만원) - 월 추정 소득
5. **교육육아** - 교육 및 육아 관련 지출 비율 (0-1)
6. **교통** - 교통비 지출 비율 (0-1)
7. **기타소비** - 기타 소비 지출 비율 (0-1)
8. **보건의료** - 의료비 지출 비율 (0-1)
9. **식료품음료** - 식료품 및 음료 지출 비율 (0-1)
10. **오락문화** - 오락 및 문화 지출 비율 (0-1)
11. **주거** - 주거비 지출 비율 (0-1)

### 파생 특성 (8개, 자동 생성)
12. **savings_rate** - 저축률: (소득-지출)/소득
13. **spending_income_ratio** - 지출소득비율: 지출/소득
14. **essential_spending_ratio** - 필수지출비율: 주거+식료품+의료
15. **discretionary_spending_ratio** - 재량지출비율: 오락+기타
16. **avg_transaction_size** - 평균거래크기: 지출/(거래건수+1)
17. **income_low** - 저소득 더미 (소득 < 300만원)
18. **income_mid** - 중소득 더미 (300 ≤ 소득 < 600만원)
19. **income_high** - 고소득 더미 (소득 ≥ 600만원)

## 사용 방법

### 1. 웹 API 사용 (권장)
```javascript
// 프론트엔드에서 사용
const data = {
    total_spending: 250.0,    // 만원
    mean_spending: 1.5,       // 만원
    n_transactions: 150,      // 건
    education: 0.10,          // 10% (비율)
    transport: 0.15,          // 15%
    other: 0.20,              // 20%
    medical: 0.12,            // 12%
    food: 0.18,               // 18%
    entertainment: 0.10,      // 10%
    housing: 0.15,            // 15%
    income: 350.0             // 만원
};

fetch('/predict', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
    console.log('점수:', result.score);
    console.log('위험도:', result.risk_info.level);
    console.log('페르소나:', result.persona.name);
});
```

### 2. Python 직접 사용
```python
import pandas as pd
import pickle

# 모델 로드
with open('piggy_model_v2.pkl', 'rb') as f:
    model_data = pickle.load(f)

# 입력 데이터 (기본 11개 특성)
input_data = pd.DataFrame([{
    'total_spending': 250.0,
    'mean_spending': 1.5,
    'n_transactions': 150,
    '교육육아': 0.10,
    '교통': 0.15,
    '기타소비': 0.20,
    '보건의료': 0.12,
    '식료품음료': 0.18,
    '오락문화': 0.10,
    '주거': 0.15,
    'est_income_만원': 350.0
}])

# 파생 특성 자동 생성 (8개)
input_data['savings_rate'] = (input_data['est_income_만원'] - input_data['total_spending']) / input_data['est_income_만원']
input_data['spending_income_ratio'] = input_data['total_spending'] / input_data['est_income_만원']
# ... (나머지 파생 특성들)

# 예측
X = input_data[model_data['feature_names']].values
X_scaled = model_data['scaler'].transform(X)

score = model_data['regressor'].predict(X_scaled)[0]
risk_class = model_data['classifier'].predict(X_scaled)[0]
risk_proba = model_data['classifier'].predict_proba(X_scaled)[0]

print(f'점수: {score:.1f}')
print(f'위험등급: {risk_class}')
print(f'확률: {risk_proba}')
```

## 출력 (Output)

### 1. 재무건전성 점수 (0-100점)
- **80-100점**: 매우 우수 - 저축왕/금융고수 페르소나
- **60-79점**: 양호 - 균형잡힌/저축달인 페르소나
- **40-59점**: 보통 - 절약러/보통 페르소나
- **0-39점**: 개선 필요 - 재무초보/적자위험 페르소나

### 2. 위험도 등급 (확률 보정 적용)
- **0 (안전)**: 재무상태가 매우 건전
- **1 (주의)**: 약간의 주의가 필요
- **2 (위험)**: 재무관리 개선이 필요
- **3 (고위험)**: 즉시 재무계획 수정이 필요

### 3. 추가 정보
- **저축액**: 소득 - 지출 (만원)
- **저축률**: (저축액/소득) × 100 (%)
- **페르소나**: 점수와 저축률 기반 동물 캐릭터
- **맞춤 조언**: 점수 구간별 개선 방안

## 모델 특성 중요도

### 회귀 모델 (점수 예측) - 상위 10개
1. **discretionary_spending_ratio** (재량지출비율) - 가장 중요
2. **n_transactions** (거래건수)
3. **total_spending** (총지출액)
4. **기타소비** (기타소비 비율)
5. **주거** (주거비 비율)
6. **essential_spending_ratio** (필수지출비율)
7. **오락문화** (오락문화 비율)
8. **교통** (교통비 비율)
9. **교육육아** (교육육아 비율)
10. **보건의료** (보건의료 비율)

### 분류 모델 (위험도 분류) - 상위 10개
1. **discretionary_spending_ratio** (재량지출비율) - 가장 중요
2. **기타소비** (기타소비 비율)
3. **n_transactions** (거래건수)
4. **total_spending** (총지출액)
5. **교육육아** (교육육아 비율)
6. **교통** (교통비 비율)
7. **오락문화** (오락문화 비율)
8. **보건의료** (보건의료 비율)
9. **essential_spending_ratio** (필수지출비율)
10. **mean_spending** (평균거래금액) - 선택적 지출 패턴

## 점수 산출 로직

### ML 모델 기반 점수 산출

**모델은 다음 패턴을 학습했습니다:**

#### 🟢 높은 점수를 받는 경우 (80-100점)
- **저축률 20% 이상** (가장 중요)
- **재량지출비율 낮음** (오락+기타 < 25%)
- **적정 거래건수** (100-300건)
- **균형잡힌 필수지출** (주거+식료품+의료 40-60%)
- **교육투자 적극적** (10% 이상)

#### 🟡 중간 점수를 받는 경우 (40-79점)
- **저축률 0-20%**
- **재량지출비율 보통** (25-35%)
- **거래패턴 보통** (50-200건)
- **필수지출 다소 높음** (60-70%)
## 기술 지원

**모델 버전**: v1.0.0  
**생성일**: 2025-09-19  
**Python 버전**: 3.11+  
**주요 의존성**: lightgbm>=4.1.0, scikit-learn>=1.3.0, pandas>=2.0.3
