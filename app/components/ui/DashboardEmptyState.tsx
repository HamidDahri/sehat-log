import React from "react";
import ThemeButton from "./buttons/ThemeButton";
import { PlusIcon } from "@/public/icons";

interface ThemeButtonProps {
  label: string;
  subTitle: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon: React.ReactNode;
  btnLabel: string;
}

const DashboardEmptyState: React.FC<ThemeButtonProps> = ({
  label,
  onClick,
  subTitle,
  btnLabel,
  icon,
}) => {
  return (
    <div className="max-w-2xl flex items-center justify-center gap-10 flex-col text-center">
      {icon && <span className="flex items-center ">{icon}</span>}
      <div className="space-y-6 flex items-center justify-center flex-col">
        <div className="space-y-3">
          <h2 className="font-semibold text-black text-2xl">{label}</h2>
          <p className="font-normal text-black text-xl">{subTitle}</p>
        </div>
        <div className="flex w-fit">
          <ThemeButton label={btnLabel} onClick={onClick} icon={<PlusIcon />} />
        </div>
      </div>
    </div>
  );
};

export default DashboardEmptyState;
