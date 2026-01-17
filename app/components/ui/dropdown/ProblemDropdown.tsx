/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  BookmarkFilledIcon,
  BookmarkIcon,
  CheckboxCheckedIcon,
  CheckBoxIcon,
} from "@/public/icons";
import React from "react";
import Select, {
  components,
  GroupBase,
  MultiValue,
  OptionProps,
  MenuListProps,
  ControlProps,
  MultiValueProps,
} from "react-select";

export type SymptomItem = {
  value: string;
  label: string;
  isFavorite?: boolean; // shows bookmark icon
};

export type SymptomGroup = {
  label: string; // "Favorites" | "Recently Used" | "All Symptoms"
  options: SymptomItem[];
};

type Props = {
  label?: string; // "Problem"
  placeholder?: string; // "Search"
  groups: SymptomGroup[];

  value: SymptomItem[]; // selected (controlled)
  onChange: (selected: SymptomItem[]) => void;

  /** Optional: called when bookmark icon clicked */
  onToggleFavorite?: (item: SymptomItem, next: boolean) => void;

  /** Optional: disable component */
  isDisabled?: boolean;

  /** Optional: className wrapper */
  className?: string;
};

export default function ProblemDropdown({
  label = "Problem",
  placeholder = "Search",
  groups,
  value,
  onChange,
  onToggleFavorite,
  isDisabled,
  className = "",
}: Props) {
  const flatOptions = React.useMemo(() => groups, [groups]);

  const handleChange = (vals: MultiValue<SymptomItem>) => {
    onChange(vals as SymptomItem[]);
  };

  return (
    <div className={["w-full", className].join(" ")}>
      {label ? (
        <p className="mb-1 text-sm font-semibold text-slate-700">{label}</p>
      ) : null}

      <Select<SymptomItem, true, GroupBase<SymptomItem>>
        instanceId="problem-select"
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isClearable={false}
        isDisabled={isDisabled}
        options={flatOptions}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        // Search by label
        filterOption={(candidate: { label: string }, input: string) =>
          candidate.label.toLowerCase().includes(input.toLowerCase())
        }
        // custom UI pieces
        components={{
          Option: (p: any) => (
            <CustomOption {...p} onToggleFavorite={onToggleFavorite} />
          ),
          MenuList: CustomMenuList,
          Control: CustomControl,
          MultiValue: CustomMultiValue,
          IndicatorSeparator: () => null,
          MultiValueRemove: () => null,
        }}
        styles={{
          container: (base: any) => ({ ...base, padding: 0 }),
          control: (base: any) => ({
            ...base,
            minHeight: 46,
            borderRadius: 8,
            padding: 0,
            borderColor: "#E2E8F0", // slate-200
            boxShadow: "none",
          }),
          dropdownIndicator: (base: any) => ({
            ...base,
            color: "#0F172A", // arrow color
            padding: 6,
          }),
          menu: (base: any) => ({
            ...base,
            borderRadius: 8,
            padding: "0px 8px",
            overflow: "hidden",
            border: "1px solid #E2E8F0",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.10)",
          }),
          menuList: (base: any) => ({
            ...base,
            padding: 0,
            maxHeight: 260,
          }),
          placeholder: (base: any) => ({
            ...base,
            color: "#94A3B8",
            fontSize: 14,
          }),
          valueContainer: (base: any) => ({
            ...base,
            padding: "4px 8px",
            gap: 6,
          }),
          input: (base: any) => ({
            ...base,
            margin: 0,
            padding: 0,
          }),
          multiValue: (base: any) => ({
            ...base,
            backgroundColor: "#F8FAFC",
            borderRadius: 6,
            padding: "4px 8px",
            border: "1px solid #E2E8F0",
            fontSize: 12,
            fontWeight: 400,
          }),
          multiValueLabel: (base: any) => ({
            ...base,
            color: "#0F172A",
            fontWeight: 600,
            fontSize: 13,
          }),
          multiValueRemove: (base: any) => ({
            ...base,
            borderRadius: 8,
            ":hover": { backgroundColor: "#E2E8F0", color: "#0F172A" },
          }),
          option: (base: any, state: { isFocused: any }) => ({
            ...base,
            backgroundColor: state.isFocused ? "#F8FAFC" : "white",
            color: "#0F172A",
            padding: 0, // we render our own padding inside
          }),
          groupHeading: (base: any) => ({
            ...base,
            margin: 0,
            fontSize: 12,
            fontWeight: 400,
            color: "#0F172A",
            textTransform: "none",
          }),
        }}
      />
    </div>
  );
}

function CustomControl(props: ControlProps<SymptomItem, true>) {
  const { children } = props;

  return (
    <components.Control {...props}>
      <div className="flex w-full items-center gap-2 ">
        <div className="flex-1 items-center flex">{children}</div>
      </div>
    </components.Control>
  );
}

// add a tiny top border + padding inside menu list
function CustomMenuList(
  props: MenuListProps<SymptomItem, true, GroupBase<SymptomItem>>,
) {
  return (
    <components.MenuList {...props}>
      <div className="border-t border-slate-200" />
      {props.children}
    </components.MenuList>
  );
}

// multi chips (top selected pills)
function CustomMultiValue(
  props: MultiValueProps<SymptomItem, true, GroupBase<SymptomItem>>,
) {
  return (
    <components.MultiValue {...props}>{props.children}</components.MultiValue>
  );
}

function CustomOption({
  children,
  isSelected,
  data,
  innerProps,
  onToggleFavorite,
}: OptionProps<SymptomItem, true> & {
  onToggleFavorite?: (item: SymptomItem, next: boolean) => void;
}) {
  return (
    <div
      {...innerProps}
      className="flex cursor-pointer items-center justify-between gap-3 px-2 py-1.5"
    >
      <div className="flex items-center gap-2">
        {isSelected ? <CheckboxCheckedIcon /> : <CheckBoxIcon />}
        <div className="text-sm font-medium text-slate-700">{children}</div>
      </div>

      {/* Bookmark icon on right */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation(); // don't select option when toggling favorite
          onToggleFavorite?.(data, !(data.isFavorite ?? false));
        }}
        className="rounded-md p-1 hover:bg-slate-100"
        aria-label="Toggle favorite"
      >
        {/* <Bookmark filled={!!data.isFavorite} /> */}
        {data.isFavorite ? <BookmarkFilledIcon /> : <BookmarkIcon />}
      </button>
    </div>
  );
}
