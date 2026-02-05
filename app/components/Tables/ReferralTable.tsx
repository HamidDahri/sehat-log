"use client";

import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { ArrowIcon } from "@/public/icons";

export type Referral = {
  id: number;
  referedDoctor: string;
  referedToDoctor: string;
  urgency: string;
  date: string;

  status: "Pending" | "Completed" | "InProgress";
};

const statusStyles: Record<Referral["status"], string> = {
  Pending: "bg-warning-100 text-warning-600",
  Completed: "bg-success-100 text-success-600",
  InProgress: "bg-blue-100 text-blue-600",
};

export function getPaginationRange(
  current: number,
  total: number,
  delta = 1,
): (number | "...")[] {
  const range: (number | "...")[] = [];
  const left = Math.max(1, current - delta);
  const right = Math.min(total, current + delta);

  if (left > 1) {
    range.push(1);
    if (left > 2) range.push("...");
  }

  for (let i = left; i <= right; i++) range.push(i);

  if (right < total) {
    if (right < total - 1) range.push("...");
    range.push(total);
  }

  return range;
}

type ReferralsTableProps = {
  data: Referral[];
  total: number;
  loading?: boolean;

  // controlled pagination
  pageIndex: number; // 0-based
  pageSize: number;
  onPageIndexChange: (next: number) => void;
  onPageSizeChange: (next: number) => void;

  // controlled sorting
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
};

export default function ReferralsTable({
  data,
  total,
  loading = false,

  pageIndex,
  pageSize,
  sorting,

  onPageIndexChange,
  onPageSizeChange,
  onSortingChange,
}: ReferralsTableProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = pageIndex + 1;

  const from = total === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min(from + pageSize - 1, total);

  const columns = useMemo<ColumnDef<Referral>[]>(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting()}
            className="flex items-center gap-1"
          >
            Referral ID <ArrowUpDown size={14} />
          </button>
        ),
      },

      { accessorKey: "referedDoctor", header: "Referred From" },
      { accessorKey: "referedToDoctor", header: "Referred To" },
      { accessorKey: "urgency", header: "Urgency" },
      { accessorKey: "date", header: "Date" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              statusStyles[row.original.status]
            }`}
          >
            {row.original.status}
          </span>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, data.length],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,

    // ✅ IMPORTANT: stable row IDs (use your real Referral id)
    getRowId: (row) => String(row.id),

    state: { sorting },
    onSortingChange,

    // ✅ selection
    enableRowSelection: true,

    // pagination is manual (parent controls data fetch)
    manualPagination: true,
    pageCount: Math.ceil(total / pageSize),

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="border rounded-xl overflow-hidden bg-white border-slate-200">
      <table className="w-full text-sm">
        <colgroup>
          {table.getAllLeafColumns().map((column) => (
            <col
              key={column.id}
              style={
                column.id === "actions"
                  ? { width: `${column.getSize()}px` }
                  : column.id === "select"
                    ? { width: "52px" }
                    : { width: "auto" }
              }
            />
          ))}
        </colgroup>

        <thead className="bg-slate-100 border-b border-b-slate-200">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-slate-600 font-medium text-sm text-left"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {data.length === 0 && !loading ? (
            <tr>
              <td
                colSpan={table.getAllLeafColumns().length}
                className="px-4 py-8 text-center text-gray-500"
              >
                No Referrals found.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-b-slate-200 transition-opacity duration-200 ${
                  loading ? "opacity-50" : "opacity-100"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-slate-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {data.length > 0 && !loading && (
        <div className="flex items-center justify-between px-5 py-3 text-sm">
          <div className="flex items-center gap-2.5 text-slate-500 text-xs justify-end">
            Show
            <select
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value));
                onPageIndexChange(0);
              }}
              className="border border-slate-200 text-slate-700 text-xs outline-0 focus:ring-1 focus:ring-slate-300 px-3 py-2 rounded"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            per page
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-700 text-sm">
              {from}-{to} of {total}
            </span>

            <div className="flex items-center gap-1">
              <button
                disabled={pageIndex === 0 || loading}
                onClick={() => onPageIndexChange(pageIndex - 1)}
                className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-40"
              >
                <ArrowIcon />
              </button>

              {getPaginationRange(currentPage, totalPages).map((page, idx) =>
                page === "..." ? (
                  <span key={idx} className="px-2 text-slate-700">
                    …
                  </span>
                ) : (
                  <button
                    key={idx}
                    onClick={() => onPageIndexChange(page - 1)}
                    className={`px-3 py-1 rounded text-slate-700 ${
                      page === currentPage
                        ? "bg-slate-100 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                disabled={currentPage >= totalPages || loading}
                onClick={() => onPageIndexChange(pageIndex + 1)}
                className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-40"
              >
                <span className="inline-block rotate-180">
                  <ArrowIcon />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
