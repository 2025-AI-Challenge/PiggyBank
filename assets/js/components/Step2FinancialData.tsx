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
  const categoryOptions = ["Essential", "Non-essential"];
  const frequencyOptions = ["Recurring", "One-time"];

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
            Your Financial Profile
          </h1>
          <p className="text-gray-600">
            Review and categorize your financial information for accurate analysis
          </p>
        </div>

        {/* Profile Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="text-sm font-medium text-gray-900">{formData.fullName || "○○○"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Age</p>
                <p className="text-sm font-medium text-gray-900">{formData.age || "20"} years</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Gender</p>
                <p className="text-sm font-medium text-gray-900">{formData.gender || "Male"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Company</p>
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
              <h3 className="text-lg font-semibold text-gray-900">Income</h3>
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
                      <p className="text-xs text-gray-500 mb-1">Category</p>
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
                          {categoryOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Frequency</p>
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
                          {frequencyOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 italic">* Auto-filled based on category (editable)</p>
                </div>
              ))}
            </div>
          </div>

          {/* Spending Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Spending</h3>
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
                      <p className="text-xs text-gray-500 mb-1">Category</p>
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
                          {categoryOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Frequency</p>
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
                          {frequencyOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 italic">* Auto-filled based on category (editable)</p>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Investment</h3>
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
                      <p className="text-xs text-gray-500 mb-1">Category</p>
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
                          {categoryOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Frequency</p>
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
                          {frequencyOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 italic">* Auto-filled based on category (editable)</p>
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
            <h3 className="text-xl font-semibold mb-2">Ready for Your Analysis?</h3>
            <p className="text-blue-100 text-sm">
              We'll use your categorization to provide personalized financial insights and recommendations.
            </p>
          </div>
          <button
            onClick={onSubmit}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Submit Analysis →
          </button>
          <p className="text-xs text-blue-100 mt-3">Please complete all category selections to continue</p>
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
          <p className="text-sm text-gray-600">Step 2 of 3: Financial Categorization</p>
        </div>
      </div>
    </div>
  );
};

export default Step2FinancialData;