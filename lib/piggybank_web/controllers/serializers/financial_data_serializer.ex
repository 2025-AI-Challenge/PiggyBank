defmodule PiggybankWeb.Serializers.FinancialDataSerializer do
  def to_map(%Piggybank.BamlClient.FinancialData{} = financial_data) do
    %{
      income: serialize_items(financial_data.income),
      spending: serialize_items(financial_data.spending),
      investment: serialize_items(financial_data.investment)
    }
  end

  # BAML 호출이 실패했을 때의 에러 처리
  def to_map({:error, _reason}) do
    generate_default_financial_data()
  end

  def to_map(_) do
    generate_default_financial_data()
  end

  def assign_prop(conn, name, financial_data) do
    Inertia.Controller.assign_prop(conn, name, fn -> to_map(financial_data) end)
  end

  defp serialize_items(items) when is_list(items) do
    Enum.map(items, &serialize_item/1)
  end

  defp serialize_items(_), do: []

  defp serialize_item(%Piggybank.BamlClient.FinancialItem{} = item) do
    %{
      id: item.id,
      name: item.name,
      amount: item.amount,
      category: normalize_category(item.category, item.editable),
      frequency: normalize_frequency(item.frequency, item.editable),
      editable: item.editable,
      icon: item.icon
    }
  end

  defp serialize_item(_), do: nil

  defp generate_default_financial_data do
    %{
      income: [],
      spending: [],
      investment: []
    }
  end

  # 카테고리를 프론트엔드에서 사용하는 형태로 정규화
  defp normalize_category(category, editable) when is_binary(category) do
    if editable do
      "" # editable 항목은 빈 값으로 (사용자가 선택하도록)
    else
      case String.downcase(category) do
        cat when cat in ["primary income", "bonus", "housing", "bills", "living expenses", "transportation"] ->
          "Essential"
        cat when cat in ["leisure", "entertainment"] ->
          "Non-essential"
        _ ->
          "Essential"
      end
    end
  end

  defp normalize_category(_, _), do: "Essential"

  # 빈도를 프론트엔드에서 사용하는 형태로 정규화
  defp normalize_frequency(frequency, editable) when is_binary(frequency) do
    if editable do
      "" # editable 항목은 빈 값으로 (사용자가 선택하도록)
    else
      case String.downcase(frequency) do
        "monthly" -> "Recurring"
        "yearly" -> "One-time"
        _ -> "Recurring"
      end
    end
  end

  defp normalize_frequency(_, _), do: "Recurring"
end