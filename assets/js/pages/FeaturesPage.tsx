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
  Heart
} from "lucide-react";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            All the <span className="text-blue-600">Features</span> You Need
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            FinFit combines the best of fitness tracking with financial management,
            making money management as engaging and rewarding as your daily workout.
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
              Finance Health Report
            </h3>
            <p className="text-gray-600 mb-6">
              Get your comprehensive financial health score with detailed analysis
              of spending patterns, income trends, and investment performance.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Real-time health scoring
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Personalized recommendations
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Monthly progress tracking
              </li>
            </ul>
          </div>

          {/* Daily Checklist & Rewards */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Daily Checklist & Rewards
            </h3>
            <p className="text-gray-600 mb-6">
              Build healthy financial habits with daily tasks and earn points
              that unlock real rewards and benefits.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Customized daily tasks
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Point-based reward system
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Habit streak tracking
              </li>
            </ul>
          </div>

          {/* Goal Tracking with ETA */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Smart Goal Tracking
            </h3>
            <p className="text-gray-600 mb-6">
              Set financial goals with intelligent ETA predictions. Know exactly
              when you'll reach your 1M, 10M savings milestones.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                AI-powered predictions
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Visual progress tracking
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Milestone celebrations
              </li>
            </ul>
          </div>

          {/* AI Challenges */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              AI Financial Challenges
            </h3>
            <p className="text-gray-600 mb-6">
              Gamify your financial journey with AI-generated challenges,
              monster battles, and leveling up your money skills.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Personalized challenges
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                RPG-style progression
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Achievement system
              </li>
            </ul>
          </div>

          {/* Event Hub */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Event Hub
            </h3>
            <p className="text-gray-600 mb-6">
              Access exclusive youth discounts, government benefits, cultural events,
              and financial opportunities all in one place.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Youth-focused discounts
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Government benefit alerts
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Cultural event calendar
              </li>
            </ul>
          </div>

          {/* Calendar Integration */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <Calendar className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Smart Calendar Integration
            </h3>
            <p className="text-gray-600 mb-6">
              Sync with Google Calendar, set financial reminders, and never miss
              important money milestones or bill due dates.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Google Calendar sync
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Smart reminders
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Bill due date tracking
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Why Choose FinFit?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile-First</h3>
              <p className="text-gray-600 text-sm">
                Designed for on-the-go financial management
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure</h3>
              <p className="text-gray-600 text-sm">
                Bank-level security for your financial data
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600 text-sm">
                Smart insights and personalized recommendations
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600 text-sm">
                Connect with like-minded young professionals
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Financial Habits?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of young professionals who are already leveling up their money game.
          </p>
          <Link
            href="/check-finance-health"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
          >
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;