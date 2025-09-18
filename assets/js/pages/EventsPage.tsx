import React from "react";
import { Link } from "@inertiajs/react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Gift,
  GraduationCap,
  Building2,
  Heart,
  CreditCard,
  Home,
  Briefcase,
  ChevronRight,
  ArrowRight,
  Star,
  CheckCircle,
} from "lucide-react";

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="text-green-600">Events & Benefits</span> for Young
            Professionals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exclusive opportunities, discounts, and events designed
            specifically for young professionals building their financial
            future.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Upcoming Events */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Calendar className="w-8 h-8 text-blue-600 mr-3" />
              Upcoming Events
            </h2>

            <div className="space-y-6">
              {/* Event 1 */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Young Professional Finance Workshop
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      Jan 25, 2024
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      7:00 PM
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      Gangnam Financial Center
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
                    Free Entry
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    Education
                  </span>
                  <Link
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                  >
                    Learn More <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Event 2 */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      K-Culture Festival
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      Feb 3-5, 2024
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      All Day
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      Seoul Arts Center
                    </div>
                  </div>
                  <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full">
                    30% Off
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    Culture
                  </span>
                  <Link
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                  >
                    Learn More <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Event 3 */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Startup Networking Night
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      Feb 12, 2024
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      6:30 PM
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      Hongdae Innovation Hub
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-600 text-sm font-semibold px-3 py-1 rounded-full">
                    Special Rate
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    Networking
                  </span>
                  <Link
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                  >
                    Learn More <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Your Financial Calendar */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Your Financial Calendar
            </h2>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  January 2024
                </h3>
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  ),
                )}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                  <div
                    key={date}
                    className={`text-center py-2 text-sm cursor-pointer hover:bg-gray-100 rounded ${
                      date === 15
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : date === 25
                          ? "bg-green-100 text-green-600 font-semibold"
                          : "text-gray-900"
                    }`}
                  >
                    {date}
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">Bill Due Date</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">Finance Workshop</span>
                </div>
                <div className="text-sm text-gray-600 pt-2">
                  <strong>Coming up:</strong>
                  <div className="ml-4 space-y-1">
                    <div>• Tax deadlines</div>
                    <div>• Bill due dates</div>
                    <div>• Investment dates</div>
                    <div>• Savings milestones</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Exclusive Benefits & Discounts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Youth Discounts */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Gift className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Youth Discounts
              </h3>
              <p className="text-gray-600 mb-6">
                Access exclusive discounts on dining, entertainment, shopping
                and cultural events
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  30-50% off restaurants
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Movie ticket deals
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Shopping vouchers
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Concert discounts
                </div>
              </div>
            </div>

            {/* Government Benefits */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Government Benefits
              </h3>
              <p className="text-gray-600 mb-6">
                Stay updated on government programs and financial support
                available for young professionals
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Housing subsidies
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Education grants
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Job training programs
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Healthcare benefits
                </div>
              </div>
            </div>

            {/* Financial Calendar */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Financial Calendar
              </h3>
              <p className="text-gray-600 mb-6">
                Never miss important financial deadlines with integrated
                calendar and smart reminders
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Tax deadlines
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Bill due dates
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Investment dates
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Savings milestones
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Opportunities */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Featured Opportunities This Month
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Dating & Social</h3>
              <p className="text-gray-600 text-sm mb-3">
                Special rates for social events and dating apps
              </p>
              <div className="text-green-600 font-semibold text-sm">
                Up to 40% off
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Financial Services
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Low-interest loans and premium banking
              </p>
              <div className="text-green-600 font-semibold text-sm">
                Special rates
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Housing</h3>
              <p className="text-gray-600 text-sm mb-3">
                First-time buyer programs and rental assistance
              </p>
              <div className="text-green-600 font-semibold text-sm">
                Government support
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Career Development
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Professional courses and certifications
              </p>
              <div className="text-green-600 font-semibold text-sm">
                Free access
              </div>
            </div>
          </div>
        </div>

        {/* Connection Section */}
        <div className="bg-green-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Connected with Opportunities
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get personalized event recommendations and exclusive access to youth
            benefits that help you save money while building your career.
          </p>
          <Link
            href="/analyze"
            className="inline-block px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
          >
            Explore Events & Benefits
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
