export type Listing = {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  country: string | null,
  language: string | null,
  color: string | null,
};

export function isMissing<K extends keyof Listing>(
  listing: Listing,
  key: K
): listing is Listing & { [P in K]: null } {
  return listing[key] == null;
}

