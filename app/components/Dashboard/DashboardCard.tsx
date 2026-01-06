import Image, { StaticImageData } from "next/image";
import React, { ReactNode } from "react";

export interface DashboardCardProps {
  value: number | string;
  label: string;
  icon: ReactNode;
  illustration?: StaticImageData;
  gradientClass?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  value,
  label,
  icon,
  illustration,
  gradientClass = "from-green-teal to-aqua-green",
}) => {
  return (
    <div
      className={`relative flex items-center gap-5 rounded-xl py-4 px-5 bg-linear-0 ${gradientClass}`}
    >
      <div className="shrink-0">{icon}</div>
      <div className="space-y-1">
        <h2 className="text-white font-semibold text-3xl leading-none">
          {value}
        </h2>
        <p className="text-white text-base font-normal">{label}</p>
      </div>

      {illustration && (
        <Image
          src={illustration}
          alt=""
          className="absolute end-0 top-1/2 -translate-y-1/2 pointer-events-none"
          priority={false}
        />
      )}
    </div>
  );
};

export default DashboardCard;
