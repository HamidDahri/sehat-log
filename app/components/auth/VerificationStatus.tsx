"use client";

import { FailedIcon, ProcessStateIcon, SuccessIcon } from "@/public/icons";
import React from "react";
import ThemeButton from "../ui/buttons/ThemeButton";

type VerificationStatusType = "inProcess" | "failed" | "success";

interface VerificationStatusProps {
  status: VerificationStatusType;
  onPrimaryAction?: () => void;
}

const config = {
  inProcess: {
    title: "Verification in Progress",
    description:
      "Your ID documents have been received. We're reviewing them to ensure authenticity.",
    buttonText: "Go to Home",
    buttonClass: "bg-sky-600 hover:bg-sky-700 text-white",
  },

  failed: {
    title: "Verification Failed",
    description:
      "We couldn't verify your ID. Please ensure the images are clear and valid.",
    buttonText: "Re-upload Documents",
    buttonClass: "bg-green-600 hover:bg-green-700 text-white",
  },

  success: {
    title: "Verification Successful!",
    description:
      "Your ID has been verified successfully. You can now access your dashboard.",
    buttonText: "Done",
    buttonClass: "bg-green-600 hover:bg-green-700 text-white",
  },
};

const VerificationStatus: React.FC<VerificationStatusProps> = ({
  status,
  onPrimaryAction,
}) => {
  const ui = config[status];

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center items-center justify-center flex flex-col max-w-md w-full px-6 py-10 space-y-7.5">
        <div className="flex justify-center">
          {status === "inProcess" ? (
            <ProcessStateIcon />
          ) : status === "failed" ? (
            <FailedIcon />
          ) : (
            <SuccessIcon />
          )}
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-800">{ui.title}</h2>
          <p className="text-lg text-slate-800">{ui.description}</p>
        </div>

        <div className="min-w-44.5">
          <ThemeButton
            label={ui.buttonText}
            variant={status === "inProcess" ? "secondary" : "primary"}
            onClick={onPrimaryAction}
          />
        </div>
      </div>
    </div>
  );
};

export default VerificationStatus;
