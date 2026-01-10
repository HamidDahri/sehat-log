"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { DateRangePicker, createStaticRanges } from "react-date-range";
import {
  addDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarIcon } from "@/public/icons";
import ThemeButton from "./buttons/ThemeButton";

export type DateRangeValue = {
  startDate: Date;
  endDate: Date;
};

type Props = {
  value: DateRangeValue; // applied value from parent
  onApply: (next: DateRangeValue) => void;
  onCancel?: () => void;
};

export default function DateRangeFilter({ value, onApply, onCancel }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // local draft so Cancel can revert
  const [draft, setDraft] = useState([
    { key: "selection", startDate: value.startDate, endDate: value.endDate },
  ]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // keep draft in sync when parent value changes
  // (optional but helpful if parent resets)
  // you can also do it in an effect if needed

  const staticRanges = useMemo(() => {
    const now = new Date();
    return createStaticRanges([
      {
        label: "Today",
        range: () => ({ startDate: startOfDay(now), endDate: endOfDay(now) }),
      },
      {
        label: "Yesterday",
        range: () => {
          const y = subDays(now, 1);
          return { startDate: startOfDay(y), endDate: endOfDay(y) };
        },
      },
      {
        label: "This week",
        range: () => ({
          startDate: startOfWeek(now, { weekStartsOn: 1 }),
          endDate: endOfWeek(now, { weekStartsOn: 1 }),
        }),
      },
      {
        label: "Last week",
        range: () => {
          const lw = subWeeks(now, 1);
          return {
            startDate: startOfWeek(lw, { weekStartsOn: 1 }),
            endDate: endOfWeek(lw, { weekStartsOn: 1 }),
          };
        },
      },
      {
        label: "This month",
        range: () => ({
          startDate: startOfMonth(now),
          endDate: endOfMonth(now),
        }),
      },
      {
        label: "Last month",
        range: () => {
          const lm = subMonths(now, 1);
          return { startDate: startOfMonth(lm), endDate: endOfMonth(lm) };
        },
      },
      {
        label: "This year",
        range: () => ({ startDate: startOfYear(now), endDate: endOfYear(now) }),
      },
      {
        label: "Last year",
        range: () => {
          const ly = subYears(now, 1);
          return { startDate: startOfYear(ly), endDate: endOfYear(ly) };
        },
      },
      {
        label: "All time",
        range: () => ({
          startDate: startOfDay(new Date(2000, 0, 1)),
          endDate: endOfDay(addDays(now, 0)),
        }),
      },
    ]);
  }, []);

  const label = `${format(value.startDate, "dd/MM/yyyy")} - ${format(
    value.endDate,
    "dd/MM/yyyy"
  )}`;

  return (
    <div ref={wrapperRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        className="border flex items-center whitespace-nowrap gap-3 border-slate-200 px-3.5 text-slate-900 py-2.5 rounded-lg bg-white"
        onClick={() => {
          // open and reset draft to current applied value
          setDraft([
            {
              key: "selection",
              startDate: value.startDate,
              endDate: value.endDate,
            },
          ]);
          setOpen((v) => !v);
        }}
      >
        {label} <CalendarIcon />
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute right-0 mt-2 z-50 bg-white border rounded-xl shadow-lg p-3 rdr-scope">
          <DateRangePicker
            ranges={draft}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(item: any) => {
              const sel = item.selection;
              setDraft([
                {
                  key: "selection",
                  startDate: sel.startDate!,
                  endDate: sel.endDate!,
                },
              ]);
            }}
            staticRanges={staticRanges}
            inputRanges={[]}
            months={1}
            direction="horizontal"
            // showSelectionPreview
            moveRangeOnFirstSelection={false}
          />

          <div className="flex items-center justify-end gap-2 pt-3">
            <ThemeButton
              label="Cancel"
              variant="outline"
              onClick={() => {
                setDraft([
                  {
                    key: "selection",
                    startDate: value.startDate,
                    endDate: value.endDate,
                  },
                ]);
                setOpen(false);
                onCancel?.();
              }}
            />

            <ThemeButton
              label="Apply"
              onClick={() => {
                const next = {
                  startDate: draft[0].startDate!,
                  endDate: draft[0].endDate!,
                };
                onApply(next);
                setOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
