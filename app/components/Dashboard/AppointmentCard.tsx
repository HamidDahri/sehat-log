"use client";

import { EyeOpenedIcon } from "@/public/icons";
import React from "react";
import { Appointment } from "../Tables/AppointmentTable";

type Status = "Upcoming" | "Completed" | "Canceled" | "Missed";

type AppointmentCardProps = {
  data: Appointment;
  onView?: () => void;
};

function getStatusStyles(status: Status) {
  switch (status) {
    case "Upcoming":
      return "bg-warning-100 text-warning-600";
    case "Completed":
      return "bg-success-100 text-success-600";
    case "Canceled":
      return "bg-error-100 text-error-600";
    case "Missed":
      return "bg-slate-100 text-slate-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function AppointmentCard({
  data,
  onView,
}: AppointmentCardProps) {
  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white ">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <h3 className="text-base font-bold text-slate-900">{data.doctor}</h3>

        <button
          type="button"
          onClick={onView}
          className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
          aria-label="View appointment"
        >
          <EyeOpenedIcon height="18" width="18" />
        </button>
      </div>

      <div className="h-px w-full bg-slate-200" />

      {/* Body */}
      <div className="p-3">
        <div className="grid grid-cols-2 gap-y-2">
          <p className="text-sm text-slate-700">Specialty:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.specialty}
          </p>

          <p className="text-sm text-slate-700">Problem:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.problem}
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
