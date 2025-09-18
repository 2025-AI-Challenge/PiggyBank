import React, { useState } from "react";
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

const AnalyzePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: "",
    companyName: "",
  });

  const [financialData, setFinancialData] = useState({
    income: [
      {
        id: 1,
        name: "Monthly Salary",
        amount: "2,500,000 KRW",
        category: "Essential",
        frequency: "Recurring",
        editable: false,
      },
    ] as FinancialItem[],
    spending: [
      {
        id: 1,
        name: "Telecom",
        amount: "100,000 KRW",
        category: "Essential",
        frequency: "Recurring",
        editable: false,
      },
      {
        id: 2,
        name: "Food",
        amount: "500,000 KRW",
        category: "Essential",
        frequency: "Recurring",
        editable: false,
      },
      {
        id: 3,
        name: "Transport",
        amount: "100,000 KRW",
        category: "Essential",
        frequency: "Recurring",
        editable: false,
      },
      {
        id: 4,
        name: "Transfer",
        amount: "200,000 KRW",
        category: "Essential",
        frequency: "Recurring",
        editable: true,
      },
    ] as FinancialItem[],
    investment: [
      {
        id: 1,
        name: "Fund",
        amount: "100,000 KRW",
        category: "Essential",
        frequency: "Recurring",
        editable: true,
        icon: "chart",
      },
      {
        id: 2,
        name: "Housing Subscription",
        amount: "20,000 KRW",
        category: "Non-essential",
        frequency: "One-time",
        editable: true,
        icon: "home",
      },
    ] as FinancialItem[],
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
    return <Step3Results formData={formData} />;
  }

  return null;
};

export default AnalyzePage;
