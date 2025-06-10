import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Listing } from "@/lib/types";
import { countryToFlag } from "@/lib/utils";
import Pagination from "@/components/pagination";

interface TableProps {
  listings: Listing[];
  isGrouped: boolean;
}

const rows: number = 10;

export default function Component({
  listings,
  isGrouped,
}: TableProps) {
  const [data, setData] = useState<Listing[]>([]);
  const [page, setPage] = useState<number>(1);
  const maxPages = useMemo(() => {
    return Math.floor(listings.length/rows) + +!!(listings.length%rows);
  }, [listings]);

  useEffect(() => {
    const data = listings;
    setData(data.slice((page-1)*rows, Math.min(page*rows, listings.length)));
  }, [page, listings]);

  return (
    <div
      className={isGrouped
        ? "relative overflow-hidden pb-16"
        : "relative overflow-hidden min-h-[475px] pb-16"
      }>
      {!isGrouped && (
        <h4 className="mb-1">
          Total: {listings.length} items
        </h4>
      )}
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-[var(--muted-foreground)]">
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableHead className="h-9 py-2">id</TableHead>
              <TableHead className="h-9 py-2">Name</TableHead>
              <TableHead className="h-9 py-2">Email</TableHead>
              <TableHead className="h-9 py-2">Country</TableHead>
              <TableHead className="h-9 py-2">Language</TableHead>
              <TableHead className="h-9 py-2">Color</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
            {data.map((listing) => (
              <TableRow
                key={listing.id}
                className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
              >
                <TableCell className="py-2">{listing.id}</TableCell>
                <TableCell className="py-2 font-medium">
                  {listing.last_name}, {listing.first_name}
                </TableCell>
                <TableCell className="py-2">{listing.email}</TableCell>
                <TableCell className={listing.country ? "py-2" : "py-2 text-center"}>
                  {listing.country ? (
                    <span className="truncate">
                      <span className="text-lg leading-none">{countryToFlag(listing.country!)}</span>{" "}
                      {listing.country}
                    </span>
                  ) : "—"}
                </TableCell>
                <TableCell className={listing.language ? "py-2" : "py-2 text-center"}>
                  {listing.language ? listing.language : "—" }
                </TableCell>
                <TableCell className={listing.color ? "py-2" : "py-2 text-center"}>
                  {listing.color ? (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-3 h-3 rounded-full border border-white-100"
                        style={{ backgroundColor: listing.color }}>
                      </span>
                      <span>{listing.color}</span>
                    </span>
                  ) : "—" }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <Pagination
          currentPage={page}
          totalPages={maxPages}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
}
