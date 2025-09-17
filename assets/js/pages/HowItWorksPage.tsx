import React from "react";
import { Link } from "@inertiajs/react";
import {
  Upload,
  BarChart3,
  Target,
  Award,
  ArrowRight,
  CheckCircle,
  TrendingUp
} from "lucide-react";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            How <span className="text-blue-600">FinFit</span> Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with your financial fitness journey is simple. Follow these four easy steps
            to transform your money habits.
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
                Step 1
              </span>
            </div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Input Financial Data
            </h3>
            <p className="text-gray-600 mb-6">
              Connect your accounts or manually input your spending,
              income, and investment information securely.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Bank account linking
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Manual data entry
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Secure encryption
              </li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-green-100 text-green-600 text-sm font-semibold px-3 py-1 rounded-full">
                Step 2
              </span>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Get Your Finance Health Score
            </h3>
            <p className="text-gray-600 mb-6">
              Receive your comprehensive financial health report with scores
              for spending, income, and investment performance.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Spending analysis
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Income tracking
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Investment insights
              </li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-purple-100 text-purple-600 text-sm font-semibold px-3 py-1 rounded-full">
                Step 3
              </span>
            </div>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Receive Personalized Plan
            </h3>
            <p className="text-gray-600 mb-6">
              Get customized goals, daily checklists, and actionable
              recommendations based on your financial health score.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Custom goal setting
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Daily tasks
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Smart recommendations
              </li>
            </ul>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full">
                Step 4
              </span>
            </div>
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Earn Rewards & Improve
            </h3>
            <p className="text-gray-600 mb-6">
              Complete challenges, level up your financial habits, and watch your
              Finance Health score improve over time.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Daily challenges
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Reward system
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Progress tracking
              </li>
            </ul>
          </div>
        </div>

        {/* Process Flow */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Your Financial Fitness Journey
          </h2>
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="flex-1 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Connect & Analyze</h3>
              <p className="text-gray-600 text-sm">Input your financial data securely</p>
            </div>

            <ArrowRight className="w-8 h-8 text-gray-400 rotate-90 lg:rotate-0" />

            <div className="flex-1 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Your Score</h3>
              <p className="text-gray-600 text-sm">Receive personalized health report</p>
            </div>

            <ArrowRight className="w-8 h-8 text-gray-400 rotate-90 lg:rotate-0" />

            <div className="flex-1 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Follow Your Plan</h3>
              <p className="text-gray-600 text-sm">Complete daily tasks & challenges</p>
            </div>

            <ArrowRight className="w-8 h-8 text-gray-400 rotate-90 lg:rotate-0" />

            <div className="flex-1 text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">See Results</h3>
              <p className="text-gray-600 text-sm">Watch your score improve over time</p>
            </div>
          </div>
        </div>

        {/* Success Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Join Our Success Stories</h2>
            <p className="text-xl opacity-90">
              See how FinFit has transformed financial habits for thousands of users
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">87%</div>
              <p className="opacity-90">Users improved their savings rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">₩2.3M</div>
              <p className="opacity-90">Average amount saved in 6 months</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">92%</div>
              <p className="opacity-90">Users stick to their financial goals</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Financial Fitness Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of young professionals who are already improving their financial
            health with FinFit.
          </p>
          <Link
            href="/check-finance-health"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            Get Your Finance Health Score
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;