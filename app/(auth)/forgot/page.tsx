"use client";
import { AuthHeader, ThemeButton } from "@/app/components";
import ThemeInput from "@/app/components/ui/input/ThemeInput";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center -mt-10 ">
      <div className="py-10 px-8 rounded-xl relative space-y-8  bg-white w-full max-w-xl shadow-auth-card">
        <AuthHeader
          title="Forgot Your Password?"
          subtitle="Enter your registered email address, and we’ll send you a verification code."
          onBackClick={() => {}}
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
          </div>
          <ThemeButton
            label="Send Verification Code"
            disabled={false}
            onClick={() => {
              router.push("/verify?from=forgot");
            }}
            type="submit"
          />
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-slate-600 text-sm">
            Remember your password?
          </span>
          <Link
            href={"/signin"}
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
