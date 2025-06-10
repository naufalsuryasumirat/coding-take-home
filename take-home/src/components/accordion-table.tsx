import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TableListing from "@/components/table-listing";
import type { Listing } from "@/lib/types";
import { countryToFlag } from "@/lib/utils";

interface AccordionProps {
  groupedListings: Map<string|null, Listing[]>;
};

const defaultValue = (v: string | null): string => {
  return v == null ? "Missing" : v;
}

export default function Component({
  groupedListings,
}: AccordionProps) {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full" defaultValue="3">
        {Array.from(groupedListings).map((group) => (
          <AccordionItem
            className="py-2"
            value={defaultValue(group[0])}
            key={defaultValue(group[0])}>
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline cursor-pointer">
              {defaultValue(group[0])} {countryToFlag(group[0])}, {group[1].length} fetched
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-2">
              <TableListing listings={group[1]} isGrouped={true}/>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

