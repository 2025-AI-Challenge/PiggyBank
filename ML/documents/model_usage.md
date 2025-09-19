# Piggy 모델 사용 가이드

## 빠른 시작

### 웹 인터페이스 사용 (권장)
1. Flask 앱 실행: `python app.py`
2. 브라우저에서 `http://localhost:5000` 접속
3. 재무 정보 입력 후 "AI 재무건전성 분석 시작" 클릭

### API 엔드포인트

#### POST /predict
재무 데이터를 받아 건전성 점수와 위험도를 예측합니다.

**요청 형식:**
```json
{
    "total_spending": 250.0,
    "mean_spending": 1.5,
    "n_transactions": 150,
    "education": 0.10,
    "transport": 0.15,
    "other": 0.20,
    "medical": 0.12,
    "food": 0.18,
    "entertainment": 0.10,
    "housing": 0.15,
    "income": 350.0
}
```

**응답 형식:**
```json
{
    "score": 65.2,
    "risk_label": 1,
    "risk_info": {
        "level": "주의",
        "color": "yellow",
        "description": "약간의 주의가 필요합니다"
    },
    "persona": {
        "name": "균형수달",
        "emoji": "koala",
        "description": "적절한 소비와 저축의 균형",
        "level": 4
    },
    "probabilities": [0.1, 0.6, 0.25, 0.05],
    "savings": 100.0,
    "savings_rate": 28.6,
    "income": 350.0,
    "total_spending": 250.0
}
```

## 입력 데이터 가이드

### 필수 입력 (11개)

| 필드 | 타입 | 범위 | 설명 | 예시 |
|------|------|------|------|------|
| `total_spending` | float | 50-2000 | 월 총 지출액 (만원) | 250.0 |
| `mean_spending` | float | 0.1-50 | 평균 거래 금액 (만원) | 1.5 |
| `n_transactions` | int | 10-1000 | 월 거래 건수 | 150 |
| `income` | float | 100-3000 | 월 소득 (만원) | 350.0 |
| `education` | float | 0.0-1.0 | 교육육아 지출 비율 | 0.10 |
| `transport` | float | 0.0-1.0 | 교통비 지출 비율 | 0.15 |
| `other` | float | 0.0-1.0 | 기타소비 지출 비율 | 0.20 |
| `medical` | float | 0.0-1.0 | 보건의료 지출 비율 | 0.12 |
| `food` | float | 0.0-1.0 | 식료품음료 지출 비율 | 0.18 |
| `entertainment` | float | 0.0-1.0 | 오락문화 지출 비율 | 0.10 |
| `housing` | float | 0.0-1.0 | 주거비 지출 비율 | 0.15 |

### 데이터 검증 규칙

1. **비율 합계**: 지출 카테고리 비율의 합이 0.9-1.1 범위여야 함
2. **양수 조건**: 모든 금액과 건수는 양수여야 함
3. **논리적 일관성**: `mean_spending ≈ total_spending / n_transactions`

## 출력 해석 가이드

### 점수 구간별 의미

| 점수 | 등급 | 페르소나 예시 | 특징 |
|------|------|---------------|------|
| 80-100 | 매우 우수 | 🦁저축왕, 🐯금융고수 | 저축률 20%+, 재량지출 25%↓ |
| 60-79 | 양호 | 🐨저축달인, 🐼균형잡힌 | 저축률 10-20%, 안정적 관리 |
| 40-59 | 보통 | 🐰절약러, 🐱보통 | 저축률 0-10%, 개선 여지 |
| 0-39 | 개선필요 | 🐹재무초보, 🦊적자위험 | 적자 또는 저축률 0%↓ |

### 위험도 등급

- **0 (안전)**: 재무상태 매우 건전, 지속 유지
- **1 (주의)**: 약간의 개선 필요, 예방적 조치
- **2 (위험)**: 적극적 개선 필요, 지출 구조 조정
- **3 (고위험)**: 긴급 개선 필요, 전문가 상담 권장

## 실제 사용 예시

