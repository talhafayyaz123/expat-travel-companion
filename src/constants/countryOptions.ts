import { currentCountries } from "./currentCountries";

export const countryOptions = [
  {
    id: 240,
    label: "Cruise-Africa",
    value: "Cruise-Africa",
  },
  {
    id: 241,
    label: "Cruise-Alaska",
    value: "Cruise-Alaska",
  },
  {
    id: 242,
    label: "Cruise-Antarctica",
    value: "Cruise-Antarctica",
  },
  {
    id: 243,
    label: "Cruise-Asia",
    value: "Cruise-Asia",
  },
  {
    id: 244,
    label: "Cruise-Australia",
    value: "Cruise-Australia",
  },
  {
    id: 245,
    label: "Cruise-Caribbean & Mexico",
    value: "Cruise-Caribbean_&_Mexico", // Value with underscores
  },
  {
    id: 246,
    label: "Cruise-Central America",
    value: "Cruise-Central_America", // Value with underscores
  },
  {
    id: 247,
    label: "Cruise-Europe",
    value: "Cruise-Europe",
  },
  {
    id: 248,
    label: "Cruise-Europe Baltic Sea",
    value: "Cruise-Europe_Baltic_Sea", // Value with underscores
  },
  {
    id: 249,
    label: "Cruise-Europe Mediterranean",
    value: "Cruise-Europe_Mediterranean", // Value with underscores
  },
  {
    id: 250,
    label: "Cruise-Europe Northern Europe",
    value: "Cruise-Europe_Northern_Europe", // Value with underscores
  },
  {
    id: 251,
    label: "Cruise-Hawaii",
    value: "Cruise-Hawaii",
  },
  {
    id: 252,
    label: "Cruise-North America",
    value: "Cruise-North_America", // Value with underscores
  },
  {
    id: 253,
    label: "Cruise-South America",
    value: "Cruise-South_America", // Value with underscores
  },
  {
    id: 254,
    label: "Cruise-World Cruises",
    value: "Cruise-World_Cruises", // Value with underscores
  },
  {
    id: 255,
    label: "Cruise-Other",
    value: "Cruise-Other",
  },
];

export const allcountry = [
  {
    id: 3000,
    label: "All Countries",
    value: "allCountries",
  },
];

export const combinedCountryData = [
  ...countryOptions,
  ...allcountry,
  ...currentCountries,
];
export const combinedCountryDataWithAllCountry = [
  ...allcountry,
  ...currentCountries,
];

export const getCountryLabel = (countryValue: string) => {
  const country = combinedCountryData.find(
    (option) => option.value == countryValue
  );
  return country?.label ? country.label : "N/A";
};
