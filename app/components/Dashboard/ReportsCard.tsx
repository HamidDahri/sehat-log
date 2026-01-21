"use client";

import { DownloadIcon, EyeOpenedIcon } from "@/public/icons";
import React from "react";
import { Report } from "../Tables/ReportTable";

type Status = "Reviewed" | "Available" | "Pending";

type CardProps = {
  data: Report;
  onView?: () => void;
  onDownload?: () => void;
};

function getStatusStyles(status: Status) {
  switch (status) {
    case "Reviewed":
      return "bg-warning-100 text-warning-600";
    case "Available":
      return "bg-success-100 text-success-600";
    case "Pending":
      return "bg-error-100 text-error-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function ReportsCard({ data, onView, onDownload }: CardProps) {
  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white ">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <h3 className="text-base font-bold text-slate-900">
          {data.reportName}
        </h3>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onView}
            className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
            aria-label="View appointment"
          >
            <EyeOpenedIcon height="18" width="18" />
          </button>
          <button
            type="button"
            onClick={onDownload}
            className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
            aria-label="View appointment"
          >
            <DownloadIcon />
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-slate-200" />

      {/* Body */}
      <div className="p-3">
        <div className="grid grid-cols-2 gap-y-2">
          <p className="text-sm text-slate-700">Lab:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.lab}
          </p>

          <p className="text-sm text-slate-700">Test::</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.reportResult}
          </p>

          <p className="text-sm text-slate-700">Date:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.date}
          </p>

          <p className="text-sm text-slate-700">Time:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.time}
          </p>

          <p className="text-sm text-slate-700">Status:</p>
          <div className="flex justify-end">
            <span
              className={[
                "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium",
                getStatusStyles(data.status),
              ].join(" ")}
            >
              {data.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
