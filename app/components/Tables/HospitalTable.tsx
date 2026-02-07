"use client";

import React, { useMemo } from "react";
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

import {
  ArrowIcon,
  DownloadIcon,
  EyeOpenedIcon,
  ShareIcon,
} from "@/public/icons";

export type Hospital = {
  id: number;
  hospital: string;
  admissionDate: string;
  dischargeDate: string;
  reason: string;
  doctor: string;
  notes: string;
  hospitalType: string;
  roomWard: string;
  status: "Visited" | "Admitted" | "Discharged";
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

type HospitalsTableProps = {
  data: Hospital[];
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

  // actions
  onView: (row: Hospital) => void;
  onDownload: (row: Hospital) => void;
  onShare: (row: Hospital) => void;
};

export default function HospitalsTable({
  data,
  total,
  loading = false,

  pageIndex,
  pageSize,
  sorting,

  onPageIndexChange,
  onPageSizeChange,
  onSortingChange,

  onView,
  onDownload,
  onShare,
}: HospitalsTableProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = pageIndex + 1;

  const from = total === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min(from + pageSize - 1, total);

  const columns = useMemo<ColumnDef<Hospital>[]>(
    () => [
      {
        accessorKey: "hospital",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting()}
            className="flex items-center gap-1"
          >
            Hospital/Clinic <ArrowUpDown size={14} />
          </button>
        ),
      },
      { accessorKey: "admissionDate", header: "Admission Date" },
      { accessorKey: "dischargeDate", header: "Discharge Date" },
      { accessorKey: "reason", header: "Reason for Visit" },
      { accessorKey: "notes", header: "Doctor Notes" },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="h-8 w-8 flex items-center justify-center border border-slate-300 text-slate-700 cursor-pointer hover:bg-slate-50 rounded-sm"
              onClick={() => onView(row.original)}
              aria-label="View Hospital"
            >
              <EyeOpenedIcon width="20" height="20" />
            </button>
            <button
              className="h-8 w-8 flex items-center justify-center border border-slate-300 text-slate-700 cursor-pointer hover:bg-slate-50 rounded-sm"
              onClick={() => onDownload(row.original)}
              aria-label="Download Hospital"
            >
              <DownloadIcon />
            </button>
            <button
              className="h-8 w-8 flex items-center justify-center border border-slate-300 text-slate-700 cursor-pointer hover:bg-slate-50 rounded-sm"
              onClick={() => onShare(row.original)}
              aria-label="Share Hospital"
            >
              <ShareIcon />
            </button>
          </div>
        ),
        size: 140,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onView, onDownload, onShare, loading, data.length],
  );

  const table = useReactTable({
    data,
    columns,

    // ✅ IMPORTANT: stable row IDs (use your real hospital id)
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
                No Hospitals found.
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
