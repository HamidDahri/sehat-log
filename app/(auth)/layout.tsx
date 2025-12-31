"use client";
import Image from "next/image";
import { ReactNode } from "react";
import { Images } from "../ui/images";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-full h-screen bg-white pb-24">
      <div className="h-80 bg-linear-90 from-french-pass to-off-green w-full flex items-center justify-center">
        <Image alt="" src={Images.auth.logo} className="h-32" />
      </div>
      {children}
    </div>
  );
}
