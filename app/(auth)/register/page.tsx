"use client";
import { AuthHeader } from "@/app/components";
import ThemeInput from "@/app/components/ui/input/ThemeInput";

const Page = () => {
  return (
    <div className="flex items-center justify-center -mt-10 ">
      <div className="py-10 px-8 rounded-xl relative  bg-white w-full max-w-xl shadow-auth-card">
        <AuthHeader
          title="Create Your Account"
          subtitle="Start managing your health records or your patients — securely and easily."
          onCloseClick={() => {}}
        />

        <div className="flex flex-col gap-4">
          <ThemeInput
            label="Full Name"
            placeholder="Enter your full name"
            onChange={() => {}}
            onBlur={() => {}}
            error={false}
            errorMessage="hamid"
            type="Email"
            required
          />

          <ThemeInput
            label="Full Name"
            placeholder="Enter your full name"
            onChange={() => {}}
            onBlur={() => {}}
            error={false}
            errorMessage="hamid"
            type="text"
            required
          />
          <ThemeInput
            label="Full Name"
            placeholder="Enter your full name"
            onChange={() => {}}
            onBlur={() => {}}
            error={false}
            errorMessage="hamid"
            type="password"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
