class FinancialItem {
  id int
  name string
  amount string
  category string
  frequency string
  editable bool
  icon string?
}

class FinancialData {
  income FinancialItem[]
  spending FinancialItem[]
  investment FinancialItem[]
}

class PersonalInfo {
  name string?
  gender string?
  age int?
  company_name string?
}

function GenerateFinancialData(personal_info: PersonalInfo) -> FinancialData {
  client Claude
  prompt #"
    {{ _.role('system') }}
    Based on the provided personal information, generate comprehensive financial data for a Korean individual.

    Personal Info: {{ personal_info }}

    Infer lifestyle, income level, and financial needs based on:
    - Age: Determine life stage (20s student/new worker, 30s career building, 40s+ family/senior career)
    - Gender: Consider cultural financial patterns in Korea
    - Company: Estimate salary range and benefits (large corp vs SME vs startup vs public sector)

    Generate exactly 3 categories:
    1. Income: salary, side income, passive income, etc.
    2. Spending: food, utilities, transport, rent, entertainment, shopping, insurance, taxes, family support, etc.
    3. Investment: stocks, funds, real estate, crypto, savings, etc.

    IMPORTANT Rules for editable field:
    - Set editable = false for FIXED costs that occur regularly and predictably:
      * Fixed income: monthly salary, pension
      * Fixed spending: rent, utilities, insurance premiums, loan payments, subscription fees, regular food expenses, transportation costs, taxes
    - Set editable = true for VARIABLE costs that can change or are discretionary:
      * Variable income: bonuses, freelance income, investment returns, gifts
      * Variable spending: entertainment, shopping, dining out, hobbies, travel, emergency expenses
      * All investments: stocks, funds, savings (since amounts can be adjusted)

    Other requirements:
    - Generate a maximum of 10 financial items total across all categories
    - Focus on the most relevant and important items for this person's profile
    - Use Korean Won amounts with "KRW" suffix (e.g., "2,500,000 KRW")
    - Use appropriate frequencies: "Monthly", "Yearly", "Weekly", "One-time"
    - Include relevant icons where appropriate
    - Consider Korean cultural context (family support, housing costs, etc.)

    Generate realistic amounts and categories based on the person's inferred profile.

    Output JSON schema:
    {{ ctx.output_format }}

    JSON:
  "#
}
