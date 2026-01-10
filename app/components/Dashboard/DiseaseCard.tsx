import React, { ReactNode } from "react";

type DiseaseCardProps = {
  icon: ReactNode;
  title: string;
  duration: string; // e.g. "03 years"
  iconBgClassName?: string;
  className?: string;
};

export default function DiseaseCard({
  icon,
  title,
  duration,
  iconBgClassName = "bg-emerald-600",
  className = "",
}: DiseaseCardProps) {
  return (
    <div
      className={`bg-white p-2 flex items-center gap-3 rounded-lg drop-shadow ${className}`}
    >
      <div
        className={`flex items-center justify-center rounded-lg h-12.5 w-12.5 ${iconBgClassName}`}
      >
        {icon}
      </div>

      <div>
        <h2 className="text-slate-600 text-sm font-semibold">{title}</h2>
        <h3 className="text-slate-600 text-sm">Duration: {duration}</h3>
      </div>
    </div>
  );
}
