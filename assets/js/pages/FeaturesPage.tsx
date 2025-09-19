import React from "react";
import { Link } from "@inertiajs/react";
import {
  BarChart3,
  CheckCircle,
  Target,
  Award,
  TrendingUp,
  Calendar,
  Smartphone,
  Shield,
  Users,
  Zap,
  Brain,
  Heart,
} from "lucide-react";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            필요한 <span className="text-blue-600">모든 기능</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            FinFit은 피트니스 온리과 금융 관리를 결합하여
            매일의 운동만큼 재미있고 보람 있는 돈 관리를 제공합니다.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Finance Health Report */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              금융 건강 리포트
            </h3>
            <p className="text-gray-600 mb-6">
              지출 패턴, 수입 동향, 투자 성과를 상세히 분석한
              종합적인 금융 건강 점수를 받아보세요.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                실시간 건강 점수
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                개인화된 추천사항
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                월별 진척 추적
              </li>
            </ul>
          </div>

          {/* Daily Checklist & Rewards */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              일일 체크리스트 & 리워드
            </h3>
            <p className="text-gray-600 mb-6">
              일일 과제로 건강한 금융 습관을 기르고,
              실제 리워드와 혜택을 얻을 수 있는 포인트를 얻으세요.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                맞춤형 일일 과제
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                포인트 기반 리워드 시스템
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                습관 연속 실행 추적
              </li>
            </ul>
          </div>

          {/* Goal Tracking with ETA */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              스마트 목표 추적
            </h3>
            <p className="text-gray-600 mb-6">
              지능적인 ETA 예측으로 금융 목표를 설정하세요.
              100만원, 1000만원 저축 마일스톤에 언제 도달할지 정확히 알아보세요.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                AI 기반 예측
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                시각적 진척 추적
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                마일스톤 축하
              </li>
            </ul>
          </div>

          {/* AI Challenges */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              AI 금융 챌린지
            </h3>
            <p className="text-gray-600 mb-6">
              AI가 생성하는 챌린지, 몬스터 배틀, 그리고 돈 관리 스킬 레벨업으로
              금융 여정을 게임화하세요.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                개인화된 챌린지
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                RPG 스타일 진행
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                업적 시스템
              </li>
            </ul>
          </div>

          {/* Event Hub */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">이벤트 허브</h3>
            <p className="text-gray-600 mb-6">
              청년 전용 할인, 정부 혜택, 문화 이벤트, 그리고 금융 기회를
              모두 한 곳에서 이용하세요.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                청년 맞춤 할인
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                정부 혜택 알림
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                문화 이벤트 캘린더
              </li>
            </ul>
          </div>

          {/* Calendar Integration */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <Calendar className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              스마트 캘린더 연동
            </h3>
            <p className="text-gray-600 mb-6">
              Google 캘린더와 동기하고, 금융 리마인더를 설정하여
              중요한 돈 관리 마일스톤이나 청구서 지불일을 놓치지 마세요.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Google 캘린더 동기
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                스마트 리마인더
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                청구서 지불일 추적
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            왜 FinFit을 선택해야 할까요?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">모바일 우선</h3>
              <p className="text-gray-600 text-sm">
                이동 중 금융 관리를 위해 설계됨
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">보안</h3>
              <p className="text-gray-600 text-sm">
                금융 데이터를 위한 은행 레벨 보안
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI 기반</h3>
              <p className="text-gray-600 text-sm">
                스마트 인사이트와 개인화된 추천
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">커뮤니티</h3>
              <p className="text-gray-600 text-sm">
                같은 마음의 청년 전문직들과 연결
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            금융 습관을 변화시킬 준비가 되셨나요?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            이미 돈 관리 게임을 레벨업하고 있는
            수천 명의 청년 전문직들과 함께하세요.
          </p>
          <Link
            href="/analyze"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
          >
            무료로 시작하기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
