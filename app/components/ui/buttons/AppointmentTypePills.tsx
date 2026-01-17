"use client";

import { RadioChecked, RadioUnchecked } from "@/public/icons";
import * as React from "react";

export type AppointmentTypeOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type Props = {
  label?: string;
  options: AppointmentTypeOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option: AppointmentTypeOption) => void;

  className?: string;
};

export default function AppointmentTypePills({
  label = "Appointment Type",
  options,
  value,
  defaultValue,
  onChange,
  className = "",
}: Props) {
  const isControlled = value !== undefined;

  const firstEnabled = React.useMemo(
    () => options.find((o) => !o.disabled)?.value ?? "",
    [options],
  );

  const [internal, setInternal] = React.useState<string>(
    defaultValue ?? value ?? firstEnabled,
  );

  React.useEffect(() => {
    if (isControlled) setInternal(value ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const selected = isControlled ? (value ?? "") : internal;

  const select = (opt: AppointmentTypeOption) => {
    if (opt.disabled) return;

    if (!isControlled) setInternal(opt.value);
    onChange?.(opt.value, opt);
  };

  return (
    <div className={["w-full", className].join(" ")}>
      {label ? (
        <p className="mb-1 text-sm font-semibold text-slate-700">{label}</p>
      ) : null}

      <div className="flex w-full gap-3">
        {options.map((opt) => {
          const active = opt.value === selected;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => select(opt)}
              disabled={opt.disabled}
              className={[
                "flex-1 rounded-lg border p-3 text-xs font-medium",
                "transition-colors",
                active
                  ? "border-blue-200 bg-blue-50 text-slate-900"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                opt.disabled
                  ? "cursor-not-allowed opacity-50 hover:bg-white"
                  : "cursor-pointer",
              ].join(" ")}
            >
              <span className="flex items-center justify-start gap-2">
                {active ? <RadioChecked /> : <RadioUnchecked />}
                <span className="whitespace-nowrap">{opt.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
