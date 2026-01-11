"use client";
import { AuthHeader, ThemeButton } from "@/app/components";
import VerificationMethodSelector, {
  VerificationMethodValue,
  VerificationOption,
} from "@/app/components/auth/VerificationMethodSelector";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [method, setMethod] = useState<VerificationMethodValue | null>("email");

  const userEmail = "as@gmail.com";
  const userPhone = "+92 *** 2345";

  const options: VerificationOption[] = useMemo(
    () => [
      {
        value: "email",
        title: "Email",
        description:
          "A verification code will be sent to your registered email:",
        highlight: userEmail,
      },
      {
        value: "phone",
        title: "Phone Number",
        description:
          "A verification code will be sent to your registered phone number:",
        highlight: userPhone,
      },
      {
        value: "authenticator",
        title: "Authenticator App",
        description:
          "Verify using your Authenticator App. You will scan a QR code and then enter the 6-digit code from the app.",
      },
    ],
    [userEmail, userPhone]
  );

  const handleContinue = () => {
    if (!method) return;
    console.log("Selected method:", method);
  };
  return (
    <div className="flex items-center justify-center -mt-10 ">
      <div className="py-10 px-8 rounded-xl relative space-y-8  bg-white w-full max-w-xl shadow-auth-card">
        <AuthHeader
          title="Select Your "
          title2="2-Step Verification Method"
          onBackClick={() => {}}
        />

        <div className="space-y-6">
          <VerificationMethodSelector
            options={options}
            value={method}
            onChange={setMethod}
          />
          <ThemeButton
            label="Continue"
            disabled={false}
            onClick={() => {
              if (method === "email") {
                router.push("/verify?from=emailVerify");
              } else if (method === "phone") {
                router.push("/verify?from=phoneVerify");
              } else if (method === "authenticator") {
                router.push("/dashboard");
              }
            }}
            type="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
