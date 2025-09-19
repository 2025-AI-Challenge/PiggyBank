import React from "react";
import { Link } from "@inertiajs/react";
import {
  BarChart3,
  TrendingUp,
  Target,
  CheckCircle,
  Calendar,
  Award,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                나의 <span className="text-blue-600">금융</span>
                <br />
                <span className="text-blue-600">건강 지표</span>를 알아보세요
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                지출, 수입, 투자를 피트니스 지표처럼 추적하세요. 금융 건강
                점수를 확인하고 돈 관리 습관을 레벨업하세요!
              </p>
              <Link
                href="/analyze"
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                내 금융 건강 체크하기
              </Link>
            </div>

            {/* Finance Metrics */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">지출</h3>
                <p className="text-gray-600 text-sm">분석</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">수입</h3>
                <p className="text-gray-600 text-sm">추적</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">투자</h3>
                <p className="text-gray-600 text-sm">목표</p>
              </div>
            </div>
          </div>

          {/* Right Column - Finance Health Report Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
                나의 금융 건강 리포트
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      지출 건강도
                    </span>
                    <span className="text-sm font-semibold text-blue-600">
                      82/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      수입 성장
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      76/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "76%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      투자 점수
                    </span>
                    <span className="text-sm font-semibold text-purple-600">
                      64/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "64%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">74</div>
                <div className="text-sm font-medium text-gray-600">
                  전체 금융 건강 점수
                </div>
                <div className="text-xs text-green-600 mt-1">
                  이번 달 +18점 상승
                </div>
              </div>
            </div>

            {/* Phone with Money Image */}
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/images/home_img1.jpg"
                alt="Financial tracking on mobile device"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              금융 피트니스를 위한{" "}
              <span className="text-blue-600">모든 기능</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              피트니스 앱이 신체 건강을 추적하듯, FinFit은 종합적인 도구와
              인사이트로 금융 건강을 추적합니다.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Finance Health Report */}
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                금융 건강 리포트
              </h3>
              <p className="text-gray-600">
                지출, 수입, 투자 패턴을 상세히 분석한 Fitbit 스타일의 금융
                점수를 받아보세요.
              </p>
            </div>

            {/* Daily Checklist & Rewards */}
            <div className="bg-green-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                일일 체크리스트 & 리워드
              </h3>
              <p className="text-gray-600">
                매일 금융 과제를 완수하고 포인트를 얻으세요. 하루하루 건강한 돈
                관리 습관을 기르세요.
              </p>
            </div>

            {/* Goal Tracking with ETA */}
            <div className="bg-purple-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                ETA를 이용한 목표 추적
              </h3>
              <p className="text-gray-600">
                스마트 예측으로 금융 목표를 설정하고 추적하세요. 100만원,
                1000만원 저축에 언제 도달할지 정확히 알아보세요.
              </p>
            </div>

            {/* AI Challenges */}
            <div className="bg-orange-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI 챌린지
              </h3>
              <p className="text-gray-600">
                금융 괴물과 싸우고, 퀴스트를 완수하며, 재미있고 매력적인
                도전으로 돈 관리 스킬을 레벨업하세요.
              </p>
            </div>

            {/* Event Hub */}
            <div className="bg-pink-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                이벤트 허브
              </h3>
              <p className="text-gray-600">
                청년 전용 할인, 정부 지원 혜택, 문화 이벤트, 그리고 금융 기회에
                대한 독점 액세스.
              </p>
            </div>

            {/* Calendar Integration */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                캘린더 연동
              </h3>
              <p className="text-gray-600">
                Google 캘린더와 동기하고, 금융 리마인더를 설정하여 중요한 돈
                관리 마일스톤을 놓치지 마세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Fitness Tracker Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                나의 금융 피트니스 트랙커
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                종합적인 대시보드로 금융 건강을 실시간으로 모니터링하세요. 지출
                패턴, 수입 성장, 투자 성과를 한 곳에서 추적하세요.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">실시간 분석</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">성장 예측</span>
                </div>
              </div>
            </div>

            {/* Right Column - Progress Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  이번 달 진척 상황
                </h3>
                <span className="text-sm font-semibold text-green-600">
                  +15%
                </span>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    저축 목표
                  </span>
                  <span className="text-sm text-gray-500">₩3.2M / ₩6M</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: "53%" }}
                  ></div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">
                  예상 달성 시기: 2024년 3월
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
