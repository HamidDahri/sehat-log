"use client";

import { DownloadIcon, EyeOpenedIcon } from "@/public/icons";
import React from "react";
import { Hospital } from "../Tables/HospitalTable";

type Status = "Reviewed" | "Available" | "Pending";

type CardProps = {
  data: Hospital;
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

export default function HospitalsCard({ data, onView, onDownload }: CardProps) {
  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white ">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <h3 className="text-base font-bold text-slate-900">{data.hospital}</h3>

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
          <p className="text-sm text-slate-700">Admission Date:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.admissionDate}
          </p>

          <p className="text-sm text-slate-700">Discharge Date:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.dischargeDate}
          </p>

          <p className="text-sm text-slate-700">Reason for Visit:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.reason}
          </p>

          <p className="text-sm text-slate-700">Doctor Notes:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.notes}
          </p>
        </div>
      </div>
    </div>
  );
}