### JavaScript (프론트엔드)
```javascript
async function analyzeFinance(userData) {
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const result = await response.json();
        
        // 결과 활용
        displayScore(result.score);
        showPersona(result.persona);
        updateRiskIndicator(result.risk_info);
        
        return result;
    } catch (error) {
        console.error('분석 실패:', error);
    }
}

// 사용 예시
const userData = {
    total_spending: 280,
    mean_spending: 1.8,
    n_transactions: 156,
    education: 0.08,
    transport: 0.15,
    other: 0.10,
    medical: 0.12,
    food: 0.18,
    entertainment: 0.12,
    housing: 0.25,
    income: 350
};

analyzeFinance(userData);
```

### Python (백엔드/분석)
```python
import requests
import json

def get_financial_analysis(data):
    """재무 분석 API 호출"""
    url = 'http://localhost:5000/predict'
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"API 오류: {response.status_code}")

# 사용 예시
user_data = {
    "total_spending": 320,
    "mean_spending": 2.5,
    "n_transactions": 128,
    "education": 0.03,
    "transport": 0.18,
    "other": 0.04,
    "medical": 0.05,
    "food": 0.20,
    "entertainment": 0.15,
    "housing": 0.35,
    "income": 280
}

result = get_financial_analysis(user_data)
print(f"점수: {result['score']}")
print(f"페르소나: {result['persona']['name']}")
print(f"저축률: {result['savings_rate']}%")
```

## 모델 직접 사용 (고급)

### 모델 파일 로드
```python
import pickle
import pandas as pd
import numpy as np

# 모델 로드
with open('piggy_model_v2.pkl', 'rb') as f:
    model_data = pickle.load(f)

print(f"모델 특성: {model_data['feature_names']}")
print(f"학습 메타데이터: {model_data['training_metadata']}")
```

### 파생 특성 생성 함수
```python
def create_derived_features(df):
    """파생 특성 자동 생성"""
    df = df.copy()
    
    # 저축률
    df['savings_rate'] = (df['est_income_만원'] - df['total_spending']) / df['est_income_만원']
    df['savings_rate'] = df['savings_rate'].clip(-1, 1)
    
    # 지출소득비율
    df['spending_income_ratio'] = df['total_spending'] / df['est_income_만원']
    
    # 필수지출비율
    df['essential_spending_ratio'] = df['주거'] + df['식료품음료'] + df['보건의료']
    
    # 재량지출비율
    df['discretionary_spending_ratio'] = df['오락문화'] + df['기타소비']
    
    # 평균거래크기
    df['avg_transaction_size'] = df['total_spending'] / (df['n_transactions'] + 1)
    
    # 소득구간 더미변수
    df['income_low'] = (df['est_income_만원'] < 300).astype(int)
    df['income_mid'] = ((df['est_income_만원'] >= 300) & (df['est_income_만원'] < 600)).astype(int)
    df['income_high'] = (df['est_income_만원'] >= 600).astype(int)
    
    return df

# 사용 예시
input_df = pd.DataFrame([{
    'total_spending': 250,
    'mean_spending': 1.5,
    'n_transactions': 150,
    '교육육아': 0.10,
    '교통': 0.15,
    '기타소비': 0.20,
    '보건의료': 0.12,
    '식료품음료': 0.18,
    '오락문화': 0.10,
    '주거': 0.15,
    'est_income_만원': 350
}])

# 파생 특성 생성
input_df = create_derived_features(input_df)

# 예측
X = input_df[model_data['feature_names']].values
X_scaled = model_data['scaler'].transform(X)

score = model_data['regressor'].predict(X_scaled)[0]
risk_class = model_data['classifier'].predict(X_scaled)[0]
probabilities = model_data['classifier'].predict_proba(X_scaled)[0]

print(f"예측 점수: {score:.1f}")
print(f"위험 등급: {risk_class}")
print(f"등급별 확률: {probabilities}")
```

## 배치 처리

