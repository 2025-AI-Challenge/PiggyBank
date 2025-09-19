import React from "react";
import { User, Calendar, Users, Building, DollarSign, CreditCard, TrendingUp, ChevronDown, Home } from "lucide-react";

interface FinancialItem {
  id: number;
  name: string;
  amount: string;
  category: string;
  frequency: string;
  editable: boolean;
  icon?: string;
}

interface FormData {
  fullName: string;
  gender: string;
  age: string;
  companyName: string;
}

interface FinancialData {
  income: FinancialItem[];
  spending: FinancialItem[];
  investment: FinancialItem[];
}

interface Step2FinancialDataProps {
  formData: FormData;
  financialData: FinancialData;
  onFinancialUpdate: (section: keyof FinancialData, itemId: number, field: "category" | "frequency", value: string) => void;
  onSubmit: () => void;
}

const Step2FinancialData: React.FC<Step2FinancialDataProps> = ({
  formData,
  financialData,
  onFinancialUpdate,
  onSubmit,
}) => {
  const categoryOptions = ["필수", "선택적"];
  const frequencyOptions = ["정기적", "일회성"];

  const isFormValid = () => {
    const allItems = [
      ...financialData.income,
      ...financialData.spending,
      ...financialData.investment
    ];

    return allItems.every(item => {
      if (!item.editable) return true;
      return item.category !== "" && item.frequency !== "";
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    try {
      const response = await fetch('/analyze/step2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          financial_data: financialData
        }),
      });

      if (response.ok) {
        window.location.href = '/analyze/step/3';
      } else {
        console.error('Failed to submit step 2');
      }
    } catch (error) {
      console.error('Error submitting step 2:', error);
    }
  };

  const renderIcon = (iconType?: string) => {
    switch (iconType) {
      case "chart":
        return <TrendingUp className="w-5 h-5 text-purple-600" />;
      case "home":
        return <Home className="w-5 h-5 text-purple-600" />;
      default:
        return <TrendingUp className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            나의 금융 프로필
          </h1>
          <p className="text-gray-600">
            정확한 분석을 위해 금융 정보를 검토하고 분류하세요
          </p>
        </div>

        {/* Profile Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">프로필 요약</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">이름</p>
                <p className="text-sm font-medium text-gray-900">{formData.fullName || "○○○"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">나이</p>
                <p className="text-sm font-medium text-gray-900">{formData.age || "20"}세</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">성별</p>
                <p className="text-sm font-medium text-gray-900">{formData.gender === 'male' ? '남성' : formData.gender === 'female' ? '여성' : formData.gender === 'other' ? '기타' : '남성'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">회사</p>
                <p className="text-sm font-medium text-gray-900">{formData.companyName || "애널라이즈"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Income Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">수입</h3>
            </div>
            <div className="space-y-4">
              {financialData.income.map((item, index) => (
                <div key={item.id} className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {index + 1}. {item.name}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-green-700 mb-3">{item.amount}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">카테고리</p>
                      <div className="relative">
                        <select
                          value={item.category}
                          onChange={(e) => onFinancialUpdate("income", item.id, "category", e.target.value)}
                          disabled={!item.editable}
                          className={`appearance-none w-full border rounded px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            item.editable
                              ? "bg-white border-gray-300"
                              : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                          style={{
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            backgroundImage: 'none',
                            backgroundColor: item.editable ? '#ffffff' : '#f9fafb'
                          }}
                        >
                          <option value="" disabled>카테고리를 선택하세요</option>
                          {categoryOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">빈도</p>
                      <div className="relative">
                        <select
                          value={item.frequency}
                          onChange={(e) => onFinancialUpdate("income", item.id, "frequency", e.target.value)}
                          disabled={!item.editable}
                          className={`appearance-none w-full border rounded px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            item.editable
                              ? "bg-white border-gray-300"
                              : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                          style={{
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            backgroundImage: 'none',
                            backgroundColor: item.editable ? '#ffffff' : '#f9fafb'
                          }}
                        >
                          <option value="" disabled>빈도를 선택하세요</option>
                          {frequencyOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  {!item.editable && <p className="text-xs text-gray-400 mt-2 italic">* Auto-filled based on category (editable)</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Spending Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">지출</h3>
            </div>
            <div className="space-y-4">
              {financialData.spending.map((item, index) => (
                <div key={item.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {index + 1}. {item.name}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-blue-700 mb-3">{item.amount}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">카테고리</p>
                      <div className="relative">
                        <select
                          value={item.category}
                          onChange={(e) => onFinancialUpdate("spending", item.id, "category", e.target.value)}
                          disabled={!item.editable}
                          className={`appearance-none w-full border rounded px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            item.editable
                              ? "bg-white border-gray-300"
                              : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                          style={{
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            backgroundImage: 'none',
                            backgroundColor: item.editable ? '#ffffff' : '#f9fafb'
                          }}
                        >
                          <option value="" disabled>카테고리를 선택하세요</option>
                          {categoryOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">빈도</p>
                      <div className="relative">
                        <select
                          value={item.frequency}
                          onChange={(e) => onFinancialUpdate("spending", item.id, "frequency", e.target.value)}
                          disabled={!item.editable}
                          className={`appearance-none w-full border rounded px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            item.editable
                              ? "bg-white border-gray-300"
                              : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                          style={{
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            backgroundImage: 'none',
                            backgroundColor: item.editable ? '#ffffff' : '#f9fafb'
                          }}
                        >
                          <option value="" disabled>빈도를 선택하세요</option>
                          {frequencyOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  {!item.editable && <p className="text-xs text-gray-400 mt-2 italic">* Auto-filled based on category (editable)</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Investment Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">투자</h3>
            </div>
            <div className="space-y-4">
              {financialData.investment.map((item, index) => (
                <div key={item.id} className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        {renderIcon(item.icon)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {index + 1}. {item.name}
                      </span>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-purple-700 mb-3">{item.amount}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">카테고리</p>
                      <div className="relative">
                        <select
                          value={item.category}
                          onChange={(e) => onFinancialUpdate("investment", item.id, "category", e.target.value)}
                          disabled={!item.editable}
                          className={`appearance-none w-full border rounded px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            item.editable
                              ? "bg-white border-gray-300"
                              : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                          style={{
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            backgroundImage: 'none',
                            backgroundColor: item.editable ? '#ffffff' : '#f9fafb'
                          }}
                        >
                          <option value="" disabled>카테고리를 선택하세요</option>
                          {categoryOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">빈도</p>
                      <div className="relative">
                        <select
                          value={item.frequency}
                          onChange={(e) => onFinancialUpdate("investment", item.id, "frequency", e.target.value)}
                          disabled={!item.editable}
                          className={`appearance-none w-full border rounded px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            item.editable
                              ? "bg-white border-gray-300"
                              : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                          style={{
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            backgroundImage: 'none',
                            backgroundColor: item.editable ? '#ffffff' : '#f9fafb'
                          }}
                        >
                          <option value="" disabled>빈도를 선택하세요</option>
                          {frequencyOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  {!item.editable && <p className="text-xs text-gray-400 mt-2 italic">* Auto-filled based on category (editable)</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Button */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white text-center">
          <div className="mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">분석을 시작할 준비가 되셨나요?</h3>
            <p className="text-blue-100 text-sm">
              귀하의 분류를 바탕으로 개인화된 금융 인사이트와 추천사항을 제공할 거예요.
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              isFormValid()
                ? "bg-white text-blue-600 hover:bg-gray-50"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            분석 제출 →
          </button>
          <p className="text-xs text-blue-100 mt-3">계속하려면 모든 카테고리 선택을 완료해 주세요</p>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              ✓
            </div>
            <div className="w-12 h-0.5 bg-blue-500"></div>
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
          </div>
          <p className="text-sm text-gray-600">2단계 / 총 3단계: 금융 분류</p>
        </div>
      </div>
    </div>
  );
};

export default Step2FinancialData;