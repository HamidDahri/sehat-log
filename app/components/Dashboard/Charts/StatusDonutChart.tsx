/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export type RangeKey = "weekly" | "monthly" | "yearly";

export type DonutDataset = {
  active: number;
  expired: number;
};

type Props = {
  title?: string;
  dataByRange?: Record<RangeKey, DonutDataset>; // optional custom data
  height?: number; // chart container height
  width?: number; // chart container width
};

const defaultData: Record<RangeKey, DonutDataset> = {
  weekly: { active: 63, expired: 37 },
  monthly: { active: 72, expired: 28 },
  yearly: { active: 55, expired: 45 },
};

function toPct(value: number, total: number) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

export default function StatusDonutChart({
  title = "Status",
  dataByRange = defaultData,
  width = 420,
  height = 320,
}: Props) {
  const [range, setRange] = useState<RangeKey>("weekly");

  // measure chart area for bubble positioning
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!wrapRef.current) return;

    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      setSize({ w: rect.width, h: rect.height });
    });

    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const { active, expired } = dataByRange[range];
  const total = active + expired;

  const activePct = toPct(active, total);
  const expiredPct = toPct(expired, total);

  const series = useMemo(() => [active, expired], [active, expired]);

  const colors = ["#16A34A", "#EF4444"]; // green, red
  const labels = ["Active", "Expired"];

  const options: ApexOptions = useMemo(
    () => ({
      chart: { type: "donut", toolbar: { show: false } },
      labels,
      colors,
      stroke: { width: 0 },
      legend: { show: false },
      dataLabels: { enabled: false },
      tooltip: { enabled: true },
      plotOptions: {
        pie: {
          startAngle: -90,
          donut: { size: "68%" },
        },
      },
    }),
    []
  );

  // bubble positions (mid angle of each slice)
  const bubbles = useMemo(() => {
    const w = size.w;
    const h = size.h;
    if (!w || !h) return [];

    const cx = w / 2;
    const cy = h / 2;

    const radius = Math.min(w, h) / 2;
    const bubbleDist = radius * 0.92;

    const startAngleDeg = -90;

    const values = [active, expired];
    const pcts = [activePct, expiredPct];

    let acc = 0;
    return values.map((val, idx) => {
      const sliceDeg = total ? (val / total) * 360 : 0;
      const midDeg = startAngleDeg + acc + sliceDeg / 2;
      acc += sliceDeg;

      const rad = (midDeg * Math.PI) / 180;
      const x = cx + Math.cos(rad) * bubbleDist;
      const y = cy + Math.sin(rad) * bubbleDist;

      return { x, y, text: `${pcts[idx]}%`, key: labels[idx] };
    });
  }, [size.w, size.h, active, expired, total, activePct, expiredPct]);

  const btnBase = "py-2 px-3 rounded-sm font-semibold text-sm transition";
  const btnActive = "bg-green-50 text-green-600";
  const btnInactive = "text-slate-500 hover:bg-slate-50";

  return (
    <div className="bg-white border border-slate-200 overflow-hidden rounded-xl">
      <div className="py-3 px-5 flex items-center justify-between border-b border-b-slate-200">
        <h2 className="text-slate-800 font-semibold text-lg">{title}</h2>

        <div className="space-x-3">
          <button
            type="button"
            onClick={() => setRange("weekly")}
            className={`${btnBase} ${
              range === "weekly" ? btnActive : btnInactive
            }`}
          >
            Weekly
          </button>
          <button
            type="button"
            onClick={() => setRange("monthly")}
            className={`${btnBase} ${
              range === "monthly" ? btnActive : btnInactive
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setRange("yearly")}
            className={`${btnBase} ${
              range === "yearly" ? btnActive : btnInactive
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="p-5 flex items-center gap-8">
        {/* Donut + bubbles */}
        <div className="relative" style={{ width, height }}>
          <div ref={wrapRef} className="relative w-full h-full">
            <Chart
              options={options}
              series={series}
              type="donut"
              height="100%"
            />

            {bubbles.map((b) => (
              <div
                key={b.key}
                className="absolute grid place-items-center w-14 h-14 rounded-full bg-white shadow-md text-slate-900 font-semibold"
                style={{
                  left: b.x,
                  top: b.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {b.text}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3 min-w-[180px]">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-slate-700">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: colors[0] }}
              />
              <span>Active</span>
            </div>
            <div className="font-semibold text-slate-900">{activePct}%</div>
          </div>

          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-slate-700">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: colors[1] }}
              />
              <span>Expired</span>
            </div>
            <div className="font-semibold text-slate-900">{expiredPct}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
