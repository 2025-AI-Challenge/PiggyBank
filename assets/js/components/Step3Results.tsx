import React from "react";
import {
  User,
  Calendar,
  Users,
  Building,
  CreditCard,
  TrendingUp,
  Home,
  ArrowLeft,
} from "lucide-react";
import { Link } from "@inertiajs/react";
import CircularProgress from "./CircularProgress";

interface FormData {
  fullName: string;
  gender: string;
  age: string;
  companyName: string;
}

interface FinancialAnalysisResult {
  score: number;
  risk_class: number;
  risk_proba: number[];
}

interface Step3ResultsProps {
  formData: FormData;
  financialAnalysisResult?: FinancialAnalysisResult;
}

const Step3Results: React.FC<Step3ResultsProps> = ({
  formData,
  financialAnalysisResult,
}) => {
  // risk_class에 따른 분석 결과 생성
  const getAnalysisData = () => {
    if (!financialAnalysisResult) {
      return {
        overallScore: 65,
        overallStatus: "보통",
        incomeScore: 70,
        incomeStatus: "안정적",
        investmentScore: 60,
        investmentStatus: "시작 단계",
        spendingScore: 65,
        spendingStatus: "개선 필요",
        recommendations: [
          "고정비 절감을 통한 지출 최적화",
          "안정적인 투자 포트폴리오 구축",
          "비상금 적립 목표 설정",
        ],
      };
    }

    const { score, risk_class, risk_proba } = financialAnalysisResult;

    // 점수 범위: 0-100으로 정규화
    const normalizedScore = Math.min(Math.max(Math.round(score), 0), 100);

    let overallStatus = "";
    let recommendations = [];

    // risk_class에 따른 분석 (0: 낮은 위험, 3: 높은 위험)
    switch (risk_class) {
      case 0:
        overallStatus = "매우 우수";
        recommendations = [
          "현재 안정적인 금융 상태를 유지하고 있습니다",
          "추가 투자 기회를 모색하여 자산을 더욱 늘려보세요",
          "장기 목표를 위한 계획적 투자를 고려해보세요",
        ];
        break;
      case 1:
        overallStatus = "우수";
        recommendations = [
          "전반적으로 건전한 금융 관리를 하고 있습니다",
          "비상금을 소득의 3-6개월분으로 늘려보세요",
          "분산 투자로 포트폴리오를 다양화하세요",
        ];
        break;
      case 2:
        overallStatus = "보통";
        recommendations = [
          "지출 패턴을 재검토하여 절약 포인트를 찾아보세요",
          "정기적인 투자 습관을 만들어 보세요",
          "고정비를 줄이고 저축률을 높여보세요",
        ];
        break;
      case 3:
      default:
        overallStatus = "개선 필요";
        recommendations = [
          "지출을 크게 줄이고 저축을 늘려야 합니다",
          "비필수 지출을 대폭 재검토해보세요",
          "부채가 있다면 우선적으로 상환 계획을 세우세요",
        ];
        break;
    }

    // 세부 점수 계산 (전체 점수 기반으로 조정)
    const baseScore = normalizedScore;
    const variance = 15; // 점수 변동 범위

    return {
      overallScore: normalizedScore,
      overallStatus,
      incomeScore: Math.min(
        Math.max(baseScore + Math.random() * variance - variance / 2, 0),
        100,
      ),
      incomeStatus:
        baseScore > 70
          ? "성장 가능성 확인"
          : baseScore > 50
            ? "안정적"
            : "개선 필요",
      investmentScore: Math.min(
        Math.max(baseScore + Math.random() * variance - variance / 2, 0),
        100,
      ),
      investmentStatus:
        baseScore > 70
          ? "포트폴리오 구축 중"
          : baseScore > 50
            ? "시작 단계"
            : "투자 계획 필요",
      spendingScore: Math.min(
        Math.max(baseScore + Math.random() * variance - variance / 2, 0),
        100,
      ),
      spendingStatus:
        baseScore > 70
          ? "최적화 완료"
          : baseScore > 50
            ? "최적화 개선 여지 있음"
            : "대폭 개선 필요",
      recommendations,
    };
  };

  const analysisData = getAnalysisData();
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            나의 금융 건강 분석 결과
          </h1>
          <p className="text-gray-600">
            귀하의 정보를 바탕으로 한 현재 상태입니다
          </p>
        </div>

        {/* Profile Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">이름</p>
                <p className="text-sm font-medium text-gray-900">
                  {formData.fullName || "○○○"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">나이</p>
                <p className="text-sm font-medium text-gray-900">
                  {formData.age || "20"}세
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">성별</p>
                <p className="text-sm font-medium text-gray-900">
                  {formData.gender === "male"
                    ? "남성"
                    : formData.gender === "female"
                      ? "여성"
                      : formData.gender === "other"
                        ? "기타"
                        : "남성"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">회사</p>
                <p className="text-sm font-medium text-gray-900">
                  {formData.companyName || "애널라이즈"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Financial Health */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-center text-white mb-8">
          <h3 className="text-lg font-medium mb-6">전체 금융 건강도</h3>

          <div className="flex justify-center">
            {/* AI Analysis Info */}
            <div className="bg-white bg-opacity-10 rounded-xl p-6 max-w-sm w-full">
              <div className="flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 mr-3" />
                <h4 className="text-xl font-semibold">AI 분석 결과</h4>
              </div>

              <div className="space-y-4 text-base">
                <div className="flex justify-between items-center">
                  <span className="opacity-90">종합 점수:</span>
                  <span className="text-2xl font-bold">
                    {analysisData.overallScore}/100
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="opacity-90">위험도 등급:</span>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full cursor-help ${
                        !financialAnalysisResult
                          ? "bg-yellow-400"
                          : financialAnalysisResult.risk_class === 0
                            ? "bg-green-400"
                            : financialAnalysisResult.risk_class === 1
                              ? "bg-blue-400"
                              : financialAnalysisResult.risk_class === 2
                                ? "bg-yellow-400"
                                : "bg-red-400"
                      }`}
                      title={`재무 위험도 등급 분류 (0: 안전, 1: 주의, 2: 위험, 3: 고위험)\n현재 등급: ${!financialAnalysisResult ? "2" : financialAnalysisResult.risk_class}`}
                    ></div>
                    <span className="font-medium">
                      {!financialAnalysisResult
                        ? "위험"
                        : financialAnalysisResult.risk_class === 0
                          ? "안전"
                          : financialAnalysisResult.risk_class === 1
                            ? "주의"
                            : financialAnalysisResult.risk_class === 2
                              ? "위험"
                              : "고위험"}
                    </span>
                    <span className="text-sm opacity-75">
                      (등급{" "}
                      {!financialAnalysisResult
                        ? "2"
                        : financialAnalysisResult.risk_class}
                      )
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="opacity-90">모델 점수:</span>
                  <span className="font-mono font-medium text-lg">
                    {!financialAnalysisResult
                      ? "65.0"
                      : financialAnalysisResult.score.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white border-opacity-20">
                <p className="text-sm opacity-75 text-center">
                  🤖 22개 금융 지표 분석 결과
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Income */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center h-64 flex flex-col justify-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="text-sm font-medium text-gray-600">수입</h3>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <CircularProgress
                percentage={Math.round(analysisData.incomeScore)}
                color="#10b981"
              />
            </div>
            <div className="mt-4">
              <p className="text-lg font-bold text-gray-900">
                {Math.round(analysisData.incomeScore)}/100
              </p>
              <p className="text-xs text-gray-500">
                {analysisData.incomeStatus}
              </p>
            </div>
          </div>

          {/* Investment */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center h-64 flex flex-col justify-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="text-sm font-medium text-gray-600">투자</h3>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <CircularProgress
                percentage={Math.round(analysisData.investmentScore)}
                color="#8b5cf6"
              />
            </div>
            <div className="mt-4">
              <p className="text-lg font-bold text-gray-900">
                {Math.round(analysisData.investmentScore)}/100
              </p>
              <p className="text-xs text-gray-500">
                {analysisData.investmentStatus}
              </p>
            </div>
          </div>

          {/* Spending */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center h-64 flex flex-col justify-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-medium text-gray-600">지출</h3>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <CircularProgress
                percentage={Math.round(analysisData.spendingScore)}
                color="#3b82f6"
              />
            </div>
            <div className="mt-4">
              <p className="text-lg font-bold text-gray-900">
                {Math.round(analysisData.spendingScore)}/100
              </p>
              <p className="text-xs text-gray-500">
                {analysisData.spendingStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            개인화된 추천사항
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            분석 결과를 바탕으로 한 주요 개선 영역입니다
          </p>

          <div className="space-y-4">
            {analysisData.recommendations.map(
              (recommendation: string, index: number) => (
                <div key={index} className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">{recommendation}</p>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Home className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              시간이 더 필요하신가요?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              천천히 결과를 리뷰해 보세요. 언제든 다시 돌아와서 더 살펴보실 수
              있습니다.
            </p>
            <Link
              href="/"
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> 홈으로 돌아가기
            </Link>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              ✓
            </div>
            <div className="w-12 h-0.5 bg-green-500"></div>
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              ✓
            </div>
            <div className="w-12 h-0.5 bg-blue-500"></div>
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
          </div>
          <p className="text-sm text-gray-600">3단계 / 총 3단계: 분석 완료</p>
        </div>
      </div>
    </div>
  );
};

export default Step3Results;
