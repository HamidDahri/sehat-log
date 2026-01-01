"use client";

import { RadioChecked, RadioUnchecked } from "@/public/icons";
import React, { useId } from "react";

export type VerificationMethodValue =
  | "email"
  | "phone"
  | "authenticator"
  | (string & {});

export type VerificationOption = {
  value: VerificationMethodValue;
  title: string; // e.g. "Email"
  description: string; // e.g. "A verification code will be sent..."
  highlight?: string; // e.g. "as@gmail.com" or "+92 *** 2345"
  disabled?: boolean;
};

type Props = {
  options: VerificationOption[];
  value: VerificationMethodValue | null;
  onChange: (value: VerificationMethodValue) => void;

  className?: string;
};

const VerificationMethodSelector: React.FC<Props> = ({
  options,
  value,
  onChange,
  className = "",
}) => {
  const groupId = useId();

  return (
    <div className={`space-y-6 ${className}`}>
      {options.map((opt) => {
        const checked = value === opt.value;
        const id = `${groupId}-${String(opt.value)}`;

        return (
          <label
            key={String(opt.value)}
            htmlFor={id}
            className={[
              "flex gap-3 items-start rounded-xl cursor-pointer select-none",
              "",
              opt.disabled ? "opacity-50 cursor-not-allowed" : "",
            ].join(" ")}
          >
            {/* Radio */}
            <span className="pt-1">
              <input
                id={id}
                type="radio"
                name={groupId}
                checked={checked}
                disabled={opt.disabled}
                onChange={() => !opt.disabled && onChange(opt.value)}
                className="h-5 w-5 hidden accent-green-900"
              />
              {checked ? <RadioChecked /> : <RadioUnchecked />}
            </span>

            {/* Content */}
            <div className="flex-1 space-y-1">
              <div className="text-lg font-semibold text-slate-900">
                {opt.title}
              </div>

              <div className="text-base text-slate-900 ">
                {opt.description}{" "}
                {opt.highlight ? (
                  <span className="font-semibold text-slate-900">
                    {opt.highlight}
                  </span>
                ) : null}
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default VerificationMethodSelector;
