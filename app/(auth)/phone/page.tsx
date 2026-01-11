"use client";

import React, { useMemo, useState } from "react";
import { AuthHeader, ThemeButton } from "@/app/components";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useRouter } from "next/navigation";

type PhoneMeta = {
  phone: string;
  countryName: string;
  countryCode: string;
  dialCode: string;
  phoneNumber: string;
};

const Page = () => {
  const router = useRouter();
  const [meta, setMeta] = useState<PhoneMeta>({
    phone: "",
    countryName: "",
    countryCode: "",
    dialCode: "",
    phoneNumber: "",
  });

  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isValid = useMemo(() => {
    if (!meta.phone) return false;
    return isValidPhoneNumber(meta.phone);
  }, [meta.phone]);

  const error = useMemo(() => {
    if (!touched) return "";
    if (!meta.phone) return "Phone number is required.";
    if (!isValid) return "Please enter a valid phone number.";
    return "";
  }, [touched, meta.phone, isValid]);

  const handlePhoneChange = (value?: string) => {
    setTouched(true);

    if (!value) {
      setMeta({
        phone: "",
        countryName: "",
        countryCode: "",
        dialCode: "",
        phoneNumber: "",
      });
      return;
    }

    try {
      const phoneObj = parsePhoneNumber(value);

      setMeta({
        phone: value,
        countryName: phoneObj?.country || "",
        countryCode: phoneObj?.country || "",
        dialCode: phoneObj?.countryCallingCode
          ? `+${phoneObj.countryCallingCode}`
          : "",
        phoneNumber: phoneObj?.nationalNumber || "",
      });
    } catch {
      setMeta((prev) => ({
        ...prev,
        phone: value,
      }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!meta.phone || !isValid) return;

    setSubmitting(true);
    try {
      console.log("SUBMIT payload:", meta);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center -mt-10">
      <form
        onSubmit={onSubmit}
        className="py-10 px-8 rounded-xl relative space-y-8 bg-white w-full max-w-xl shadow-auth-card"
      >
        <AuthHeader title="Enter Your Phone no" onCloseClick={() => {}} />

        <div className="space-y-6">
          <div className="flex flex-col gap-1 md:gap-1.5">
            <PhoneInput
              defaultCountry="NZ"
              international
              withCountryCallingCode
              value={meta.phone}
              onChange={handlePhoneChange}
              onBlur={() => setTouched(true)}
              className={`w-full px-3.5 py-2.5 border border-slate-200 bg-slate-100 focus-within:border focus-within:border-primary-green rounded-lg text-sm font-normal text-slate-900  ${
                touched && error ? " border-red-500" : ""
              }`}
            />

            {touched && error && (
              <p className="text-xs text-red-500 mt-1">{error}</p>
            )}
          </div>
          <ThemeButton
            label={submitting ? "Verifying..." : "Verify"}
            type="submit"
            disabled={submitting || (touched && !!error)}
            onClick={() => {
              if (!submitting && touched && !error) {
                router.push("verify?from=phone");
              }
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Page;
