"use client";

import { CheckIcon } from "@/public/icons";
import { Checkbox } from "@headlessui/react";
import clsx from "clsx";

interface Props {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
  width?: string;
  direction?: string;
}

export default function CustomCheckbox({
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
  width = "w-32",
  direction = "flex-row",
}: Props) {
  return (
    <label
      className={`flex items-center ${direction} w-fit gap-2 select-none ${
        disabled ? "cursor-not-allowed " : "cursor-pointer"
      }`}
    >
      <span
        className={clsx(
          "text-sm inline-block font-medium text-slate-700",
          width
        )}
      >
        {label}
      </span>
      <Checkbox
        checked={checked}
        onChange={disabled ? () => {} : onChange}
        disabled={disabled}
        className={`
          group size-5 rounded-sm p-0.5 shrink-0 ring-1 ring-white/15 border border-gainsboro ring-inset 
          bg-gray-100 data-checked:bg-primary-normal
          focus:not-data-focus:outline-none  flex items-center justify-center
          data-focus:outline data-focus:outline-offset-2 data-focus:outline-white
          ${disabled ? "opacity-50" : ""}
          ${className}
        `}
      >
        {checked && <CheckIcon />}
      </Checkbox>
    </label>
  );
}
