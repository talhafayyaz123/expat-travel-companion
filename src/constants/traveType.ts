// export const travelOption = [
//   {
//     label: "Cruise",
//     value: "Cruise",
//   },
//   {
//     label: "Slow Travel (2 mo - 6 mo)",
//     value: "Slow_Travel_(2 mo - 6 mo)",
//   },
//   {
//     label: "Scouting Trip (1-8 wks)",
//     value: "Scouting_Trip_(1-8 wks)",
//   },
//   {
//     label: "Long Term (6 mo - 1 yr+)",
//     value: "Long_Term_(6 mo - 1 yr+)",
//   },
// ];

export const travelOption = [
  {
    label: "Cruise",
    value: "Cruise",
  },
  {
    label: "Scouting Trip (1-8 wks)",
    value: "ScoutingTrip",
  },
  {
    label: "Slow Travel 2 - 6 mo",
    value: "SlowTravel",
  },

  {
    label: "Long Term 6 mo - 1 yr",
    value: "LongTerm",
  },
];

export const getTravelTypeLabel = (value: string): string => {
  const travelType = travelOption.find((option) => option.value === value);

  return travelType ? travelType.label : "N/A";
};
