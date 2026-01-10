import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { EyeOpenedIcon } from "@/public/icons";

type DoctorCardProps = {
  className?: string;

  name: string;
  registrationNo?: string;

  specialization: string;
  clinic: string;
  location: string;

  imageSrc?: StaticImageData | string;

  onViewClick?: () => void;
  viewIcon?: ReactNode;
};

export default function DoctorCard({
  className = "",

  name,
  registrationNo,

  specialization,
  clinic,
  location,

  imageSrc,
  onViewClick,
  viewIcon,
}: DoctorCardProps) {
  return (
    <div
      className={`bg-white py-2 px-5 flex items-center gap-3 rounded-lg drop-shadow ${className}`}
    >
      <Image
        alt={name}
        className="w-15 h-15 rounded-full bg-slate-200 object-cover"
        src={imageSrc || "/placeholder-avatar.png"}
        width={60}
        height={60}
      />

      <div className="flex-1 flex flex-col gap-1">
        <div className="w-full flex items-center justify-between gap-4">
          <span className="text-black text-sm font-semibold w-full">
            {name}
            {registrationNo && (
              <span className="text-xs font-normal"> ({registrationNo})</span>
            )}
          </span>

          <div className="text-slate-800 text-xs w-full">
            <span className="font-semibold">Specialization: </span>
            <span className="font-normal">{specialization}</span>
          </div>
        </div>

        <div className="w-full flex items-center justify-between gap-4">
          <div className="text-slate-800 text-xs w-full">
            <span className="font-semibold">Clinic: </span>
            <span className="font-normal">{clinic}</span>
          </div>

          <div className="text-slate-800 text-xs w-full">
            <span className="font-semibold">Location: </span>
            <span className="font-normal">{location}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onViewClick}
        className="border text-primary-blue cursor-pointer hover:bg-blue-50 border-primary-blue rounded-lg h-10 w-10 flex items-center justify-center"
        aria-label="View doctor details"
      >
        {viewIcon ?? <EyeOpenedIcon fill="currentColor" />}
      </button>
    </div>
  );
}
