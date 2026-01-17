"use client";

import * as React from "react";

type ToggleOption = {
  label: string;
  value: string;
};

type GroupToggleProps = {
  options?: ToggleOption[];
  value?: string; // controlled
  defaultValue?: string; // uncontrolled
  onChange?: (value: string) => void;
  className?: string;
};

export default function GroupToggle({
  options = [
    { label: "Liked Doctors", value: "liked" },
    { label: "Most Frequently Visited Doctors", value: "frequent" },
    { label: "Nearby Doctors", value: "nearby" },
  ],
  value,
  defaultValue,
  onChange,
  className = "",
}: GroupToggleProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(
    defaultValue ?? options[0]?.value ?? ""
  );

  const selected = isControlled ? value! : internal;

  const setSelected = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div
      className={[
        "w-full rounded-lg border border-slate-200 bg-slate-50 p-1.5",
        className,
      ].join(" ")}
      role="tablist"
      aria-label="Doctor filters"
    >
      <div className="flex items-center gap-2">
        {options.map((opt) => {
          const active = opt.value === selected;

          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(opt.value)}
              className={[
                "py-2 px-3 select-none rounded-sm cursor-pointer text-sm font-semibold transition",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50",
                active
                  ? "bg-slate-200 text-black shadow-sm ring-1 ring-slate-200"
                  : "bg-transparent text-slate-500 hover:bg-white/60 hover:text-slate-700",
              ].join(" ")}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
