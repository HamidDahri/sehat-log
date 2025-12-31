import { ArrowIcon, CrossIcon } from "@/public/icons";
import React from "react";

type AuthHeaderProps = {
  title: string;
  subtitle?: string;

  onBackClick?: () => void;
  onCloseClick?: () => void;
};

const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  onBackClick,
  onCloseClick,
}) => {
  return (
    <div className=" flex flex-col gap-4">
      {onCloseClick && (
        <button
          onClick={onCloseClick}
          className="absolute top-6 end-6 cursor-pointer h-8 w-8 flex items-center justify-center rounded-full bg-slate-100"
        >
          <CrossIcon />
        </button>
      )}

      {onBackClick && (
        <button
          onClick={onBackClick}
          className="absolute top-6 start-6 h-8 w-8 cursor-pointer flex items-center justify-center rounded-full bg-slate-100"
        >
          <ArrowIcon />
        </button>
      )}

      <h2 className="text-slate-900 text-center font-semibold text-3xl">
        {title}
      </h2>

      {subtitle && (
        <h3 className="text-slate-800 text-center font-normal">{subtitle}</h3>
      )}
    </div>
  );
};

export default AuthHeader;
