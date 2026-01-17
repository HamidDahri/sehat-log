"use client";

import React, { useEffect, useMemo, useState } from "react";
import AppModal from "./AppModal";
import { RadioChecked, RadioUnchecked } from "@/public/icons";

type Slot = {
  id: string;
  label: string; // e.g. "10:00 AM"
  value: string; // e.g. "10:00"
  disabled?: boolean;
};

type ConfirmPayload = {
  date: string; // "YYYY-MM-DD"
  time: string; // slot.value
  reason?: string;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: ConfirmPayload) => void;
  getAvailableSlots?: (date: string) => Promise<Slot[]> | Slot[];
}

const DEFAULT_SLOTS: Slot[] = [
  { id: "s1", label: "10:00 AM", value: "10:00" },
  { id: "s2", label: "11:30 AM", value: "11:30" },
  { id: "s3", label: "2:00 PM", value: "14:00" },
  { id: "s4", label: "4:00 PM", value: "16:00" },
];

function SlotPill({
  label,
  checked,
  disabled,
  onSelect,
}: {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={[
        "inline-flex items-center gap-2 rounded-full text-slate-700 text-sm font-medium transition",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:bg-gray-50 active:scale-[0.99]",
        checked ? "border-blue-600 " : "border-gray-200 ",
      ].join(" ")}
    >
      <span className={" rounded-full flex items-center justify-center"}>
        {checked ? <RadioChecked /> : <RadioUnchecked />}
      </span>
      {label}
    </button>
  );
}

const AppointmentRescheduleModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  getAvailableSlots,
}) => {
  const [date, setDate] = useState<string>(""); // YYYY-MM-DD
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>(""); // slot.value
  const [reason, setReason] = useState<string>("");

  // Reset when modal opens/closes (optional but usually expected)
  useEffect(() => {
    if (!isOpen) return;
    setDate("");
    setSlots([]);
    setSelectedSlot("");
    setReason("");
    setLoadingSlots(false);
  }, [isOpen]);

  // Load slots after date selected
  useEffect(() => {
    let alive = true;

    const load = async () => {
      if (!date) {
        setSlots([]);
        setSelectedSlot("");
        return;
      }

      setLoadingSlots(true);
      try {
        const res = getAvailableSlots
          ? await getAvailableSlots(date)
          : DEFAULT_SLOTS;

        if (!alive) return;

        setSlots(res);
        // If currently selected slot is not in new slots, clear it
        if (!res.some((s) => s.value === selectedSlot && !s.disabled)) {
          setSelectedSlot("");
        }
      } finally {
        if (alive) setLoadingSlots(false);
      }
    };

    load();

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const canConfirm = useMemo(() => {
    return Boolean(date && selectedSlot);
  }, [date, selectedSlot]);

  const handleConfirm = async () => {
    if (!canConfirm) return;
    onConfirm({
      date,
      time: selectedSlot,
      reason: reason.trim() ? reason.trim() : undefined,
    });
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title="Reschedule Appointment"
      onConfirm={handleConfirm}
      confirmLabel="Confirm"
      cancelLabel="Cancel"
      cancelBtnVarient="outline"
      size="small"
      confimBtnDisable={!canConfirm}
    >
      <div className="space-y-4">
        {/* Date */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Date</label>

          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 placeholder:text-slate-600 text-slate-900 bg-white px-3 py-2.5  text-sm outline-none focus:border-slate-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Time slots */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-slate-700 mb-1.5 inline-block">
            Time
          </label>

          {!date ? (
            <p className="text-sm text-gray-400">--</p>
          ) : loadingSlots ? (
            <p className="text-sm text-gray-500">Loading slots…</p>
          ) : slots.length === 0 ? (
            <p className="text-sm text-gray-500">No slots available.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {slots.map((s) => (
                <SlotPill
                  key={s.id}
                  label={s.label}
                  checked={selectedSlot === s.value}
                  disabled={s.disabled}
                  onSelect={() => setSelectedSlot(s.value)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Reason */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Note <span className="font-normal text-slate-700">(optional)</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for rescheduling..."
            rows={3}
            className="w-full resize-none rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-500 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </AppModal>
  );
};

export default AppointmentRescheduleModal;
