"use client";
import React from "react";
import AppModal from "./AppModal";
import { CalendarCheckIcon } from "@/public/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AppointmentConfirmModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = async () => {
    onConfirm();
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Booking"
      onConfirm={handleConfirm}
      confirmLabel="Confirm & Book"
      cancelLabel="Not, Now"
      cancelBtnVarient="outline"
      size="small"
      confimBtnDisable={false}
      bodyPaddingClasses="p-6"
      mainIcon={<CalendarCheckIcon />}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-slate-900 text-base font-normal inline-flex">
            Doctor
          </span>
          <span className="text-slate-900 font-semibold text-base">
            Dr. Irum (20358)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-900 text-base font-normal inline-flex">
            Type
          </span>
          <span className="text-slate-900 font-semibold text-base">
            Physical Visit to Clinic
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-900 text-base font-normal inline-flex">
            Date/Time
          </span>
          <span className="text-slate-900 font-semibold text-base">
            24 Aug, 12:00 PM
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-900 text-base font-normal inline-flex">
            Hospital
          </span>
          <span className="text-slate-900 font-semibold text-base">
            SehatCare Clinic
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-900 text-base font-normal inline-flex">
            Reason
          </span>
          <span className="text-slate-900 font-semibold text-base">
            Flu Allergy
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-900 text-base font-normal inline-flex">
            Attached Files
          </span>
          <span className="text-slate-900 font-semibold text-base">
            2 Prescriptions, 1 Lab Report
          </span>
        </div>
      </div>
    </AppModal>
  );
};

export default AppointmentConfirmModal;
