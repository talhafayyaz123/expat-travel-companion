export const industryOptions = [
  { label: "Accounting & Finance", value: "acc" },
  { label: "Animal/Pet & Veterinarian Services", value: "apv" },
  { label: "Beauty, Cosmetics & Salon Services", value: "bcs" },
  { label: "Business Consulting & Coaching", value: "bcc" },
  { label: "Childcare", value: "chl" },
  { label: "Construction & Trades", value: "ctd" },
  { label: "Creative & Media", value: "cmd" },
  { label: "Counseling & Therapy", value: "cnt" },
  { label: "Education & Tutoring", value: "edu" },
  { label: "Environmental & Agricultural Services", value: "eas" },
  { label: "Fine Arts, Artisan & Craft Work", value: "fac" },
  { label: "Health & Wellness", value: "hw" },
  { label: "Hospitality & Food Services", value: "hfs" },
  { label: "Legal & Consulting Services", value: "lcs" },
  { label: "Media & Journalism", value: "mj" },
  { label: "Office Administration", value: "oa" },
  { label: "Photography & Video Services", value: "pvs" },
  { label: "Real Estate", value: "re" },
  { label: "Recruiting & Staffing", value: "rs" },
  { label: "Retail & E-Commerce", value: "rec" },
  { label: "Sales & Marketing", value: "sm" },
  { label: "Technology & IT", value: "ti" },
  { label: "Transportation & Logistics", value: "tl" },
  { label: "Travel, Hospitality & Tourism", value: "tht" },
];

export const getIndustryLabel = (industryValue: string) => {
  const industry = industryOptions.find(
    (option) => option.value === industryValue
  );

  return industry?.label ? industry.label : "N/A";
};
