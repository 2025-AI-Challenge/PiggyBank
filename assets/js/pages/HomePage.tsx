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
                What's Your <span className="text-blue-600">Finance</span>
                <br />
                <span className="text-blue-600">Big 3</span>?
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Track your spending, income, and investment like fitness
                metrics. Get your financial health score and level up your money
                habits!
              </p>
              <Link
                href="/analyze"
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Check My Finance Health
              </Link>
            </div>

            {/* Finance Metrics */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Spending</h3>
                <p className="text-gray-600 text-sm">Analysis</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Income</h3>
                <p className="text-gray-600 text-sm">Tracking</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Investment</h3>
                <p className="text-gray-600 text-sm">Goals</p>
              </div>
            </div>
          </div>

          {/* Right Column - Finance Health Report Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
                Your Finance Health Report
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Spending Health
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
                      Income Growth
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
                      Investment Score
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
                  Overall Finance Health Score
                </div>
                <div className="text-xs text-green-600 mt-1">
                  +18 points this month
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
              Everything You Need for{" "}
              <span className="text-blue-600">Financial Fitness</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Just like a fitness app tracks your body health, FinFit tracks
              your financial health with comprehensive tools and insights.
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
                Finance Health Report
              </h3>
              <p className="text-gray-600">
                Get your fitbit-style financial score with detailed analysis of
                your spending, income, and investment patterns.
              </p>
            </div>

            {/* Daily Checklist & Rewards */}
            <div className="bg-green-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Daily Checklist & Rewards
              </h3>
              <p className="text-gray-600">
                Complete daily financial tasks and earn points. Build healthy
                money habits one day at a time.
              </p>
            </div>

            {/* Goal Tracking with ETA */}
            <div className="bg-purple-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Goal Tracking with ETA
              </h3>
              <p className="text-gray-600">
                Set and track financial goals with smart predictions. Know
                exactly when you'll reach 1M, 10M savings and more.
              </p>
            </div>

            {/* AI Challenges */}
            <div className="bg-orange-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI Challenges
              </h3>
              <p className="text-gray-600">
                Fight financial monsters, complete quests, and level up your
                money skills with fun, engaging challenges.
              </p>
            </div>

            {/* Event Hub */}
            <div className="bg-pink-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Event Hub
              </h3>
              <p className="text-gray-600">
                Access exclusive youth discounts, government benefits, cultural
                events, and financial opportunities.
              </p>
            </div>

            {/* Calendar Integration */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Calendar Integration
              </h3>
              <p className="text-gray-600">
                Sync with Google Calendar, set financial reminders, and never
                miss important money milestones.
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
                Your Financial Fitness Tracker
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Monitor your financial health in real-time with our
                comprehensive dashboard. Track spending patterns, income growth,
                and investment performance all in one place.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Real-time Analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Growth Predictions</span>
                </div>
              </div>
            </div>

            {/* Right Column - Progress Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  This Month's Progress
                </h3>
                <span className="text-sm font-semibold text-green-600">
                  +15%
                </span>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Savings Goal
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
                  Expected completion: March 2024
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
