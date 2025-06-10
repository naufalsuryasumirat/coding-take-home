import data from "../mock-data/MOCK_DATA.json";
import type { Listing } from "@/lib/types";
import { isMissing } from "@/lib/types";

// NOTE: (1) Return an array of istings of a particular color or language
export const fetchListingsByKey = (
  key: "color" | "language",
  value: string,
) : Listing[] => {
  return data.filter(
    (listing: Listing) => listing[key]?.toLowerCase() === value.toLowerCase()
  );
};

// TODO: generic for fetching unique values of nullable properties
// NOTE: (2) Return an array of listings of all countries represented in data
export const fetchCountries = (): string[] => {
  return Array.from(new Set(data.map((listing) => listing.country!)))
    .filter((val): val is string => val != null);
};

export const fetchColors = (): string[] => {
  return Array.from(new Set(data.map((listing) => listing.color!)))
    .filter((val): val is string => val != null);
};

export const fetchLanguages = (): string[] => {
  return Array.from(new Set(data.map((listing) => listing.language!)))
    .filter((val): val is string => val != null);
};

// NOTE: (3) Return an array of all listings which have a null value of a particular key (color | language)
// Assumed: Country as well
export const fetchListingsByMissingKey = (
  key: "color" | "language" | "country"
): Listing[] => {
  return data.filter((listing: Listing) => isMissing(listing, key))
};

