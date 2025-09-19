import React from "react";
import { Link } from "@inertiajs/react";
import {
  Upload,
  BarChart3,
  Target,
  Award,
  ArrowRight,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">FinFit</span> 사용법
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            금융 피트니스 여정을 시작하는 것은 간단합니다.
            이 네 가지 쉽은 단계를 따라 돈 관리 습관을 변화시켜보세요.
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
                1단계
              </span>
            </div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              금융 데이터 입력
            </h3>
            <p className="text-gray-600 mb-6">
              계정을 연결하거나 지출, 수입, 투자 정보를
              수동으로 안전하게 입력하세요.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                은행 계정 연결
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                수동 데이터 입력
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                안전한 암호화
              </li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-green-100 text-green-600 text-sm font-semibold px-3 py-1 rounded-full">
                2단계
              </span>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              금융 건강 점수 받기
            </h3>
            <p className="text-gray-600 mb-6">
              지출, 수입, 투자 성과에 대한 점수를 포함한
              종합적인 금융 건강 리포트를 받아보세요.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                지출 분석
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                수입 추적
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                투자 인사이트
              </li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-purple-100 text-purple-600 text-sm font-semibold px-3 py-1 rounded-full">
                3단계
              </span>
            </div>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              개인화된 계획 받기
            </h3>
            <p className="text-gray-600 mb-6">
              금융 건강 점수를 바탕으로 맞춤형 목표, 일일 체크리스트,
              그리고 실행 가능한 추천사항을 받아보세요.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                맞춤형 목표 설정
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                일일 과제
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                스마트 추천사항
              </li>
            </ul>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full">
                4단계
              </span>
            </div>
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              리워드 획등 & 개선
            </h3>
            <p className="text-gray-600 mb-6">
              챌린지를 완료하고, 금융 습관을 레벨업하며,
              시간이 지남에 따라 금융 건강 점수가 개선되는 모습을 지켜보세요.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                일일 챌린지
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                리워드 시스템
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                진척 추적
              </li>
            </ul>
          </div>
        </div>

        {/* Process Flow */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            나의 금융 피트니스 여정
          </h2>
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="flex-1 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                연결 & 분석
              </h3>
              <p className="text-gray-600 text-sm">
                금융 데이터를 안전하게 입력
              </p>
            </div>

            <ArrowRight className="w-8 h-8 text-gray-400 rotate-90 lg:rotate-0" />

            <div className="flex-1 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                점수 받기
              </h3>
              <p className="text-gray-600 text-sm">
                개인화된 건강 리포트 받기
              </p>
            </div>

            <ArrowRight className="w-8 h-8 text-gray-400 rotate-90 lg:rotate-0" />

            <div className="flex-1 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                계획 따라하기
              </h3>
              <p className="text-gray-600 text-sm">
                일일 과제와 챌린지 완수
              </p>
            </div>

            <ArrowRight className="w-8 h-8 text-gray-400 rotate-90 lg:rotate-0" />

            <div className="flex-1 text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">결과 확인</h3>
              <p className="text-gray-600 text-sm">
                시간이 지남에 따라 점수 개선 확인
              </p>
            </div>
          </div>
        </div>

        {/* Success Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              성공 사례에 동참하세요
            </h2>
            <p className="text-xl opacity-90">
              FinFit이 수천 명의 사용자들의 금융 습관을
              어떻게 변화시켰는지 확인해보세요
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">87%</div>
              <p className="opacity-90">사용자들이 저축률을 개선</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">₩2.3M</div>
              <p className="opacity-90">6개월 평균 절약 금액</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">92%</div>
              <p className="opacity-90">사용자들이 금융 목표를 지속적으로 실행</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            금융 피트니스 여정을 시작할 준비가 되셨나요?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            FinFit으로 이미 금융 건강을 개선하고 있는
            수천 명의 청년 전문직들과 함께하세요.
          </p>
          <Link
            href="/analyze"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            내 금융 건강 점수 확인하기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
