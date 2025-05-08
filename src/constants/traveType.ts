export const travelOption = [
  {
    label: "Cruise",
    value: "Cruise",
  },

  {
    label: "Slow Travel 2-6 mo",
    value: "Slow_Travel_2-6mon",
  },
  {
    label: "Scouting Trip 1-8 wks",
    value: "Scouting_Trip_1-8wks",
  },
  {
    label: "Long Term 6 mo - 1 yr",
    value: "Long_Term_6mon-1yr",
  },
];

export const getTravelTypeLabel = (value: string): string => {
  const travelType = travelOption.find((option) => option.value === value);

  return travelType ? travelType.label : "N/A";
};
