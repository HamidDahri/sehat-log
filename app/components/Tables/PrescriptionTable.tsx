"use client";

import React, { useMemo, useEffect, useRef } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import {
  ArrowIcon,
  CheckboxCheckedIcon,
  CheckBoxIcon,
  DownloadIcon,
  EyeOpenedIcon,
  ShareIcon,
} from "@/public/icons";

export type Prescription = {
  id: number;
  prescriptions: string;
  doctor: string;
  specialty: string;
  problem: string;
  disease: string;
  status: "Expired" | "Ongoing";
  clinic: string;
  visitDate: string;
  expireDate: string;
};

const statusStyles: Record<Prescription["status"], string> = {
  Expired: "bg-gray-100 text-gray-600",
  Ongoing: "bg-success-100 text-success-600",
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

/** Small helper for proper indeterminate checkbox behavior */
function IndeterminateCheckbox({
  checked,
  indeterminate,
  onChange,
  disabled,
  ariaLabel,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.indeterminate = Boolean(indeterminate) && !checked;
  }, [indeterminate, checked]);

  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      {/* Hidden native checkbox for accessibility + indeterminate */}
      <input
        ref={ref}
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.checked)}
      />
      {/* Your custom checkbox icon */}
      {checked ? <CheckboxCheckedIcon /> : <CheckBoxIcon />}
    </label>
  );
}

type PrescriptionsTableProps = {
  data: Prescription[];
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
  onView: (row: Prescription) => void;
  onDownload: (row: Prescription) => void;
  onShare: (row: Prescription) => void;

  /** ✅ NEW: controlled row selection from parent */
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;

  /** Optional: parent ko selected rows de do */
  onSelectionRowsChange?: (rows: Prescription[]) => void;
};

export default function PrescriptionsTable({
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

  rowSelection,
  onRowSelectionChange,
  onSelectionRowsChange,
}: PrescriptionsTableProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = pageIndex + 1;

  const from = total === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min(from + pageSize - 1, total);

  const columns = useMemo<ColumnDef<Prescription>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            ariaLabel="Select all rows"
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomePageRowsSelected()}
            disabled={loading || data.length === 0}
            onChange={(next) => table.toggleAllPageRowsSelected(next)}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            ariaLabel="Select row"
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected()}
            disabled={loading || !row.getCanSelect()}
            onChange={(next) => row.toggleSelected(next)}
          />
        ),
        enableSorting: false,
        size: 52,
      },
      {
        accessorKey: "prescriptions",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting()}
            className="flex items-center gap-1"
          >
            Report Name <ArrowUpDown size={14} />
          </button>
        ),
      },
      {
        accessorKey: "doctor",
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting()} className="flex gap-1">
            Advised by <ArrowUpDown size={14} />
          </button>
        ),
      },
      { accessorKey: "specialty", header: "specialty" },
      { accessorKey: "problem", header: "problem" },
      { accessorKey: "disease", header: "disease" },
      { accessorKey: "clinic", header: "Report Result" },
      { accessorKey: "visitDate", header: "Date" },
      { accessorKey: "expireDate", header: "Time" },
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
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="h-8 w-8 flex items-center justify-center border border-slate-300 text-slate-700 cursor-pointer hover:bg-slate-50 rounded-sm"
              onClick={() => onView(row.original)}
              aria-label="View Prescription"
            >
              <EyeOpenedIcon width="20" height="20" />
            </button>
            <button
              className="h-8 w-8 flex items-center justify-center border border-slate-300 text-slate-700 cursor-pointer hover:bg-slate-50 rounded-sm"
              onClick={() => onDownload(row.original)}
              aria-label="Download Prescription"
            >
              <DownloadIcon />
            </button>
            <button
              className="h-8 w-8 flex items-center justify-center border border-slate-300 text-slate-700 cursor-pointer hover:bg-slate-50 rounded-sm"
              onClick={() => onShare(row.original)}
              aria-label="Share Prescription"
            >
              <ShareIcon />
            </button>
          </div>
        ),
        size: 140,
      },
    ],
    [onView, onDownload, onShare, loading, data.length],
  );

  const table = useReactTable({
    data,
    columns,

    // ✅ IMPORTANT: stable row IDs (use your real Prescription id)
    getRowId: (row) => String(row.id),

    state: { sorting, rowSelection },
    onSortingChange,
    onRowSelectionChange,

    // ✅ selection
    enableRowSelection: true,

    // pagination is manual (parent controls data fetch)
    manualPagination: true,
    pageCount: Math.ceil(total / pageSize),

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Optional: parent ko selected rows send kar do
  useEffect(() => {
    if (!onSelectionRowsChange) return;
    const selected = table.getSelectedRowModel().rows.map((r) => r.original);
    onSelectionRowsChange(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);

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
                No Prescriptions found.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-b-slate-200 transition-opacity duration-200 ${
                  loading ? "opacity-50" : "opacity-100"
                } ${row.original.status === "Ongoing" ? "bg-success-50" : ""}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={`px-4 py-3 text-slate-600`}>
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
