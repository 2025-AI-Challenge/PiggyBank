import React from "react";
import { User, Calendar, Users, Building, DollarSign, CreditCard, TrendingUp, Home, ArrowLeft } from "lucide-react";
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
}

const Step3Results: React.FC<Step3ResultsProps> = ({ formData }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Financial Health Analysis
          </h1>
          <p className="text-gray-600">
            Based on your information, here is your current status
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

        {/* Financial Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Income */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center h-64 flex flex-col justify-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="text-sm font-medium text-gray-600">Income</h3>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <CircularProgress percentage={90} color="#10b981" />
            </div>
            <div className="mt-4">
              <p className="text-lg font-bold text-gray-900">90/100</p>
              <p className="text-xs text-gray-500">Growth potential identified</p>
            </div>
          </div>

          {/* Overall Financial Health */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-center text-white md:col-span-2 h-64 flex flex-col justify-center">
            <h3 className="text-sm font-medium mb-4">Overall Financial Health</h3>
            <div className="flex-1 flex items-center justify-center">
              <CircularProgress percentage={82} color="#ffffff" size={140} />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">82/100</p>
              <p className="text-sm opacity-90">Excellent Health</p>
            </div>
          </div>

          {/* Investment */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center h-64 flex flex-col justify-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="text-sm font-medium text-gray-600">Investment</h3>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <CircularProgress percentage={78} color="#8b5cf6" />
            </div>
            <div className="mt-4">
              <p className="text-lg font-bold text-gray-900">78/100</p>
              <p className="text-xs text-gray-500">Building your portfolio</p>
            </div>
          </div>

          {/* Spending */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center md:col-start-1 h-64 flex flex-col justify-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-medium text-gray-600">Spending</h3>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <CircularProgress percentage={80} color="#3b82f6" />
            </div>
            <div className="mt-4">
              <p className="text-lg font-bold text-gray-900">80/100</p>
              <p className="text-xs text-gray-500">Room for optimization</p>
            </div>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personalized Recommendations</h3>
          <p className="text-sm text-gray-600 mb-6">Based on your analysis, here are key areas to focus on</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Reduce Fixed Costs</h4>
              <p className="text-sm text-gray-600 mb-3">You could save ₩200,000/month by optimizing fixed subscriptions and recurring payments.</p>
              <div className="text-xs">
                <span className="text-blue-600 font-medium">Potential savings: ₩200,000/month</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Optimize Card Benefits</h4>
              <p className="text-sm text-gray-600 mb-3">Optimizing credit card benefits and cashback programs may improve your score by 12 points.</p>
              <div className="text-xs">
                <span className="text-green-600 font-medium">Score improvement: +12 points</span>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Start Auto-Investing</h4>
              <p className="text-sm text-gray-600 mb-3">Setting up automated monthly investments can boost your long-term wealth by 35%.</p>
              <div className="text-xs">
                <span className="text-purple-600 font-medium">Long-term growth: +35%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center max-w-md">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Home className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need More Time?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Take your time to review these results. You can always come back to explore more.
            </p>
            <Link
              href="/"
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
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
          <p className="text-sm text-gray-600">Step 3 of 3: Analysis Complete</p>
        </div>
      </div>
    </div>
  );
};

export default Step3Results;