"use client";
import { AuthHeader, Dropdown, ThemeButton } from "@/app/components";
import Link from "next/link";
import React, { useState } from "react";

const signingupOptions = [
  { label: "English", value: "english" },
  { label: "German", value: "german" },
  { label: "French", value: "french" },
  { label: "Chinese", value: "chinese" },
  { label: "Hindi", value: "hindi" },
];

const Page = () => {
  const [language, setLanguage] = useState<string | undefined>();
  return (
    <div className="flex items-center justify-center -mt-10">
      <div className="py-10 px-8 rounded-xl relative space-y-8 bg-white w-full max-w-xl shadow-auth-card">
        <AuthHeader title="Select Language" onCloseClick={() => {}} />

        <div className="space-y-6">
          <Dropdown
            options={signingupOptions}
            value={language}
            onChange={setLanguage}
            placeholder="Select Language"
            showSearch
          />
          <ThemeButton label={"Continue"} type="submit" />
        </div>

        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => {}}
            className="font-semibold cursor-pointer text-primary-blue"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
