class FinanceItem {
  amount string
  category string
  editable bool
  frequency string
  icon string?
  id int
  name string
}


class PythonScriptParams {
  total_spending float
  mean_spending float
  n_transactions int
  education_childcare float // 교육육아
  transport float // 교통
  other_consumption float // 기타소비
  healthcare float // 보건의료
  food_beverage float // 식료품음료
  entertainment_culture float // 오락문화
  housing float // 주거
  est_income_10000 float // est_income_만원
  essential_spending_ratio float
  discretionary_spending_ratio float
  investment_spending_ratio float
  transport_spending_ratio float
  avg_transaction_size float
  transaction_frequency_score float
  spending_balance_score float
  rational_spending_score float
  spending_low float
  spending_mid float
  spending_high float
}

class FinanceInputData {
  income FinanceItem[]
  investment FinanceItem[]
  spending FinanceItem[]
}

class FinancePredictionResult {
  score float
  risk_class int
  risk_proba float[]
}

function AnalyzeFinancialData(input: FinanceInputData) -> PythonScriptParams {
  client Claude
  prompt #"
    다음 금융 데이터를 분석하여 run_python_script 함수에 전달할 매개변수를 생성해주세요:

    ## 수입 내역:
    {% for item in input.income %}
    - {{ item.name }}: {{ item.amount }} ({{ item.category }}, {{ item.frequency }}){% if item.icon %} {{ item.icon }}{% endif %}
    {% endfor %}

    ## 투자 내역:
    {% for item in input.investment %}
    - {{ item.name }}: {{ item.amount }} ({{ item.category }}, {{ item.frequency }}){% if item.icon %} {{ item.icon }}{% endif %}
    {% endfor %}

    ## 지출 내역:
    {% for item in input.spending %}
    - {{ item.name }}: {{ item.amount }} ({{ item.category }}, {{ item.frequency }}){% if item.icon %} {{ item.icon }}{% endif %}
    {% endfor %}

    위 데이터를 분석하여 다음 지표들을 계산해주세요:

    ## 필수 입력 특성 (11개):
    - total_spending: 월 총 지출 금액 (만원 단위)
    - mean_spending: 평균 거래 금액 = 총 지출 ÷ 거래 건수 (만원)
    - n_transactions: 월 총 거래 횟수
    - est_income_10000: 월 추정 소득 (만원 단위)
    - education_childcare: 교육 및 육아 관련 지출 비율 (0-1 사이)
    - transport: 교통비 지출 비율 (0-1 사이)
    - other_consumption: 기타 소비 지출 비율 (0-1 사이)
    - healthcare: 의료비 지출 비율 (0-1 사이)
    - food_beverage: 식료품 및 음료 지출 비율 (0-1 사이)
    - entertainment_culture: 오락 및 문화 지출 비율 (0-1 사이)
    - housing: 주거비 지출 비율 (0-1 사이)

    ## 파생 특성 (자동 생성):
    - essential_spending_ratio: 필수지출비율 = (주거 + 식료품 + 의료비) 비율
    - discretionary_spending_ratio: 재량지출비율 = (오락문화 + 기타소비) 비율
    - investment_spending_ratio: 투자 지출 비율
    - transport_spending_ratio: 교통 지출 비율 (transport와 동일)
    - avg_transaction_size: 평균거래크기 = 지출 ÷ (거래건수 + 1)
    - transaction_frequency_score: 거래 빈도 점수 (0-100)
    - spending_balance_score: 지출 균형 점수 (0-100)
    - rational_spending_score: 합리적 지출 점수 (0-100)
    - spending_low: 저지출 더미 (0 또는 1)
    - spending_mid: 중지출 더미 (0 또는 1)
    - spending_high: 고지출 더미 (0 또는 1)

    JSON 형식으로 응답해주세요:
    {
      "total_spending": [월 총 지출 금액(만원)],
      "mean_spending": [평균 거래 금액(만원)],
      "n_transactions": [거래 횟수],
      "est_income_10000": [추정 소득(만원)],
      "education_childcare": [교육육아 비율 0-1],
      "transport": [교통비 비율 0-1],
      "other_consumption": [기타소비 비율 0-1],
      "healthcare": [의료비 비율 0-1],
      "food_beverage": [식료품음료 비율 0-1],
      "entertainment_culture": [오락문화 비율 0-1],
      "housing": [주거비 비율 0-1],
      "essential_spending_ratio": [필수지출 비율],
      "discretionary_spending_ratio": [재량지출 비율],
      "investment_spending_ratio": [투자 비율],
      "transport_spending_ratio": [교통 지출 비율],
      "avg_transaction_size": [평균 거래 크기],
      "transaction_frequency_score": [거래 빈도 점수 0-100],
      "spending_balance_score": [지출 균형 점수 0-100],
      "rational_spending_score": [합리적 지출 점수 0-100],
      "spending_low": [저지출 더미 0 또는 1],
      "spending_mid": [중지출 더미 0 또는 1],
      "spending_high": [고지출 더미 0 또는 1]
    }
  "#
}
