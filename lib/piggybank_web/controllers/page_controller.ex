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

    baml_result = Piggybank.BamlClient.AnalyzeFinancialData.call(%{input: financial_data})

    financial_analysis_result =
      with {:ok, analyzed_data} <- baml_result,
           {:ok, script_result} <-
             Piggybank.FinanceAi.FinanceModel.run_python_script(analyzed_data) do
        script_result
      else
        _ -> nil
      end

    conn
    |> put_session(:financial_analysis_result, financial_analysis_result)
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
        financial_analysis_result = get_session(conn, :financial_analysis_result) || %{}

        conn
        |> assign(:page_title, "분석 결과")
        |> assign_prop(:step, step)
        |> assign_prop(:personal_info, personal_info)
        |> assign_prop(:financial_analysis_result, financial_analysis_result)
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

  defp parse_amount(amount_string) do
    amount_string
    |> String.replace(~r/[^\d]/, "")
    |> case do
      "" -> 0
      num_str -> String.to_integer(num_str)
    end
  end
end
