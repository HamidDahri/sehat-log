import { ArrowIcon, CrossIcon } from "@/public/icons";
import React from "react";

type AuthHeaderProps = {
  title: string;
  title2?: string;
  subtitle?: string;
  list?: string[];

  onBackClick?: () => void;
  onCloseClick?: () => void;

  message?: string;
};

const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  title2,
  subtitle,
  list,
  onBackClick,
  onCloseClick,
  message,
}) => {
  return (
    <div className=" flex flex-col items-center justify-center ">
      {onCloseClick && (
        <button
          onClick={onCloseClick}
          className="absolute top-6 end-6  cursor-pointer h-8 w-8 flex items-center justify-center rounded-full bg-slate-100"
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

      {title && (
        <h2 className="text-slate-900  text-center font-semibold text-3xl">
          {title}
        </h2>
      )}
      <h2 className="text-slate-900 text-center font-semibold text-3xl">
        {title2}
      </h2>

      {list && (
        <ul className="list-disc text-slate-800 text-base mt-4">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      <div className="">
        {subtitle && (
          <h3 className="text-slate-800 mt-4 text-center font-normal">
            {subtitle}
          </h3>
        )}

        {message && (
          <h3 className="text-primary-blue text-center font-normal">
            {message}
          </h3>
        )}
      </div>
    </div>
  );
};

export default AuthHeader;
