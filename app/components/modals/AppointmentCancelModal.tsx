"use client";
import React, { useMemo, useState } from "react";
import AppModal from "./AppModal";

const OTHER_REASON = "Other reason";

const CANCEL_REASONS = [
  "I'm feeling better now",
  "I found another doctor",
  "Personal emergency",
  "Travel or work commitments",
  "Booked by mistake",
  "Doctor’s availability conflict",
  "I need more tests before this visit",
  "I need to reschedule",
  "Issue resolved on its own",
  OTHER_REASON,
];

interface AppointmentCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedReasonsCsv: string) => void;
  selectionMode?: "single" | "multiple";
}

const AppointmentCancelModal: React.FC<AppointmentCancelModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectionMode = "multiple",
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");

  const hasOther = selected.includes(OTHER_REASON);
  const hasAnyNonOther = selected.some((r) => r !== OTHER_REASON);

  const toggleReason = (reason: string) => {
    setSelected((prev) => {
      const isSelected = prev.includes(reason);

      if (isSelected) {
        const next = prev.filter((r) => r !== reason);
        if (reason === OTHER_REASON) setOtherText(""); // clear when "Other reason" is removed
        return next;
      }

      // select
      if (reason === OTHER_REASON) {
        // selecting Other => clear all others (and then only Other stays)
        return [OTHER_REASON];
      }

      // selecting any non-other:
      if (selectionMode === "single") return [reason];

      // multiple mode: add it, but ensure "Other reason" is not selected
      return prev.filter((r) => r !== OTHER_REASON).concat(reason);
    });
  };

  const selectedCsv = useMemo(() => {
    if (selected.length === 0) return "";

    const mapped = selected.map((r) => {
      if (r !== OTHER_REASON) return r;
      const text = otherText.trim();
      return text ? `Other reason: ${text}` : OTHER_REASON;
    });

    return mapped.join(", ");
  }, [selected, otherText]);

  const confirmDisabled =
    selected.length === 0 || (hasOther && otherText.trim().length === 0); // require textarea when Other is selected (optional rule)

  const handleConfirm = async () => {
    onConfirm(selectedCsv);
    setSelected([]);
    setOtherText("");
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel Appointment"
      subtitle="Are you sure you want to cancel this appointment?"
      onConfirm={handleConfirm}
      confirmLabel="Yes, Cancel"
      cancelLabel="No, Go Back"
      cancelBtnVarient="outline"
      size="small"
      confimBtnDisable={confirmDisabled}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {CANCEL_REASONS.map((reason) => {
            const active = selected.includes(reason);

            // disabling rules:
            const disabled =
              (hasOther && reason !== OTHER_REASON) || // Other selected => disable all others
              (hasAnyNonOther && reason === OTHER_REASON); // any other selected => disable Other

            return (
              <button
                key={reason}
                type="button"
                onClick={() => toggleReason(reason)}
                disabled={disabled && !active} // allow click if it's active (so user can deselect)
                className={[
                  "rounded-lg border px-3 py-2 text-sm font-medium transition",
                  "focus:outline-none focus:ring-2 focus:ring-black/10",
                  active
                    ? "border-neutral-500 bg-neutral-500 text-white"
                    : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                  disabled && !active
                    ? "opacity-40 cursor-not-allowed hover:bg-white"
                    : "",
                ].join(" ")}
                aria-pressed={active}
              >
                {reason}
              </button>
            );
          })}
        </div>

        {/* Textarea shown only if Other reason is selected */}
        {hasOther && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Please describe your reason
            </label>
            <textarea
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-gray-200 resize-none p-3 text-sm outline-none focus:border-slate-500 text-gray-900"
              placeholder="Type your reason here..."
            />
          </div>
        )}
      </div>
    </AppModal>
  );
};

export default AppointmentCancelModal;
