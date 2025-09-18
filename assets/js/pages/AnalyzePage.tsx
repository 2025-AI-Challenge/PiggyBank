import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import Step1PersonalInfo from "../components/Step1PersonalInfo";
import Step2FinancialData from "../components/Step2FinancialData";
import Step3Results from "../components/Step3Results";

interface FinancialItem {
  id: number;
  name: string;
  amount: string;
  category: string;
  frequency: string;
  editable: boolean;
  icon?: string;
}

interface AnalyzePageProps {
  step?: string;
  personal_info?: any;
  financial_data?: any;
  analysis_result?: any;
}

const AnalyzePage = ({ step, personal_info, financial_data, analysis_result }: AnalyzePageProps) => {
  const initialStep = step ? parseInt(step, 10) : 1;
  const [currentStep, setCurrentStep] = useState(initialStep);

  // 데이터 유효성 검사 및 리다이렉트
  useEffect(() => {
    if (currentStep === 2) {
      // Step 2에서는 personal_info와 financial_data가 필요
      if (!personal_info || !financial_data || Object.keys(financial_data).length === 0) {
        router.visit('/');
        return;
      }
    } else if (currentStep === 3) {
      // Step 3에서는 analysis_result가 필요
      if (!analysis_result || Object.keys(analysis_result).length === 0) {
        router.visit('/');
        return;
      }
    }
  }, [currentStep, personal_info, financial_data, analysis_result]);
  const [formData, setFormData] = useState({
    fullName: personal_info?.fullName || "",
    gender: personal_info?.gender || "",
    age: personal_info?.age || "",
    companyName: personal_info?.companyName || "",
  });

  const [financialData, setFinancialData] = useState(() => {
    // 서버에서 받은 financial_data가 있으면 사용
    if (financial_data && Object.keys(financial_data).length > 0) {
      return {
        income: financial_data.income || [],
        spending: financial_data.spending || [],
        investment: financial_data.investment || []
      };
    }

    // 기본값 없음 - 빈 상태
    return {
      income: [] as FinancialItem[],
      spending: [] as FinancialItem[],
      investment: [] as FinancialItem[]
    };
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (gender: string) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleFinancialUpdate = (
    section: keyof typeof financialData,
    itemId: number,
    field: "category" | "frequency",
    value: string,
  ) => {
    setFinancialData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const handleAnalysisSubmit = () => {
    console.log("Analysis submitted:", { formData, financialData });
    setCurrentStep(3);
  };

  if (currentStep === 1) {
    return (
      <Step1PersonalInfo
        formData={formData}
        onInputChange={handleInputChange}
        onGenderChange={handleGenderChange}
        onSubmit={handleSubmit}
      />
    );
  }

  if (currentStep === 2) {
    return (
      <Step2FinancialData
        formData={formData}
        financialData={financialData}
        onFinancialUpdate={handleFinancialUpdate}
        onSubmit={handleAnalysisSubmit}
      />
    );
  }

  if (currentStep === 3) {
    return <Step3Results formData={formData} analysisResult={analysis_result} />;
  }

  return null;
};

export default AnalyzePage;
