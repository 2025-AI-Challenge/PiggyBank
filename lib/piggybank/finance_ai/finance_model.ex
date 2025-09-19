defmodule Piggybank.FinanceAi.FinanceModel do
  @moduledoc """
  파이썬 스크립트를 실행하는 기본 모듈
  """

  def run_python_script do
    python_code = """
    import pandas as pd
    import pickle

    # 모델 로드
    with open('priv/models/Fin_model_v1.pkl', 'rb') as f:
        model_data = pickle.load(f)

    # 각 트리에 누락된 속성 추가
    for estimator in model_data['regressor'].estimators_:
        if not hasattr(estimator, 'monotonic_cst'):
            estimator.monotonic_cst = None

    for estimator in model_data['classifier'].estimators_:
        if not hasattr(estimator, 'monotonic_cst'):
            estimator.monotonic_cst = None

    # 입력 데이터 (기본 11개 특성)
    input_data = pd.DataFrame([{
        'total_spending': 250.0,
        'mean_spending': 1.5,
        'n_transactions': 150,
        '교육육아': 0.1,
        '교통': 0.15,
        '기타소비': 0.2,
        '보건의료': 0.12,
        '식료품음료': 0.18,
        '오락문화': 0.1,
        '주거': 0.15,
        'est_income_만원': 350.0,
        'essential_spending_ratio': 0.45,
        'discretionary_spending_ratio': 0.3,
        'investment_spending_ratio': 0.05,
        'transport_spending_ratio': 0.15,
        'avg_transaction_size': 1.67,
        'transaction_frequency_score': 1.0,
        'spending_balance_score': 0.72,
        'rational_spending_score': 0.68,
        'spending_low': 0.0,
        'spending_mid': 1.0,
        'spending_high': 0.0
    }])

    # 파생 특성 자동 생성 (8개)
    # input_data['savings_rate'] = (input_data['est_income_만원'] - input_data['total_spending']) / input_data['est_income_만원']
    # input_data['spending_income_ratio'] = input_data['total_spending'] / input_data['est_income_만원']
    # ... (나머지 파생 특성들)

    # 예측
    X = input_data[model_data['feature_names']].values
    X_scaled = model_data['scaler'].transform(X)

    score = model_data['regressor'].predict(X_scaled)[0]
    risk_class = model_data['classifier'].predict(X_scaled)[0]
    risk_proba = model_data['classifier'].predict_proba(X_scaled)[0]

    # 결과를 딕셔너리로 반환
    {
        'score': float(score),
        'risk_class': int(risk_class),
        'risk_proba': risk_proba.tolist()
    }
    """

    {result_obj, _globals} = Pythonx.eval(python_code, %{})
    result = Pythonx.decode(result_obj)

    {:ok, result}
  end
end
