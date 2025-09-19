import React, { useState, useRef, useEffect } from "react";
import { Link, usePage, useForm } from "@inertiajs/react";
import {
  BarChart3,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  User,
  Globe,
} from "lucide-react";

const Header = () => {
  const { props } = usePage();
  const user = props.user;
  const { delete: destroy } = useForm();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    destroy("/users/log_out");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">FinFit</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/features"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              기능
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              사용 방법
            </Link>
          </nav>

          <div className="flex items-center">
            <Link
              href="/analyze"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              무료 시작하기
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
