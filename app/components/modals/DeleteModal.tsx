"use client";
import React from "react";
import AppModal from "./AppModal";
import { TrashIcon } from "@/public/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const handleConfirm = async () => {
    onConfirm();
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Report"
      onConfirm={handleConfirm}
      confirmLabel="Yes, Delete"
      cancelLabel="Not, Now"
      cancelBtnVarient="outline"
      confirmBtnVarient="danger"
      size="small"
      confimBtnDisable={false}
      bodyPaddingClasses="p-6"
      mainIcon={<TrashIcon fill="red" height="28" width="28" />}
      mainIconBg="bg-error-100"
    >
      <p className="text-slate-900 text-base text-center font-normal -mt-2">
        Are you sure you want to delete this report? It will be moved to your
        Archives and you can restore it later if needed.
      </p>
    </AppModal>
  );
};

export default DeleteModal;
