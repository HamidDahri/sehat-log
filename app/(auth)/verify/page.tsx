"use client";
import { AuthHeader, ThemeButton } from "@/app/components";
import Link from "next/link";
import React, { useState } from "react";
import OTPInput from "react-otp-input";

const Page = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(true);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="flex items-center justify-center -mt-10 ">
      <div className="py-10 px-8 rounded-xl relative space-y-8  bg-white w-full max-w-xl shadow-auth-card">
        <AuthHeader
          title="Verify Your Email"
          subtitle="We’ve sent a 6-digit verification code to your email:"
          message="asad1234@gmail.com"
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
          />
        </form>

        <div className="flex items-center justify-center gap-1">
          <span className="text-slate-600 text-sm">
            Didn’t receive the code?
          </span>
          <Link
            href={"/sign-in"}
            className="font-semibold text-sm text-primary-blue"
          >
            Resend OTP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
