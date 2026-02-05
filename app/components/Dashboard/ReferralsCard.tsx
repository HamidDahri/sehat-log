"use client";

import React from "react";
import { Referral } from "../Tables/ReferralTable";

type Status = "InProgress" | "Completed" | "Pending";

type CardProps = {
  data: Referral;
};

function getStatusStyles(status: Status) {
  switch (status) {
    case "Pending":
      return "bg-warning-100 text-warning-600";
    case "Completed":
      return "bg-success-100 text-success-600";
    case "InProgress":
      return "bg-error-100 text-error-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function ReferralsCard({ data }: CardProps) {
  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white ">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <h3 className="text-base font-bold text-slate-900">{data.id}</h3>
      </div>

      <div className="h-px w-full bg-slate-200" />

      {/* Body */}
      <div className="p-3">
        <div className="grid grid-cols-2 gap-y-2">
          <p className="text-sm text-slate-700">Lab:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.referedDoctor}
          </p>

          <p className="text-sm text-slate-700">Test::</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.referedToDoctor}
          </p>

          <p className="text-sm text-slate-700">Time:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.urgency}
          </p>

          <p className="text-sm text-slate-700">Date:</p>
          <p className="text-right text-sm font-medium text-slate-700">
            {data.date}
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
