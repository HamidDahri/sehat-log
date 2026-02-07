"use client";

import { DownloadIcon, EyeOpenedIcon } from "@/public/icons";
import React from "react";
import { Vaccination } from "../Tables/VaccinationTable";

type Status = "Upcoming" | "Completed" | "Missed";

type CardProps = {
  data: Vaccination;
  onView?: () => void;
  onDownload?: () => void;
};

function getStatusStyles(status: Status) {
  switch (status) {
    case "Upcoming":
      return "bg-warning-100 text-warning-600";
    case "Completed":
      return "bg-success-100 text-success-600";
    case "Missed":
      return "bg-error-100 text-error-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function VaccinationsCard({
  data,
  onView,
  onDownload,
}: CardProps) {
  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white ">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <h3 className="text-base font-bold text-slate-900">
          {data.vaccineName}
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
          <p className="text-sm text-slate-700">Date:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.date}
          </p>

          <p className="text-sm text-slate-700">Dose:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.dose}
          </p>

          <p className="text-sm text-slate-700">Next Dose:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.nextDose}
          </p>

          <p className="text-sm text-slate-700">Notes:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.notes}
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
