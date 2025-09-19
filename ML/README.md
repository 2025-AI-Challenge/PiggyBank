# 금융 건전성 예측 모델

소비 패턴을 기반으로 금융 건전성을 예측하는 머신러닝 모델입니다.

## 프로젝트 구조

```
piggy/
├── data/                           # 데이터 디렉토리
│   ├── 가계재무데이터_v0/          # KOSIS 원본 데이터
│   └── synth_finance_scored_realistic.csv  # 합성 데이터
├── utils.py                        # 유틸리티 함수
├── data_load.py                    # 데이터 로딩 및 전처리
├── scoring.py                      # 점수 계산 및 라벨링
├── train.py                        # 모델 훈련
├── evaluation.py                   # 모델 평가 및 시각화
├── main.py                         # 메인 파이프라인
├── requirements.txt                # 의존성 패키지
└── README.md                       # 프로젝트 설명
```

## 모듈 설명

### 1. `utils.py`
- 공통 유틸리티 함수들
- 파일 읽기, 텍스트 정리, 비율 변환 등

### 2. `data_load.py`
- KOSIS 데이터 로딩 및 정규화
- 합성 데이터 전처리
- 파생 지표 계산

### 3. `scoring.py`
- 재무 건전성 점수 계산
- 규칙 기반 라벨링
- 현실형 점수 계산

### 4. `train.py`
- LightGBM/RandomForest 모델 훈련
- 회귀 및 분류 모델 지원
- 특성 중요도 분석

### 5. `evaluation.py`
- 모델 성능 평가
- 시각화 (ROC 곡선, 특성 중요도 등)
- 종합 평가 리포트

### 6. `main.py`
- 전체 파이프라인 실행
- 데이터 로딩부터 모델 평가까지

## 설치 및 실행

1. 의존성 설치:
```bash
pip install -r requirements.txt
```

2. 전체 파이프라인 실행:
```bash
python main.py
```

## 사용 예시

### 개별 모듈 사용

```python
from data_load import load_kosis_data, preprocess_synthetic_data
from train import train_financial_model
from evaluation import comprehensive_evaluation

# 데이터 로딩
kosis_df = load_kosis_data(["./data"])
synth_df = preprocess_synthetic_data(raw_data)

# 모델 훈련
model, results = train_financial_model(synth_df)

# 평가
eval_results = comprehensive_evaluation(model, results['test_data'])
```

### 새로운 데이터 예측

```python
from train import FinancialHealthModel
from scoring import get_persona_from_score

# 훈련된 모델로 예측
model = FinancialHealthModel()
# ... 모델 훈련 ...

predictions = model.predict(new_data)
consumption_score = predictions['consumption_score']
final_score = predictions['final_score']
risk_level = predictions['classification_label']
persona_info = get_persona_from_score(final_score)

print(f"소비패턴 점수: {consumption_score:.1f}/80")
print(f"최종 재무점수: {final_score:.1f}/100")
print(f"위험도 등급: {risk_level}")
print(f"페르소나: {persona_info['emoji']} {persona_info['name']}")
print(f"설명: {persona_info['description']}")
```

## 데이터 형식

### 입력 데이터 컬럼
- `total_spending`: 총 지출액 (만원)
- `mean_spending`: 평균 지출액
- `n_transactions`: 거래 횟수
- `식료품음료`, `주거`, `교통`, `오락문화`, `교육육아`, `보건의료`, `기타소비`: 지출 비율

### 출력
- `소비패턴_점수`: 0-80 점수 (ML 모델 예측 소비패턴 점수)
- `최종_재무점수`: 0-100 점수 (소비패턴 + 재무비율 결합 점수)
- `위험도_등급`: 0-3 등급 (0=안전, 3=고위험)
- `페르소나_이름`: 페르소나 캐릭터 이름
- `페르소나_이모지`: 페르소나 이모지
- `저축률`: 비율(내부) 및 퍼센트(응답) 형태

## 페르소나 시스템

### 점수 구간별 페르소나

| 점수 구간 | 페르소나 | 한줄 요약 |
|----------|----------|-----------|
| 0-9 | 아기달팽이 🐌 | 이제 막 출발! 지출 추적부터 차근차근 |
| 10-19 | 새싹두더지 🕳️ | 보이지 않는 새는 구멍부터 막자(고정비 점검) |
| 20-29 | 콩돌고래 🐬 | 파도(변동비)에 흔들림, 작은 저축 습관 만들기 |
| 30-39 | 도토리햄스터 🐹 | 조금씩 모으는 중, 비상금 1개월 치 도전 |
| 40-49 | 체크펭귄 🐧 | 카드·구독 '체크'로 낭비 컷! 기본기 다지기 |
| 50-59 | 균형수달 🦦 | 수입·지출 밸런스 안정, 3개월 비상금 완성 가즈아 |
| 60-69 | 플랜여우 🦊 | 계획형 소비 + 자동저축, 투자 입문 준비 |
| 70-79 | 달토끼 🚀 | 공격·수비 조화, 장기 목표(차·전세) 로드맵 구축 |
| 80-89 | 부엉이 🦉 | 데이터로 소비 점검, 포트폴리오 분산/리밸런싱 |
| 90-100 | 고래백만장 🐳 | 현금흐름·리스크 완벽 관리, 목표 달성 모드 유지 |

### 5단계 레벨 시스템

- **레벨 0 (초급)**: 아기달팽이, 새싹두더지 (0-19점)
- **레벨 1 (초중급)**: 콩돌고래, 도토리햄스터 (20-39점)  
- **레벨 2 (중급)**: 체크펭귄, 균형수달 (40-59점)
- **레벨 3 (중고급)**: 플랜여우, 달토끼 (60-79점)
- **레벨 4 (고급)**: 부엉이, 고래백만장 (80-100점)

## 모델 성능

- **회귀 모델**: RMSE ~3.5, R² ~0.92
- **분류 모델**: 정확도 ~96%, AUC ~0.99

## 주요 특징

1. **모듈화된 구조**: 각 기능별로 분리된 모듈
2. **이중 점수 체계**: 소비패턴 점수(0-80) + 재무비율 점수(0-20)
3. **저축률 단위 통일**: 내부 비율 처리, 응답 시 퍼센트 변환
4. **자동 클리핑**: 소비패턴 점수 0-80 범위 제한
5. **종합 평가**: 회귀와 분류 모델 동시 평가
6. **시각화**: 성능 지표 및 특성 중요도 시각화
7. **현실형 점수**: KOSIS 참조 데이터 기반 현실적 평가
