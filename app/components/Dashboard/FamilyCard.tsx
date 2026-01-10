import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { RefreshIcon } from "@/public/icons";

type FamilyCardProps = {
  className?: string;

  name: string; // "Muhammad Ali"
  relation: string; // "Father"

  imageSrc?: StaticImageData | string;

  actionIcon?: ReactNode;
  onActionClick?: () => void;
};

export default function FamilyCard({
  className = "",
  name,
  relation,
  imageSrc,
  actionIcon,
  onActionClick,
}: FamilyCardProps) {
  return (
    <div
      className={`flex items-center justify-between bg-white py-2 px-5 rounded-lg drop-shadow ${className}`}
    >
      <div className="flex items-center gap-3">
        <Image
          alt={name}
          className="w-15 h-15 rounded-full bg-slate-200 object-cover"
          src={imageSrc || "/placeholder-avatar.png"}
          width={60}
          height={60}
        />

        <div>
          <h2 className="text-sm font-semibold text-black">{name}</h2>

          <span className="inline-block text-slate-700 font-medium text-xs py-0.5 px-2 rounded-full bg-slate-50 border border-slate-200">
            {relation}
          </span>
        </div>
      </div>

      <button
        onClick={onActionClick}
        className="border text-primary-blue cursor-pointer hover:bg-blue-50 border-primary-blue rounded-lg h-10 w-10 flex items-center justify-center"
        aria-label="Family action"
      >
        {actionIcon ?? <RefreshIcon />}
      </button>
    </div>
  );
}
