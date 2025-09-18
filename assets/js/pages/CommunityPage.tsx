import React from "react";
import { Link } from "@inertiajs/react";
import {
  Users,
  TrendingUp,
  MessageCircle,
  Star,
  Award,
  BookOpen,
  Target,
  Bot,
  Heart,
  CheckCircle,
  User,
} from "lucide-react";

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">Young Professionals</span> Improving
            Together
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join a supportive community of ambitious young professionals who are
            transforming their financial futures with FinFit.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">25,000+</div>
            <div className="text-gray-600 text-sm">Active Users</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">₩125B+</div>
            <div className="text-gray-600 text-sm">Money Saved</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">89%</div>
            <div className="text-gray-600 text-sm">Daily Check-ins</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">4.8/5</div>
            <div className="text-gray-600 text-sm">Average Rating</div>
          </div>
        </div>

        {/* User Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">KM</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">김민수</div>
                  <div className="text-gray-600 text-sm">
                    Marketing Specialist, 26
                  </div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "FinFit helped me save ₩6M in just 8 months! The gamification
                makes budgeting actually fun. I love competing with friends on
                savings challenges."
              </p>
              <div className="text-blue-600 text-sm font-medium">₩6M saved</div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-semibold">PJ</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">박지은</div>
                  <div className="text-gray-600 text-sm">
                    Software Developer, 28
                  </div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The Finance Big 3 concept is genius. I finally understand where
                my money goes and how to optimize it. My investment score went
                from 45 to 82!"
              </p>
              <div className="text-green-600 text-sm font-medium">
                +37 points
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-semibold">LS</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">이수진</div>
                  <div className="text-gray-600 text-sm">Designer, 24</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "As a freelancer, tracking irregular income was always hard.
                FinFit's smart analytics help me plan for lean months and
                celebrate good ones!"
              </p>
              <div className="text-purple-600 text-sm font-medium">
                Better planning
              </div>
            </div>
          </div>
        </div>

        {/* Community Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Connect & Grow Together
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Peer Learning Groups */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Peer Learning Groups
              </h3>
              <p className="text-gray-600 mb-6">
                Join study groups focused on specific financial goals like home
                buying, investing, or debt elimination.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Goal-based matching
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Weekly discussions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Shared resources
                </li>
              </ul>
            </div>

            {/* Progress Sharing */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Progress Sharing
              </h3>
              <p className="text-gray-600 mb-6">
                Celebrate milestones and motivate each other with anonymous
                progress updates and success stories.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Anonymous sharing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Milestone celebrations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Motivation badges
                </li>
              </ul>
            </div>

            {/* Expert Q&A */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Expert Q&A
              </h3>
              <p className="text-gray-600 mb-6">
                Get answers from certified financial advisors and experienced
                community members in our weekly sessions.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Weekly sessions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Certified advisors
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Community wisdom
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Gamification Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Level Up Together
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Transform financial management into an exciting adventure.
                Complete quests, defeat spending monsters, and unlock rewards as
                you build better money habits.
              </p>

              {/* Progress Card */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    👑 Your Quest Progress
                  </h3>
                  <span className="text-sm font-medium text-orange-600">
                    2,340 XP
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Level 12 Financial Warrior
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    660 XP until Level 13
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-orange-500 mr-3" />
                  <span className="text-gray-700">Epic monthly challenges</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-6 h-6 text-blue-500 mr-3" />
                  <span className="text-gray-700">
                    Boss battles against spending monsters
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-purple-500 mr-3" />
                  <span className="text-gray-700">
                    Achievement system with exclusive rewards
                  </span>
                </div>
              </div>
            </div>

            {/* Rewards & Achievements */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-1">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    🏆 Earned Rewards
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        ₩15,000
                      </div>
                      <div className="text-sm text-gray-600">
                        Cashback Earned
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">12</div>
                      <div className="text-sm text-gray-600">Achievements</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Quests */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  ⚡ Active Quests
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      완벽한 예산 정리 도전
                    </span>
                    <span className="text-sm text-green-600">75%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      ⚔️ Complete Daily Checklist 7 Days
                    </span>
                    <span className="text-sm text-blue-600">5/7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      ⭐ Defeat the Impulse Buy Monster
                    </span>
                    <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded text-xs">
                      New!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Financial Coach */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Your AI Financial Coach
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get 24/7 personalized guidance and instant answers to your
              financial questions.
            </p>
          </div>

          {/* Chat Interface Mockup */}
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-blue-50 rounded-lg p-3 flex-1">
                  <p className="text-gray-800">
                    Hi! I noticed you've been spending more on dining out
                    lately. Would you like some tips to optimize this category?
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 justify-end">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-gray-800">
                    Yes, please! I want to save more for my investment goals.
                  </p>
                </div>
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-blue-50 rounded-lg p-3 flex-1">
                  <p className="text-gray-800">
                    Great! I've created a personalized dining budget that can
                    save you ₩200k monthly while still enjoying your favorite
                    restaurants...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your financial fitness journey with thousands of young
            professionals who are already achieving their money goals.
          </p>
          <Link
            href="/analyze"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
          >
            Join FinFit Community
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
