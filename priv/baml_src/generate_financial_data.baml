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
    제공된 개인 정보를 바탕으로 한국인 개인의 종합적인 금융 데이터를 생성하세요.

    개인 정보: {{ personal_info }}

    다음 요소를 바탕으로 라이프스타일, 소득 수준, 그리고 금융 니즈를 추론하세요:
    - 나이: 인생 단계 판단 (20대 학생/신입사원, 30대 경력 축적, 40대+ 가정/시니어 경력)
    - 성별: 한국의 문화적 금융 패턴 고려
    - 회사: 연봉 범위와 복리후생 추정 (대기업 vs 중소기업 vs 스타트업 vs 공공기관)

    정확히 3가지 카테고리를 생성하세요:
    1. 수입: 급여, 부수입, 수동소득 등
    2. 지출: 음식, 공공요금, 교통, 임대료, 엔터테인먼트, 쇼핑, 보험, 세금, 가족 지원 등
    3. 투자: 주식, 편드, 부동산, 가상화폐, 저축 등

    editable 필드에 대한 중요한 규칙:
    - AI가 분류를 명확하게 판단할 수 있는 항목은 editable = false로 설정:
      * 명확한 수입: 월급, 연금, 아르바이트 수입
      * 명확한 필수 지출: 임대료, 전기요금, 가스요금, 수도요금, 학비, 의료비
      * 명확한 선택적 지출: 영화관, 커피샵, 온라인 쇼핑, 게임 구매
      * 명확한 투자: 주식 거래, 예금 예치
    - AI가 분류를 모호하거나 애매하게 판단할 수밖에 없는 항목은 editable = true로 설정:
      * 모호한 수입: 선물, 용돈, 보너스 (필수인지 선택적인지 모호함)
      * 모호한 지출: 외식비 (필수인지 선택적인지 모호함), 의류비, 교통비, 가족 용돈, 취미비용
      * 모호한 투자: 비트코인, 편드, 비상금 (성격이 모호함)

    기타 요구사항:
    - 전체 카테고리에서 최대 10개의 금융 항목 생성
    - 이 사람의 프로필에 가장 관련성 높고 중요한 항목들에 집중
    - editable = true인 항목들이 전체의 30-40% 정도가 되도록 조절 (사용자가 분류할 수 있는 적절한 양)
    - 한국 원 금액에 "원" 접미사 사용 (예: "250만원")
    - 적절한 빈도 사용: "월별", "연별", "주별", "일회성"
    - 적절한 곳에 관련 아이콘 포함
    - 한국 문화적 상황 고려 (가족 지원, 주거비 등)
    - 모든 금융 항목들은 한국어로 명명하세요

    이 사람의 추론된 프로필을 바탕으로 현실적인 금액과 카테고리를 생성하세요.

    출력 JSON 스키마:
    {{ ctx.output_format }}

    JSON:
  "#
}
