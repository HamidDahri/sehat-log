"use client";
import React from "react";
import AppModal, { ModalPosition } from "./AppModal";
import { CalendarIcon2, CrossIcon, TrashIcon } from "@/public/icons";

interface AppointmentCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AppointmentCancelModal: React.FC<AppointmentCancelModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = async () => {
    onConfirm();
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Appointment Details"
      subtitle="Are you sure you want to cancel this appointment?"
      onConfirm={handleConfirm}
      confirmLabel="Yes, Cancel"
      cancelLabel="No, Go Back"
      cancelBtnVarient="outline"
      size="small"
    >
      <h2>Cancel Appointment</h2>
    </AppModal>
  );
};

export default AppointmentCancelModal;
