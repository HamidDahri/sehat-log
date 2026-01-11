"use client";
import { AuthHeader, Dropdown, ThemeButton } from "@/app/components";
import ThemeInput from "@/app/components/ui/input/ThemeInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const signingupOptions = [
  { label: "Patient", value: "patient" },
  { label: "Doctor", value: "doctor" },
];

const Page = () => {
  const router = useRouter();
  const [period, setPeriod] = useState<string | undefined>();
  return (
    <div className="flex items-center justify-center -mt-10 ">
      <div className="py-10 px-8 rounded-xl relative space-y-8  bg-white w-full max-w-xl shadow-auth-card">
        <AuthHeader
          title="Create Your Account"
          subtitle="Start managing your health records or your patients — securely and easily."
          onCloseClick={() => {}}
        />

        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <ThemeInput
              label="Full Name"
              placeholder="Enter your full name"
              onChange={() => {}}
              onBlur={() => {}}
              error={false}
              errorMessage="error message"
              type="Email"
              required
            />

            <ThemeInput
              label="Email Address"
              placeholder="Enter your email address"
              onChange={() => {}}
              onBlur={() => {}}
              error={false}
              errorMessage="error message"
              type="text"
              required
            />
            <ThemeInput
              label="Password"
              placeholder="Create a password"
              onChange={() => {}}
              onBlur={() => {}}
              error={false}
              errorMessage="error message"
              type="password"
              required
            />

            <Dropdown
              options={signingupOptions}
              value={period}
              placeholder="Select a role"
              onChange={setPeriod}
              label={"I am signing up as:"}
            />
          </div>
          <ThemeButton
            label="Sign Up"
            disabled={false}
            onClick={() => {
              router.push("/verify?from=register");
            }}
            type="submit"
          />
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-slate-600 text-sm">
            Already have an account?
          </span>
          <Link
            href={"/login"}
            className="font-semibold text-sm text-primary-blue"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
