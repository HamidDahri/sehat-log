"use client";
import { AuthHeader, ThemeButton } from "@/app/components";
import ThemeInput from "@/app/components/ui/input/ThemeInput";

const Page = () => {
  return (
    <div className="flex items-center justify-center -mt-10 ">
      <div className="py-10 px-8 rounded-xl relative space-y-8  bg-white w-full max-w-xl shadow-auth-card">
        <AuthHeader
          title="Set a New Password"
          subtitle="Create a strong password to secure your SehatLog account and regain access."
          onCloseClick={() => {}}
        />

        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <ThemeInput
              label="New Password"
              placeholder="Create a new password"
              onChange={() => {}}
              onBlur={() => {}}
              error={false}
              errorMessage="error message"
              type="password"
              required
            />
            <ThemeInput
              label="Confirm Password"
              placeholder="Re-enter your new password"
              onChange={() => {}}
              onBlur={() => {}}
              error={false}
              errorMessage="error message"
              type="password"
              required
            />
          </div>
          <ThemeButton
            label="Reset Password"
            disabled={false}
            onClick={() => {}}
            type="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
