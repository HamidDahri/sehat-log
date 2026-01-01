"use client";
import { VerificationStatus } from "@/app/components";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <VerificationStatus
        status="success"
        onPrimaryAction={() => router.push("/")}
      />
    </div>
  );
};

export default Page;
