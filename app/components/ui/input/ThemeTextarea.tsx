"use client";

import React from "react";
import clsx from "clsx";

type TextareaFieldProps = {
  title: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;

  rows?: number;
  disabled?: boolean;
  className?: string;

  optional?: boolean;
};

export default function ThemeTextarea({
  title,
  placeholder = "",
  value,
  onChange,
  rows = 4,
  disabled = false,
  className = "",
  optional = true,
}: TextareaFieldProps) {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      {/* Label */}
      <label className="text-sm font-semibold text-slate-700">
        {title}
        {optional && (
          <span className="text-slate-500 font-normal"> (Optional)</span>
        )}
      </label>

      {/* Textarea */}
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "w-full rounded-xl border border-slate-200 bg-white",
          "px-4 py-3 text-sm text-slate-800",
          "placeholder:text-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          "transition resize-none",
          disabled && "cursor-not-allowed bg-slate-50 text-slate-400",
        )}
      />
    </div>
  );
}
