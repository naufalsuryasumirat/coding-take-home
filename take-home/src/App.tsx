import { useState, useEffect } from "react";
import {
  fetchListingsByKey,
  fetchListingsByMissingKey,
  fetchCountries,
  fetchColors,
  fetchLanguages,
} from "./middleware/middleware";
import { groupListingsByCountry } from "@/lib/utils";
import Modifier from "@/components/modifier";
import TableListing from "@/components/table-listing";
import AccordionTable from "@/components/accordion-table";
import type { Listing } from "@/lib/types";

// @ts-ignore
const [ countries, languages, colors ] = [
  fetchCountries().sort(),
  fetchLanguages().sort(),
  fetchColors().sort(),
];

const cacheListings: Record<"color"|"language", Map<string|null, Listing[]>> = {
  color: new Map<string|null, Listing[]>(),
  language: new Map<string|null, Listing[]>(),
};

const fetchListings = (
  key: "color" | "language",
  value: string | null,
): Listing[] => {
  // check from cache, return early if found
  if (cacheListings[key].has(value)) {
    return cacheListings[key].get(value)!;
  }

  const res = (value == null)
    ? fetchListingsByMissingKey(key)
    : fetchListingsByKey(key, value);
  cacheListings[key].set(value, res);
  return res;
}

const missingCount: Record<typeof defaultKey, number> = {
  color: fetchListingsByMissingKey("color").length,
  language: fetchListingsByMissingKey("language").length,
}

const defaultKey: "color" | "language" = "color";
const defaultColor: string = "aquamarine";
const defaultLanguage: string = "indonesian";
// @ts-ignore
const defaultValue: string = (defaultKey == "color") ? defaultColor : defaultLanguage;

const keys: string[] = ["color", "language"]
const values: Record<"color" | "language", string[]> = {
  color: colors,
  language: languages,
}

// TODO: globe picker, one country shown at a time
// TODO: format, lint
function App() {
  const [ isGrouped, setGrouped ] = useState<boolean>(false);
  const [ isShowMissing, setIsShowMissing ] = useState<boolean>(false);
  const [ keyItem, setKeyItem ] = useState<typeof defaultKey>(defaultKey);
  // TODO: noting previous choice before switching keys
  const [ valueItem, setValueItem ] = useState<string|null>(defaultValue);
  const [ data, setData ] = useState<Listing[]>([]);

  useEffect(() => {
    if (isShowMissing) {
      setValueItem(null);
    } else {
      setValueItem((keyItem == "color") ? defaultColor : defaultLanguage);
    }
  }, [keyItem, isShowMissing])
  useEffect(() => {
    setData(fetchListings(keyItem, valueItem));
  }, [keyItem, valueItem]);

  return (
    <div className="min-h-screen flex flex-col items-center px-8 py-12 font-mono overflow-hidden">
      <div className="w-full max-w-6xl flex-1">
        <h1 className="text-2xl mb-8 font-bold text-center">ACTUAL Take Home Test</h1>
        <div className="mb-2">
          <Modifier
            isShowMissing={isShowMissing}
            missingCount={missingCount[keyItem]}
            keyItem={keyItem}
            setKeyItem={setKeyItem}
            keyItems={keys}
            valueItem={valueItem}
            setValueItem={setValueItem}
            valueItems={values[keyItem]}
            checkboxes={[
              {checked: isGrouped, checkedChange: setGrouped, text: "Group by country"},
              {checked: isShowMissing, checkedChange: setIsShowMissing, text: "Show missing data"},
            ]}
          />
        </div>
        {isGrouped ?
          <AccordionTable
            groupedListings={groupListingsByCountry(data)}
          /> :
          <TableListing
            listings={data}
            isGrouped={isGrouped}
          />
        }
      </div>
      <footer className="flex flex-col items-center justify-between">
        <p><a href="https://info.noler.dev"><u>Naufal Alexander Suryasumirat</u></a></p>
        <p><a href="https://github.com/naufalsuryasumirat"><u>github.com/naufalsuryasumirat</u></a></p>
      </footer>
    </div>
  )
}

export default App
