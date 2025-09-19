defmodule PiggybankWeb.PageController do
  use PiggybankWeb, :controller

  alias PiggybankWeb.Serializers.FinancialDataSerializer

  def home(conn, _params) do
    conn
    |> assign(:page_title, "홈")
    |> render_inertia("HomePage")
  end

  def features(conn, _params) do
    conn
    |> assign(:page_title, "기능")
    |> render_inertia("FeaturesPage")
  end

  def how_it_works(conn, _params) do
    conn
    |> assign(:page_title, "How It Works")
    |> render_inertia("HowItWorksPage")
  end

  def submit_step1(conn, %{"personal_info" => personal_info}) do
    normalized_personal_info = normalize_personal_info(personal_info)

    # 개인정보 기반으로 금융 데이터 생성
    financial_data_result =
      Piggybank.BamlClient.GenerateFinancialData.call(%{personal_info: normalized_personal_info})

    # Handle the result tuple and serialize appropriately
    serialized_financial_data =
      case financial_data_result do
        {:ok, financial_data} ->
          FinancialDataSerializer.to_map(financial_data)

        {:error, reason} ->
          FinancialDataSerializer.to_map({:error, reason})

        _ ->
          FinancialDataSerializer.to_map(nil)
      end

    conn
    |> put_session(:personal_info, personal_info)
    |> put_session(:financial_data, serialized_financial_data)
    |> redirect(to: "/analyze/step/2")
  end

  def submit_step2(conn, %{"financial_data" => financial_data}) do
    personal_info = get_session(conn, :personal_info)

    # 분석 계산 수행
    analysis_result = calculate_analysis(personal_info, financial_data)

    conn
    |> put_session(:analysis_result, analysis_result)
    |> redirect(to: "/analyze/step/3")
  end

  def analyze(conn, %{"step" => step}) do
    case step do
      "1" ->
        conn
        |> assign(:page_title, "개인정보 입력")
        |> assign_prop(:step, step)
        |> render_inertia("AnalyzePage")

      "2" ->
        personal_info = get_session(conn, :personal_info) || %{}
        financial_data = get_session(conn, :financial_data) || %{}

        conn
        |> assign(:page_title, "금융정보 분류")
        |> assign_prop(:step, step)
        |> assign_prop(:personal_info, personal_info)
        |> assign_prop(:financial_data, financial_data)
        |> render_inertia("AnalyzePage")

      "3" ->
        personal_info = get_session(conn, :personal_info) || %{}
        analysis_result = get_session(conn, :analysis_result) || %{}

        conn
        |> assign(:page_title, "분석 결과")
        |> assign_prop(:step, step)
        |> assign_prop(:personal_info, personal_info)
        |> assign_prop(:analysis_result, analysis_result)
        |> render_inertia("AnalyzePage")

      _ ->
        redirect(conn, to: "/analyze/step/1")
    end
  end

  def analyze(conn, _params) do
    conn
    |> assign(:page_title, "개인정보 입력")
    |> assign_prop(:step, "1")
    |> render_inertia("AnalyzePage")
  end

  # personal_info를 BAML 함수가 기대하는 형태로 정규화
  defp normalize_personal_info(personal_info) do
    age =
      case personal_info["age"] do
        age when is_binary(age) ->
          case Integer.parse(age) do
            {int_age, _} -> int_age
            # 기본값
            :error -> 25
          end

        age when is_integer(age) ->
          age

        # 기본값
        _ ->
          25
      end

    %{
      "fullName" => personal_info["fullName"] || "",
      "gender" => personal_info["gender"] || "",
      "age" => age,
      "companyName" => personal_info["companyName"] || ""
    }
  end

  # 분석 계산 로직
  defp calculate_analysis(personal_info, financial_data) do
    # TODO: 실제 분석 로직 구현
    %{
      total_income: calculate_total_income(financial_data),
      total_spending: calculate_total_spending(financial_data),
      total_investment: calculate_total_investment(financial_data),
      savings_rate: calculate_savings_rate(financial_data),
      recommendations: generate_recommendations(personal_info, financial_data)
    }
  end

  defp calculate_total_income(financial_data) do
    financial_data["income"]
    |> Enum.reduce(0, fn item, acc ->
      amount = parse_amount(item["amount"])
      acc + amount
    end)
  end

  defp calculate_total_spending(financial_data) do
    financial_data["spending"]
    |> Enum.reduce(0, fn item, acc ->
      amount = parse_amount(item["amount"])
      acc + amount
    end)
  end

  defp calculate_total_investment(financial_data) do
    financial_data["investment"]
    |> Enum.reduce(0, fn item, acc ->
      amount = parse_amount(item["amount"])
      acc + amount
    end)
  end

  defp calculate_savings_rate(financial_data) do
    income = calculate_total_income(financial_data)
    spending = calculate_total_spending(financial_data)

    if income > 0 do
      ((income - spending) / income * 100) |> Float.round(1)
    else
      0.0
    end
  end

  defp generate_recommendations(_personal_info, financial_data) do
    savings_rate = calculate_savings_rate(financial_data)

    cond do
      savings_rate < 10 ->
        [
          "지출을 줄이고 저축을 늘려보세요",
          "비필수 지출을 재검토해보세요"
        ]

      savings_rate < 20 ->
        ["저축률이 양호합니다", "투자를 고려해보세요"]

      true ->
        ["훌륭한 저축률입니다!", "다양한 투자 옵션을 검토해보세요"]
    end
  end

  defp parse_amount(amount_string) do
    amount_string
    |> String.replace(~r/[^\d]/, "")
    |> case do
      "" -> 0
      num_str -> String.to_integer(num_str)
    end
  end
end
