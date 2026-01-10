"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export type ReportsBarChartSeries = {
  name: string; // "Prescriptions" | "Lab Reports" | "Vaccines" (or anything)
  data: number[];
};

type RangeKey = "weekly" | "monthly" | "yearly";

export type ReportsSummaryChartProps = {
  title?: string;
  series: ReportsBarChartSeries[];

  /** user chooses range, you will render categories accordingly */
  range?: RangeKey; // default "monthly"

  /** Optional: show the toggle pills like the screenshot */
  showRangeTabs?: boolean;
  onRangeChange?: (v: RangeKey) => void;

  height?: number;

  /**
   * Optional override: if you want custom labels (e.g., localized months),
   * you can pass your own categories.
   * If provided, it will be used as-is.
   */
  categoriesOverride?: string[];
};

function getCategories(range: RangeKey) {
  if (range === "weekly")
    return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  if (range === "yearly")
    return ["2020", "2021", "2022", "2023", "2024", "2025"];

  // monthly (default)
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
}

/**
 * Ensures the chart stays consistent even if series length != categories length:
 * - If data is shorter, pad with 0s
 * - If data is longer, trim
 */
function normalizeSeries(
  series: ReportsBarChartSeries[],
  categoriesLen: number
) {
  return series.map((s) => {
    const data = Array.isArray(s.data) ? s.data : [];
    const next = data.slice(0, categoriesLen);
    while (next.length < categoriesLen) next.push(0);
    return { ...s, data: next };
  });
}

export default function ReportsSummaryChart({
  title = "Reports Summary",
  series,
  range = "monthly",
  showRangeTabs = true,
  onRangeChange,
  height = 320,
  categoriesOverride,
}: ReportsSummaryChartProps) {
  const categories = useMemo(
    () => categoriesOverride ?? getCategories(range),
    [categoriesOverride, range]
  );

  const normalizedSeries = useMemo(
    () => normalizeSeries(series, categories.length),
    [series, categories.length]
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        toolbar: { show: false },
        foreColor: "#6B7280",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
      },
      colors: ["#0BA5EC", "#F79009", "#F04438"], // blue / orange / red
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "32%",
          borderRadius: 6,
          borderRadiusApplication: "end",
          dataLabels: { position: "top" },
        },
      },
      dataLabels: { enabled: false },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        fontSize: "14px",
        // markers: { width: 14, height: 14, radius: 3 },
        itemMargin: { horizontal: 16, vertical: 8 },
      },
      grid: {
        borderColor: "#EEF2F7",
        padding: { top: 10, right: 10, left: 10, bottom: 0 },
      },
      xaxis: {
        categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { fontSize: "12px" } },
      },
      yaxis: {
        min: 0,
        max: 20,
        tickAmount: 5,
        labels: {
          style: { fontSize: "12px" },
          formatter: (val) => `${Math.round(val)}`,
        },
      },
      tooltip: {
        theme: "light",
        y: { formatter: (val) => `${val}` },
      },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            plotOptions: { bar: { columnWidth: "45%" } },
            legend: { fontSize: "13px" },
          },
        },
      ],
    }),
    [categories]
  );

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white ">
      <div className="mb-4 flex items-center justify-between gap-3 py-3 px-5 border-b border-b-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

        {showRangeTabs && (
          <div className="flex items-center ">
            {(["weekly", "monthly", "yearly"] as const).map((k) => {
              const active = range === k;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => onRangeChange?.(k)}
                  className={[
                    "rounded-lg px-3 py-1.5 cursor-pointer text-sm font-semibold transition",
                    active
                      ? "bg-green-50 text-[#17B26A]"
                      : "text-slate-600 hover:text-slate-800",
                  ].join(" ")}
                >
                  {k[0].toUpperCase() + k.slice(1)}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <ReactApexChart
        options={options}
        series={normalizedSeries}
        type="bar"
        height={height}
      />
    </div>
  );
}
