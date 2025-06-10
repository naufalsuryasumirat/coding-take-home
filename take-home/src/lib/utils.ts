import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Listing } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// NOTE: better if all countries, futureproofing
export function countryToFlag(country: string | null): string {
  switch (!!country ? country.toLowerCase() : "") { 
  case "vietnam": return "🇻🇳";
  case "united states": return "🇺🇸";
  case "canada": return "🇨🇦";
  case "japan": return "🇯🇵";
  case "united kingdom": return "🇬🇧";
  case "india": return "🇮🇳";
  default: return "⛔️";
  }
}

// NOTE: # Part Two, A way to visualize each listing grouped by country
export const groupListingsByCountry = (listings: Listing[]): Map<string|null, Listing[]> => {
    const res = new Map<string|null, Listing[]>();
    // populate res keys with empty arrays
    Array.from(new Set(listings.map((listing) => listing.country)))
        .sort()
        .forEach((country) => { res.set(country, []); });
    listings.forEach((listing) => res.get(listing.country)!.push(listing));
    return res;
};
