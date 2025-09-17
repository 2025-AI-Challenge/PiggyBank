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
              Your AI-powered financial fitness coach for young professionals.
              Track, improve, and gamify your path to financial freedom.
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

          {/* Product */}
          <div>
            <h6 className="text-lg font-semibold mb-4">Product</h6>
            <ul className="space-y-3">
              <li>
                <a
                  href="/features"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/how-it-works"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/api"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  API Documentation
                </a>
              </li>
              <li>
                <a
                  href="/security"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h6 className="text-lg font-semibold mb-4">Company</h6>
            <ul className="space-y-3">
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/press"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Press Kit
                </a>
              </li>
              <li>
                <a
                  href="/community"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h6 className="text-lg font-semibold mb-4">Support</h6>
            <ul className="space-y-3">
              <li>
                <a
                  href="/help"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/cookies"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Cookie Policy
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

        {/* 앱 다운로드 */}
        <div className="mb-8">
          <h6 className="text-lg font-semibold mb-4">Download the App</h6>
          <p className="text-gray-400 mb-4 text-sm">
            Available for iOS and Android
          </p>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              <Smartphone className="h-4 w-4" />
              <div className="text-left">
                <div className="text-xs text-gray-400">Download for</div>
                <div className="text-sm font-semibold">iOS</div>
              </div>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              <Smartphone className="h-4 w-4" />
              <div className="text-left">
                <div className="text-xs text-gray-400">Download for</div>
                <div className="text-sm font-semibold">Android</div>
              </div>
            </button>
          </div>
        </div>

        {/* 하단 카피라이트 */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © 2025 FinFit. All rights reserved. | Made with ❤️ for young
            professionals in Korea
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
