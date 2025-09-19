import React, { useState } from "react";
import { Shield, Loader2 } from "lucide-react";

interface FormData {
  fullName: string;
  gender: string;
  age: string;
  companyName: string;
}

interface Step1PersonalInfoProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenderChange: (gender: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const Step1PersonalInfo: React.FC<Step1PersonalInfoProps> = ({
  formData,
  onInputChange,
  onGenderChange,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const getAgeError = () => {
    if (!formData.age.trim()) return '';
    const age = parseInt(formData.age);
    if (isNaN(age)) return '올바른 숫자를 입력해주세요.';
    if (age < 18) return '18세 이상이어야 합니다.';
    if (age > 100) return '100세 이하여야 합니다.';
    return '';
  };

  const isFormValid = () => {
    const age = parseInt(formData.age);
    return formData.fullName.trim() !== '' &&
           formData.gender !== '' &&
           formData.age.trim() !== '' &&
           age >= 18 &&
           age <= 100 &&
           formData.companyName.trim() !== '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/analyze/step1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          personal_info: formData
        }),
      });

      if (response.ok) {
        window.location.href = '/analyze/step/2';
      } else {
        console.error('Failed to submit step 1');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error submitting step 1:', error);
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            시작하기 <span className="text-blue-600">함께</span>
          </h1>
          <p className="text-gray-600">
            금융 건강 분석을 시작하기 위해
            <br />
            정보를 입력해 주세요
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">
              개인 프로필 정보
            </h2>
            <p className="text-sm text-gray-600 text-center">
              이 정보를 통해 개인화된 금융 피트니스 여정을 제공할 거예요
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                성명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={onInputChange}
                placeholder="성명을 입력하세요"
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none ${
                  isLoading
                    ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                성별 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <label className={`flex items-center p-3 border rounded-lg ${
                  isLoading
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    : 'border-gray-300 cursor-pointer hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={() => onGenderChange("male")}
                    disabled={isLoading}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700">남성</span>
                </label>
                <label className={`flex items-center p-3 border rounded-lg ${
                  isLoading
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    : 'border-gray-300 cursor-pointer hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={() => onGenderChange("female")}
                    disabled={isLoading}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700">여성</span>
                </label>
                <label className={`flex items-center p-3 border rounded-lg ${
                  isLoading
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    : 'border-gray-300 cursor-pointer hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === "other"}
                    onChange={() => onGenderChange("other")}
                    disabled={isLoading}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700">기타</span>
                </label>
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                나이 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={onInputChange}
                placeholder="나이를 입력하세요"
                min="18"
                max="100"
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none ${
                  isLoading
                    ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed'
                    : getAgeError()
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                required
              />
              {getAgeError() && (
                <p className="mt-1 text-sm text-red-600">{getAgeError()}</p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                회사명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={onInputChange}
                placeholder="회사명을 입력하세요"
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none ${
                  isLoading
                    ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                isLoading || !isFormValid()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  분석 중...
                </>
              ) : (
                "내 프로필 분석하기"
              )}
            </button>

            {/* Privacy Notice */}
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <span className="font-medium text-blue-900">개인정보 보호:</span>
                <span className="text-blue-700">
                  {" "}귀하의 정보는 암호화되어 안전하게 보관됩니다. 이 데이터는 개인화된 금융 인사이트 제공용도로만 사용되며, 제3자와 공유하지 않습니다.
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
          </div>
          <p className="text-sm text-gray-600">1단계 / 총 3단계: 개인 정보</p>
        </div>
      </div>
    </div>
  );
};

export default Step1PersonalInfo;