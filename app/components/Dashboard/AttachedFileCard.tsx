"use client";

import { DownloadIcon, EyeOpenedIcon, PDFIcon } from "@/public/icons";
import React from "react";

type Props = {
  title?: string; // "Attached Files"
  fileName: string; // "CBC_Report.pdf"
  fileSize: string; // "180 KB"
  fileType?: string; // "PDF"
  onDownload?: () => void;
  onPreview?: () => void;
};

export default function AttachedFileCard({
  title = "Attached Files",
  fileName,
  fileSize,
  fileType = "PDF",
  onDownload,
  onPreview,
}: Props) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: File icon + meta */}
          <div className="flex items-center gap-3 min-w-0">
            {/* PDF icon */}
            <PDFIcon />

            {/* Name + size */}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {fileName}
              </p>
              <p className="text-xs text-slate-500">{fileSize}</p>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              className="cursor-pointer"
              onClick={onDownload}
              disabled={!onDownload}
            >
              <DownloadIcon width="18" height="18" />
            </button>

            <button
              className="cursor-pointer"
              onClick={onPreview}
              disabled={!onPreview}
            >
              <EyeOpenedIcon height="28" width="28" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Small reusable icon button */
function IconButton({
  children,
  onClick,
  ariaLabel,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={[
        "h-10 w-10 rounded-lg border border-slate-200 bg-white",
        "flex items-center justify-center",
        "hover:bg-slate-50 transition",
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
        disabled ? "opacity-50 cursor-not-allowed hover:bg-white" : "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
