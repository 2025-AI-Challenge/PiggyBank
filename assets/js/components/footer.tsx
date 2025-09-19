import React from "react";
import {
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Smartphone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 브랜드 정보 */}
          <div className="col-span-1 md:col-span-1">
            <h5 className="text-2xl font-bold text-blue-400 mb-2">FinFit</h5>
            <p className="text-white/80 mb-6 leading-relaxed text-sm">
              청년 전문직을 위한 AI 기반 금융 피트니스 코치입니다. 재정 자유로
              가는 길을 추적하고, 개선하며, 게임화해보세요.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* 제품 */}
          <div>
            <h6 className="text-lg font-semibold mb-4">제품</h6>
            <ul className="space-y-3">
              <li>
                <a
                  href="/features"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  기능
                </a>
              </li>
              <li>
                <a
                  href="/how-it-works"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  사용 방법
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  요금제
                </a>
              </li>
              <li>
                <a
                  href="/api"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  API 문서
                </a>
              </li>
              <li>
                <a
                  href="/security"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  보안
                </a>
              </li>
            </ul>
          </div>

          {/* 회사 */}
          <div>
            <h6 className="text-lg font-semibold mb-4">회사</h6>
            <ul className="space-y-3">
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  회사 소개
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  채용
                </a>
              </li>
              <li>
                <a
                  href="/press"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  보도자료
                </a>
              </li>
              <li>
                <a
                  href="/community"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  커뮤니티
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  블로그
                </a>
              </li>
            </ul>
          </div>

          {/* 지원 */}
          <div>
            <h6 className="text-lg font-semibold mb-4">지원</h6>
            <ul className="space-y-3">
              <li>
                <a
                  href="/help"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  고객지원센터
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  고객 지원 문의
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  서비스 이용약관
                </a>
              </li>
              <li>
                <a
                  href="/cookies"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  쿠키 정책
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 구분선 */}
        <hr className="border-gray-700 my-8" />

        {/* 연락처 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-blue-400" />
            <span className="text-gray-300">support@finfit.co.kr</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-blue-400" />
            <span className="text-gray-300">+82-2-1234-5678</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-blue-400" />
            <span className="text-gray-300">Seoul, South Korea</span>
          </div>
        </div>

        {/* 하단 카피라이트 */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © 2025 FinFit. © ALL RIGHTS RESERVED | 한국의 청년을 위해 ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
