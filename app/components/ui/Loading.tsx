import { Loader } from "@/public/icons";
import React from "react";

const Loading: React.FC<{ loadingText?: string }> = ({ loadingText }) => {
  return (
    <div className="bg-white/70 min-h-screen fixed top-0 flex flex-col gap-7.5 items-center justify-center w-full">
      <span className="animate-spin inline-block">
        <Loader />
      </span>
      {loadingText && (
        <h2 className="text-slate-800 text-lg font-normal">{loadingText}</h2>
      )}
    </div>
  );
};

export default Loading;
