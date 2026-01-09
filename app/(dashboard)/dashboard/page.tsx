"use client";
import { DashboardCard, StatusDonutChart } from "@/app/components";
import RevenueChart from "@/app/components/Dashboard/Charts/RevenueChart";
import { Images } from "@/app/ui/images";
import {
  HospitalCardIcon,
  LabIcon,
  PrescriptionIcon,
  RecordCardIcon,
  VaccineIcon,
} from "@/public/icons";
import { useMemo, useState } from "react";

const dashboardCards = [
  {
    value: 18,
    label: "Records",
    icon: <RecordCardIcon />,
    illustration: Images.dashboard.dashCardIllu,
    gradientClass: "from-emerald-500 to-emerald-400",
    shadowColor: "#34D399",
  },
  {
    value: 18,
    label: "Prescriptions",
    icon: <PrescriptionIcon />,
    illustration: Images.dashboard.dashCardIllu,
    gradientClass: "from-butterfly-blue to-jordy-blue",
    shadowColor: "#74C5EB",
  },
  {
    value: 45,
    label: "Records",
    icon: <LabIcon />,
    illustration: Images.dashboard.dashCardIllu,
    gradientClass: "from-amber-500 to-amber-400",
    shadowColor: "#FBBF24",
  },
  {
    value: 45,
    label: "Records",
    icon: <VaccineIcon />,
    illustration: Images.dashboard.dashCardIllu,
    gradientClass: "from-red-500 to-red-400",
    shadowColor: "#F87171",
  },
  {
    value: 45,
    label: "Records",
    icon: <HospitalCardIcon />,
    illustration: Images.dashboard.dashCardIllu,
    gradientClass: "from-aztex-purple to-crocus-purple",
    shadowColor: "#9071FF",
  },
];

type RangeKey = "weekly" | "monthly" | "yearly";

const chartData: Record<
  RangeKey,
  { categories: string[]; series: { name: string; data: number[] }[] }
> = {
  weekly: {
    categories: [
      "Oct 26",
      "Nov 2",
      "Nov 9",
      "Nov 16",
      "Nov 23",
      "Nov 30",
      "Dec 7",
    ],
    series: [
      {
        name: "Records",
        data: [50, 75, 28, 80, 52, 108, 90],
      },
    ],
  },
  monthly: {
    categories: [
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
    ],
    series: [
      {
        name: "Records",
        data: [420, 510, 390, 610, 550, 720, 690, 640, 580, 760, 810, 900],
      },
    ],
  },
  yearly: {
    categories: ["2021", "2022", "2023", "2024", "2025", "2026"],
    series: [
      {
        name: "Records",
        data: [4200, 5100, 6300, 7200, 8600, 9400],
      },
    ],
  },
};

const Page = () => {
  const [range, setRange] = useState<RangeKey>("weekly");

  const active = useMemo(() => chartData[range], [range]);

  const btnBase = "py-2 px-3 rounded-sm font-semibold text-sm transition";
  const btnActive = "bg-green-50 text-green-500";
  const btnInactive = "text-slate-500 hover:bg-slate-50";
  return (
    <div className="p-4 lg:p-6 w-full lg:pt-26 space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 lg:gap-6">
        {dashboardCards.map((card, index) => (
          <DashboardCard
            key={index}
            value={card.value}
            label={card.label}
            icon={card.icon}
            illustration={card.illustration}
            gradientClass={card.gradientClass}
            shadowColor={card.shadowColor}
          />
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 bg-white border border-slate-200 overflow-hidden rounded-xl">
          <div className="py-3 px-5 flex items-center justify-between border-b border-b-slate-200">
            <h2 className="text-slate-800 font-semibold text-lg">
              Number of Records
            </h2>

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

          <RevenueChart
            categories={active.categories}
            series={active.series}
            height={320}
            colors={["#2F9A10"]}
          />
        </div>
        <div className="col-span-4">
          <StatusDonutChart
            title="Subscriptions"
            dataByRange={{
              weekly: { active: 63, expired: 37 },
              monthly: { active: 80, expired: 19 },
              yearly: { active: 19, expired: 20 },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
