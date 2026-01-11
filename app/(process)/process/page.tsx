"use client";

import { VerificationStatus } from "@/app/components";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Status = "failed" | "inProcess" | "success";

const Page = () => {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("failed");

  const handlePrimaryAction = () => {
    if (status === "failed") {
      setStatus("inProcess");
      return;
    }

    if (status === "inProcess") {
      setStatus("success");
      return;
    }

    if (status === "success") {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <VerificationStatus
        status={status}
        onPrimaryAction={handlePrimaryAction}
      />
    </div>
  );
};

export default Page;
