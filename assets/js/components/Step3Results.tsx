import React from "react";
import {
  User,
  Calendar,
  Users,
  Building,
  DollarSign,
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

interface Step3ResultsProps {
  formData: FormData;
  analysisResult?: any;
}

const Step3Results: React.FC<Step3ResultsProps> = ({
  formData,
  analysisResult,
}) => {
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
          <div className="flex items-center justify-center">
            <CircularProgress percentage={82} color="#ffffff" size={160} />
          </div>
          <div className="mt-6">
            <p className="text-3xl font-bold">82/100</p>
            <p className="text-lg opacity-90">매우 우수한 상태</p>
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
              <CircularProgress percentage={90} color="#10b981" />
            </div>
            <div className="mt-4">
              <p className="text-lg font-bold text-gray-900">90/100</p>
              <p className="text-xs text-gray-500">성장 가능성 확인</p>
            </div>
          </div>

          {/* Investment */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center h-64 flex flex-col justify-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="text-sm font-medium text-gray-600">투자</h3>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <CircularProgress percentage={78} color="#8b5cf6" />
            </div>
            <div className="mt-4">
              <p className="text-lg font-bold text-gray-900">78/100</p>
              <p className="text-xs text-gray-500">포트폴리오 구축 중</p>
            </div>
          </div>

          {/* Spending */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center h-64 flex flex-col justify-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-medium text-gray-600">지출</h3>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <CircularProgress percentage={80} color="#3b82f6" />
            </div>
            <div className="mt-4">
              <p className="text-lg font-bold text-gray-900">80/100</p>
              <p className="text-xs text-gray-500">최적화 개선 여지 있음</p>
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

          {analysisResult?.recommendations ? (
            <div className="space-y-4">
              {analysisResult.recommendations.map(
                (recommendation: string, index: number) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{recommendation}</p>
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  고정비 절감
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  고정 구독료와 정기 결제를 최적화하여 월 20만원을 절약할 수
                  있습니다.
                </p>
                <div className="text-xs">
                  <span className="text-blue-600 font-medium">
                    예상 절약액: 월 20만원
                  </span>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  신용카드 혜택 최적화
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  신용카드 혜택과 캐시백 프로그램을 최적화하면 점수를 12점
                  개선할 수 있습니다.
                </p>
                <div className="text-xs">
                  <span className="text-green-600 font-medium">
                    점수 개선: +12점
                  </span>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  자동 투자 시작
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  월 자동 투자를 설정하면 장기 자산을 35% 늘릴 수 있습니다.
                </p>
                <div className="text-xs">
                  <span className="text-purple-600 font-medium">
                    장기 성장: +35%
                  </span>
                </div>
              </div>
            </div>
          )}
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
