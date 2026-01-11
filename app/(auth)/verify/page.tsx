"use client";
import { AuthHeader, ThemeButton } from "@/app/components";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import OTPInput from "react-otp-input";

const Page = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState(true);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="flex items-center justify-center -mt-10 ">
      <div className="py-10 px-8 rounded-xl relative space-y-8  bg-white w-full max-w-xl shadow-auth-card">
        <AuthHeader
          title={
            from === "register" || from === "emailVerify" || from === "forgot"
              ? "Verify Your Email"
              : "Verify Your Phone no"
          }
          subtitle={
            from === "register" || from === "emailVerify" || from === "forgot"
              ? "We’ve sent a 6-digit verification code to your email:"
              : "We’ve sent a 6-digit verification code to your Phone no:"
          }
          message={
            from === "register" || from === "emailVerify" || from === "forgot"
              ? "asad1234@gmail.com"
              : "+92(333)-1234567"
          }
          onBackClick={() => {}}
        />

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex flex-col gap-1 md:gap-1.5">
            <label className="text-sm text-slate-700">Enter OTP Code</label>
            <OTPInput
              value={otp}
              onChange={(value) => {
                setOtp(value);
                if (error) setError(false);
              }}
              numInputs={6}
              placeholder="000000"
              inputType="number"
              containerStyle={
                "flex items-center gap-2 justify-center w-full select-none"
              }
              inputStyle={`bg-white !w-full h-16 font-semibold text-center placeholder:text-gray-200 border text-[32px] [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none rounded-lg outline-primary text-gray-800 focus:ring-1 focus:ring-gray-300 select-none ${
                error ? "border-red-500" : "border-slate-200"
              }`}
              renderInput={(props) => <input {...props} />}
            />
            <span className="text-red-500 text-sm font-normal">
              Incorrect OTP. Please try again.
            </span>
          </div>
          <ThemeButton
            disabled={otp.length < 6 || error}
            label={"Verify"}
            type="submit"
            onClick={() => {
              if (from === "register") {
                router.push("phone");
              } else if (from === "phone") {
                router.push("language");
              } else if (from === "emailVerify") {
                router.push("/dashboard");
              } else if (from === "phoneVerify") {
                router.push("/dashboard");
              } else if (from === "forgot") {
                router.push("/new-password");
              }
            }}
          />
        </form>

        <div className="flex items-center justify-center gap-1">
          <span className="text-slate-600 text-sm">
            Didn’t receive the code?
          </span>
          <span className="font-semibold text-sm text-primary-blue">
            Resend OTP
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
