"use client";
import { AuthHeader, IdVerificationUpload } from "@/app/components";

const Page = () => {
  return (
    <div className="flex items-center justify-center -mt-10 ">
      <div className="py-10 px-8 rounded-xl relative space-y-8  bg-white w-full max-w-304 shadow-auth-card">
        <AuthHeader
          title="Verify Your Identity"
          onBackClick={() => {}}
          list={[
            "Please upload clear images of your government-issued ID card (Front & Back).",
            "Make sure your name, ID number, and photo are clearly visible and not blurred.",
            "Government ID verification is mandatory to comply with local and international privacy regulations.",
          ]}
        />
        <IdVerificationUpload />
      </div>
    </div>
  );
};

export default Page;
