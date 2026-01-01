"use client";

import { IdIcon } from "@/public/icons";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ThemeButton from "../ui/buttons/ThemeButton";

type ImgState = {
  file: File | null;
  previewUrl: string | null;
  error?: string;
};

const ACCEPTED_MIME = ["image/png", "image/jpeg", "image/jpg"];
const ACCEPT_ATTR = "image/png,image/jpeg,image/jpg";

const IdVerificationUpload = () => {
  const [front, setFront] = useState<ImgState>({
    file: null,
    previewUrl: null,
  });
  const [back, setBack] = useState<ImgState>({ file: null, previewUrl: null });

  const frontInputRef = useRef<HTMLInputElement | null>(null);
  const backInputRef = useRef<HTMLInputElement | null>(null);

  const canVerify = useMemo(
    () => !!front.file && !!back.file,
    [front.file, back.file]
  );

  useEffect(() => {
    return () => {
      if (front.previewUrl) URL.revokeObjectURL(front.previewUrl);
      if (back.previewUrl) URL.revokeObjectURL(back.previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateFile = (file: File) => {
    const isAllowed = ACCEPTED_MIME.includes(file.type);
    if (!isAllowed) return "Only PNG, JPG, or JPEG images are allowed.";
    return "";
  };

  const setFile = useCallback(
    (side: "front" | "back", file: File | null) => {
      if (!file) return;

      const err = validateFile(file);
      if (side === "front") {
        if (front.previewUrl) URL.revokeObjectURL(front.previewUrl);
        if (err) return setFront((p) => ({ ...p, error: err }));
        setFront({ file, previewUrl: URL.createObjectURL(file), error: "" });
      } else {
        if (back.previewUrl) URL.revokeObjectURL(back.previewUrl);
        if (err) return setBack((p) => ({ ...p, error: err }));
        setBack({ file, previewUrl: URL.createObjectURL(file), error: "" });
      }
    },
    [front.previewUrl, back.previewUrl]
  );

  const onPick = (side: "front" | "back") => {
    if (side === "front") frontInputRef.current?.click();
    else backInputRef.current?.click();
  };

  const onInputChange = (
    side: "front" | "back",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) setFile(side, file);
    e.target.value = "";
  };

  const handleDrop = (
    side: "front" | "back",
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0] || null;
    if (file) setFile(side, file);
  };

  const prevent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const remove = (side: "front" | "back") => {
    if (side === "front") {
      if (front.previewUrl) URL.revokeObjectURL(front.previewUrl);
      setFront({ file: null, previewUrl: null, error: "" });
    } else {
      if (back.previewUrl) URL.revokeObjectURL(back.previewUrl);
      setBack({ file: null, previewUrl: null, error: "" });
    }
  };

  const verify = async () => {
    if (!canVerify) return;

    const fd = new FormData();
    fd.append("front", front.file!);
    fd.append("back", back.file!);

    console.log("Verify payload:", {
      front: front.file?.name,
      back: back.file?.name,
      frontInfo: front,
      backInfo: back,
    });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UploadCard
          title="Front Side of ID"
          state={front}
          onPick={() => onPick("front")}
          onDrop={(e) => handleDrop("front", e)}
          onDragOver={prevent}
          onDragEnter={prevent}
          onDragLeave={prevent}
          onRemove={() => remove("front")}
        />

        <UploadCard
          title="Back Side of ID"
          state={back}
          onPick={() => onPick("back")}
          onDrop={(e) => handleDrop("back", e)}
          onDragOver={prevent}
          onDragEnter={prevent}
          onDragLeave={prevent}
          onRemove={() => remove("back")}
        />
      </div>

      <input
        ref={frontInputRef}
        type="file"
        accept={ACCEPT_ATTR}
        className="hidden"
        onChange={(e) => onInputChange("front", e)}
      />
      <input
        ref={backInputRef}
        type="file"
        accept={ACCEPT_ATTR}
        className="hidden"
        onChange={(e) => onInputChange("back", e)}
      />

      <div className="flex items-center w-full justify-end gap-3 mt-6">
        <div className="min-w-40">
          <ThemeButton
            label="Varify"
            type="button"
            disabled={!canVerify}
            onClick={verify}
          />
        </div>

        <div className="min-w-40">
          <ThemeButton
            label="Go To Home"
            type="button"
            onClick={() => (window.location.href = "/")}
            variant="primaryOutline"
          />
        </div>
      </div>
    </div>
  );
};

export default IdVerificationUpload;

/** ---------- UI Card ---------- */

function UploadCard({
  title,
  state,
  onPick,
  onDrop,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onRemove,
}: {
  title: string;
  state: ImgState;
  onPick: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onRemove: () => void;
}) {
  const hasImg = !!state.previewUrl;

  return (
    <div
      className="relative rounded-xl border-2 border-dashed border-slate-200 bg-slate-100 overflow-hidden"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      {/* Preview */}
      {hasImg ? (
        <div className="h-50 md:h-80 w-full bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={state.previewUrl!}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={onPick}
          className="w-full h-50 md:h-80 flex flex-col cursor-pointer items-center justify-center gap-2 p-6 text-center"
        >
          <IdIcon />
          <div className="text-base font-semibold text-black">{title}</div>
          <div className="text-sm text-black">
            <span className="font-semibold">Click</span> to upload or drag &
            drop
          </div>
        </button>
      )}
      {hasImg && (
        <button
          type="button"
          onClick={onPick}
          className="absolute inset-0"
          aria-label="Change image"
          title="Click to change image"
        />
      )}

      {hasImg && (
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="bg-white/90 hover:bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 h-8 rounded-md shadow-sm"
          >
            Remove
          </button>
        </div>
      )}

      {/* Error */}
      {!!state.error && (
        <div className="px-4 py-2 text-xs text-red-600 bg-red-50 border-t border-red-100">
          {state.error}
        </div>
      )}
    </div>
  );
}
