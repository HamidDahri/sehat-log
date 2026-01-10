"use client";

import React from "react";
import { List, LayoutGrid } from "lucide-react";
import { GridIcon, ListIcon } from "@/public/icons";

type ViewMode = "list" | "board";

type SegmentedViewToggleProps = {
  value: ViewMode;
  onChange: (next: ViewMode) => void;
  className?: string;
  disabled?: boolean;
};

export default function SegmentedViewToggle({
  value,
  onChange,
  className = "",
  disabled = false,
}: SegmentedViewToggleProps) {
  const isList = value === "list";
  const isBoard = value === "board";

  const baseBtn =
    "flex items-center justify-center gap-1.5 cursor-pointer py-2.5 px-4 text-base font-medium transition-colors";

  const activeBtn = "text-green-600";
  const inactiveBtn = "text-slate-700 hover:text-slate-700";

  return (
    <div
      className={[
        "inline-flex overflow-hidden rounded-lg border border-slate-200 bg-white",
        disabled ? "opacity-60 pointer-events-none" : "",
        className,
      ].join(" ")}
      role="tablist"
      aria-label="View switch"
    >
      <button
        type="button"
        onClick={() => onChange("list")}
        className={[baseBtn, isList ? activeBtn : inactiveBtn].join(" ")}
        aria-pressed={isList}
      >
        <ListIcon fill="currentColor" />
        <span>List</span>
      </button>
      <div className="w-[0.5px] bg-slate-200" />

      <button
        type="button"
        onClick={() => onChange("board")}
        className={[baseBtn, isBoard ? activeBtn : inactiveBtn].join(" ")}
        aria-pressed={isBoard}
      >
        <GridIcon fill="currentColor" />
        <span>Board</span>
      </button>
    </div>
  );
}
