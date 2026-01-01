"use client";
import { AuthHeader, ThemeButton } from "@/app/components";
import CustomCheckbox from "@/app/components/ui/input/CustomCheckBox";
import ThemeInput from "@/app/components/ui/input/ThemeInput";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex items-center justify-center -mt-10 ">
      <div className="py-10 px-8 rounded-xl relative space-y-8  bg-white w-full max-w-xl shadow-auth-card">
        <AuthHeader
          title="Welcome Back!"
          subtitle="Please enter your ID and password to continue"
          onCloseClick={() => {}}
        />

        <div className="space-y-6">
          <div className="flex flex-col gap-4">
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
              placeholder="Enter your password"
              onChange={() => {}}
              onBlur={() => {}}
              error={false}
              errorMessage="error message"
              type="password"
              required
            />

            <div className="flex items-center justify-between">
              <CustomCheckbox
                direction="flex-row-reverse"
                checked
                label="Remember Me"
                onChange={() => {}}
              />
              <Link
                href={"/forgot"}
                className="font-semibold text-sm text-primary-blue"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <ThemeButton
            label="Sign in"
            disabled={false}
            onClick={() => {}}
            type="submit"
          />
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-slate-600 text-sm">Don’t have an account?</span>
          <Link
            href={"/register"}
            className="font-semibold text-sm text-primary-blue"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
