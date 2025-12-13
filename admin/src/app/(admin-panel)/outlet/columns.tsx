import { TCategory, TCoupon } from "@/types/shared";
import { ColumnDef } from "@tanstack/react-table";
import { DetailsSheet } from "./details";
export const columns: ColumnDef<TCategory>[] = [
  {
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Outlet Name",
    accessorKey: "title",
  },
  {
    header: "City",
    accessorKey: "city",
  },
  {
    header: "Area",
    accessorKey: "area",
  },
  {
    header: "Address",
    accessorKey: "address",
  },
  {
    header: "Mobile",
    cell: ({ row }) => <span>{row.original.mobile}</span>,
  },
  {
    header: "Map",
    cell: ({ row }) => (
      <div className="w-[200px] h-[100px] overflow-hidden rounded-md border">
        <div
          dangerouslySetInnerHTML={{ __html: row.original.mapLink }}
          className="w-full h-full"
        />
      </div>
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return <DetailsSheet item={row.original} />;
    },
  },


];
