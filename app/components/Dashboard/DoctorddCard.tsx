"use client";

import { Images } from "@/app/ui/images";
import { BookmarkFilledIcon, BookmarkIcon } from "@/public/icons";
import Image from "next/image";
import { useState } from "react";

type DoctorCardProps = {
  id: string;
  name: string;
  code?: string;
  specialization: string;
  clinic: string;
  location: string;
  isLiked?: boolean;
  actionLabel: string; // "Add Doctor" | "Select"
  onActionClick: (id: string) => void;
  onLikeToggle?: (id: string, liked: boolean) => void;
};

export default function DoctorAddCard({
  id,
  name,
  code,
  specialization,
  clinic,
  location,
  isLiked = false,
  actionLabel,
  onActionClick,
  onLikeToggle,
}: DoctorCardProps) {
  const [liked, setLiked] = useState(isLiked);

  const toggleLike = () => {
    const next = !liked;
    setLiked(next);
    onLikeToggle?.(id, next);
  };

  return (
    <div className="flex items-end justify-between gap-5 relative rounded-lg border border-slate-200 bg-white p-3">
      <button
        onClick={toggleLike}
        className="absolute end-4 top-4 cursor-pointer"
        aria-label="Toggle Like"
      >
        {liked ? <BookmarkFilledIcon /> : <BookmarkIcon />}
      </button>

      <div className="flex items-center flex-1 gap-5">
        <Image
          src={Images.dashboard.userImage}
          alt={name}
          width={86}
          height={86}
          className="rounded-full object-cover"
        />

        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-black">
            {name}
            {code && (
              <span className="ml-1 text-xs font-normal text-black">
                ({code})
              </span>
            )}
          </h4>

          <p className="text-xs text-slate-800">
            <span className="font-semibold ">Specialization:</span>{" "}
            <span className="font-normal">{specialization}</span>
          </p>

          <p className="text-xs text-slate-800">
            <span className="font-semibold">Clinic:</span>{" "}
            <span className="font-normal">{clinic}</span>
          </p>

          <p className="text-xs text-slate-800">
            <span className="font-semibold">Location:</span>{" "}
            <span className="font-normal">{location}</span>
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between  flex-col h-full">
        <button
          onClick={() => onActionClick(id)}
          className={`rounded-md px-3 py-1.5 text-xs cursor-pointer font-medium transition ${
            actionLabel === "Add Doctor"
              ? "border border-primary-green text-primary-green hover:bg-green-50"
              : "border border-primary-blue text-primary-blue hover:bg-blue-50"
          }`}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