### 여러 사용자 동시 분석
```python
def batch_analyze(users_data):
    """여러 사용자 데이터 배치 분석"""
    results = []
    
    for user_id, data in users_data.items():
        try:
            result = get_financial_analysis(data)
            result['user_id'] = user_id
            results.append(result)
        except Exception as e:
            print(f"사용자 {user_id} 분석 실패: {e}")
    
    return results

# 사용 예시
users = {
    'user_001': {
        'total_spending': 250, 'income': 350,
        'mean_spending': 1.5, 'n_transactions': 150,
        # ... 나머지 필드
    },
    'user_002': {
        'total_spending': 400, 'income': 500,
        'mean_spending': 2.2, 'n_transactions': 180,
        # ... 나머지 필드
    }
}

batch_results = batch_analyze(users)
```

## 오류 처리

### 일반적인 오류와 해결방법

1. **비율 합계 오류**
   ```
   오류: 지출 카테고리 비율의 합이 1.0±0.1 범위를 벗어남
   해결: 모든 카테고리 비율의 합이 0.9-1.1이 되도록 조정
   ```

2. **음수값 오류**
   ```
   오류: 금액이나 건수에 음수값 포함
   해결: 모든 금액과 건수를 양수로 입력
   ```

3. **범위 초과 오류**
   ```
   오류: 입력값이 허용 범위를 벗어남
   해결: 각 필드의 허용 범위 확인 후 재입력
   ```

### 에러 핸들링 예시
```python
def safe_analyze(data):
    """안전한 분석 함수 (에러 핸들링 포함)"""
    try:
        # 데이터 검증
        validate_input_data(data)
        
        # 분석 수행
        result = get_financial_analysis(data)
        
        return {
            'success': True,
            'data': result
        }
        
    except ValueError as e:
        return {
            'success': False,
            'error': f'입력 데이터 오류: {str(e)}'
        }
    except requests.RequestException as e:
        return {
            'success': False,
            'error': f'API 통신 오류: {str(e)}'
        }
    except Exception as e:
        return {
            'success': False,
            'error': f'알 수 없는 오류: {str(e)}'
        }

def validate_input_data(data):
    """입력 데이터 검증"""
    required_fields = [
        'total_spending', 'mean_spending', 'n_transactions', 'income',
        'education', 'transport', 'other', 'medical', 
        'food', 'entertainment', 'housing'
    ]
    
    # 필수 필드 확인
    for field in required_fields:
        if field not in data:
            raise ValueError(f"필수 필드 누락: {field}")
    
    # 양수 확인
    positive_fields = ['total_spending', 'mean_spending', 'n_transactions', 'income']
    for field in positive_fields:
        if data[field] <= 0:
            raise ValueError(f"{field}는 양수여야 합니다")
    
    # 비율 합계 확인
    ratio_fields = ['education', 'transport', 'other', 'medical', 'food', 'entertainment', 'housing']
    ratio_sum = sum(data[field] for field in ratio_fields)
    if not (0.9 <= ratio_sum <= 1.1):
        raise ValueError(f"지출 비율 합계가 {ratio_sum:.3f}입니다. 0.9-1.1 범위여야 합니다")
```

## 성능 최적화

### 캐싱 활용
```python
from functools import lru_cache
import hashlib
import json

@lru_cache(maxsize=1000)
def cached_analyze(data_hash):
    """결과 캐싱을 통한 성능 최적화"""
    # 실제 분석 로직
    pass

def get_data_hash(data):
    """데이터 해시 생성"""
    data_str = json.dumps(data, sort_keys=True)
    return hashlib.md5(data_str.encode()).hexdigest()

# 사용 예시
data_hash = get_data_hash(user_data)
result = cached_analyze(data_hash)
```

## 모니터링 및 로깅

### 사용량 추적
```python
import logging
from datetime import datetime

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('piggy_usage.log'),
        logging.StreamHandler()
    ]
)

def log_prediction(user_data, result, processing_time):
    """예측 결과 로깅"""
    log_data = {
        'timestamp': datetime.now().isoformat(),
        'input_hash': get_data_hash(user_data),
        'score': result.get('score'),
        'risk_level': result.get('risk_label'),
        'processing_time_ms': processing_time * 1000
    }
    
    logging.info(f"Prediction: {json.dumps(log_data)}")
```

이 가이드를 통해 Piggy 모델을 효과적으로 활용할 수 있습니다. 추가 질문이나 지원이 필요한 경우 개발팀에 문의하세요.
