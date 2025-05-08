interface Service {
  value: string;
  label: string;
}

export const servicesOption: Service[] = [
  { value: "assessments", label: "Assessments, Coaching, Counseling" },
  { value: "coLiving", label: "Co-living Accommodations & Services" },
  { value: "culturalExchange", label: "Cultural Exchange & Social Networking" },
  { value: "education", label: "Education & Childcare" },
  { value: "emergency", label: "Emergency Services" },
  { value: "financial", label: "Financial & Tax Services" },
  { value: "insurance", label: "Insurance - Health, Travel, Property, Other" },
  { value: "languageIntegration", label: "Language & Cultural Integration" },
  { value: "legal", label: "Legal Services" },
  { value: "professional", label: "Professional Services" },
  { value: "relocation", label: "Relocation Services" },
  { value: "screening", label: "Screening Services" },
  { value: "technology", label: "Technology & Communication" },
  { value: "travel", label: "Travel & Transportation" },
  { value: "visa", label: "Visa and Immigration Services" },
  { value: "other", label: "Other" },
];

export const getServiceLabel = (serviceValue: string): string => {
  const service = servicesOption.find(
    (option) => option.value === serviceValue
  );
  return service ? service.label : "N/A";
};


