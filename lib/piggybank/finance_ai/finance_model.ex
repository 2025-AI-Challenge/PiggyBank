defmodule Piggybank.FinanceAi.FinanceModel do
  @moduledoc """
  파이썬 스크립트를 실행하는 기본 모듈
  """

  def run_python_script(baml_result \\ %{}) do
    # BAML struct를 Python 파라미터 맵으로 변환
    input_data = convert_baml_to_python_params(baml_result)

    # 현재 작업 디렉토리 기반으로 절대 경로 구성
    model_path = Path.join([Application.app_dir(:piggybank, "priv"), "models", "Fin_model_v1.pkl"])

    python_code = """
    import pandas as pd
    import pickle
    import os

    # 모델 로드
    model_path = '#{model_path}'
    with open(model_path, 'rb') as f:
        model_data = pickle.load(f)

    # 각 트리에 누락된 속성 추가
    for estimator in model_data['regressor'].estimators_:
        if not hasattr(estimator, 'monotonic_cst'):
            estimator.monotonic_cst = None

    for estimator in model_data['classifier'].estimators_:
        if not hasattr(estimator, 'monotonic_cst'):
            estimator.monotonic_cst = None

    # 기본값 설정
    default_data = {
        'total_spending': val_total_spending if 'val_total_spending' in locals() else 100000.0,
        'mean_spending': val_mean_spending if 'val_mean_spending' in locals() else 1.8,
        'n_transactions': val_n_transactions if 'val_n_transactions' in locals() else 140,
        '교육육아': val_education if 'val_education' in locals() else 0.12,
        '교통': val_transport if 'val_transport' in locals() else 0.14,
        '기타소비': val_other_consumption if 'val_other_consumption' in locals() else 0.15,
        '보건의료': val_healthcare if 'val_healthcare' in locals() else 0.11,
        '식료품음료': val_food_beverage if 'val_food_beverage' in locals() else 0.22,
        '오락문화': val_entertainment if 'val_entertainment' in locals() else 0.08,
        '주거': val_housing if 'val_housing' in locals() else 0.18,
        'est_income_만원': val_est_income if 'val_est_income' in locals() else 380.0,
        'essential_spending_ratio': val_essential_ratio if 'val_essential_ratio' in locals() else 0.51,
        'discretionary_spending_ratio': val_discretionary_ratio if 'val_discretionary_ratio' in locals() else 0.23,
        'investment_spending_ratio': val_investment_ratio if 'val_investment_ratio' in locals() else 0.12,
        'transport_spending_ratio': val_transport_ratio if 'val_transport_ratio' in locals() else 0.14,
        'avg_transaction_size': val_avg_transaction if 'val_avg_transaction' in locals() else 1.57,
        'transaction_frequency_score': val_frequency_score if 'val_frequency_score' in locals() else 1.0,
        'spending_balance_score': val_balance_score if 'val_balance_score' in locals() else 0.78,
        'rational_spending_score': val_rational_score if 'val_rational_score' in locals() else 0.85,
        'spending_low': val_spending_low if 'val_spending_low' in locals() else 0.0,
        'spending_mid': val_spending_mid if 'val_spending_mid' in locals() else 1.0,
        'spending_high': val_spending_high if 'val_spending_high' in locals() else 0.0
    }

    # DataFrame 생성
    input_data = pd.DataFrame([default_data])

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

    # input_data의 각 키-값 쌍을 개별 변수로 변환
    python_variables =
      input_data
      |> Enum.map(fn {key, value} ->
        variable_name =
          case key do
            "total_spending" -> "val_total_spending"
            "mean_spending" -> "val_mean_spending"
            "n_transactions" -> "val_n_transactions"
            "교육육아" -> "val_education"
            "교통" -> "val_transport"
            "기타소비" -> "val_other_consumption"
            "보건의료" -> "val_healthcare"
            "식료품음료" -> "val_food_beverage"
            "오락문화" -> "val_entertainment"
            "주거" -> "val_housing"
            "est_income_만원" -> "val_est_income"
            "essential_spending_ratio" -> "val_essential_ratio"
            "discretionary_spending_ratio" -> "val_discretionary_ratio"
            "investment_spending_ratio" -> "val_investment_ratio"
            "transport_spending_ratio" -> "val_transport_ratio"
            "avg_transaction_size" -> "val_avg_transaction"
            "transaction_frequency_score" -> "val_frequency_score"
            "spending_balance_score" -> "val_balance_score"
            "rational_spending_score" -> "val_rational_score"
            "spending_low" -> "val_spending_low"
            "spending_mid" -> "val_spending_mid"
            "spending_high" -> "val_spending_high"
            _ -> "val_#{key}"
          end

        {variable_name, value}
      end)
      |> Enum.into(%{})

    {result_obj, _globals} = Pythonx.eval(python_code, python_variables)
    result = Pythonx.decode(result_obj)

    {:ok, result}
  end

  # BAML struct를 Python 파라미터 맵으로 변환하는 함수
  defp convert_baml_to_python_params(baml_result) when is_map(baml_result) do
    %{
      "total_spending" => Map.get(baml_result, :total_spending),
      "mean_spending" => Map.get(baml_result, :mean_spending),
      "n_transactions" => Map.get(baml_result, :n_transactions),
      "교육육아" => Map.get(baml_result, :education_childcare),
      "교통" => Map.get(baml_result, :transport),
      "기타소비" => Map.get(baml_result, :other_consumption),
      "보건의료" => Map.get(baml_result, :healthcare),
      "식료품음료" => Map.get(baml_result, :food_beverage),
      "오락문화" => Map.get(baml_result, :entertainment_culture),
      "주거" => Map.get(baml_result, :housing),
      "est_income_만원" => Map.get(baml_result, :est_income_10000),
      "essential_spending_ratio" => Map.get(baml_result, :essential_spending_ratio),
      "discretionary_spending_ratio" => Map.get(baml_result, :discretionary_spending_ratio),
      "investment_spending_ratio" => Map.get(baml_result, :investment_spending_ratio),
      "transport_spending_ratio" => Map.get(baml_result, :transport_spending_ratio),
      "avg_transaction_size" => Map.get(baml_result, :avg_transaction_size),
      "transaction_frequency_score" => Map.get(baml_result, :transaction_frequency_score),
      "spending_balance_score" => Map.get(baml_result, :spending_balance_score),
      "rational_spending_score" => Map.get(baml_result, :rational_spending_score),
      "spending_low" => Map.get(baml_result, :spending_low),
      "spending_mid" => Map.get(baml_result, :spending_mid),
      "spending_high" => Map.get(baml_result, :spending_high)
    }
  end

  defp convert_baml_to_python_params(_), do: %{}
end
