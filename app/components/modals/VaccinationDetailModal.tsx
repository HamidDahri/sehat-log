"use client";
import React from "react";
import AppModal, { ModalPosition } from "./AppModal";
import { DownloadFilledIcon, TrashIcon } from "@/public/icons";
import { Vaccination } from "../Tables/VaccinationTable";
import AttachedFileCard from "../Dashboard/AttachedFileCard";
import TestResultsTable from "../Tables/TestResultsTable";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: Vaccination | null;
  onCancel: () => void;
}

type FieldConfig = {
  label: string;
  value?: React.ReactNode;
};

const VaccinationDetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  data,
}) => {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = async () => {
    onConfirm();
  };

  const getFields = (data: Vaccination | null): FieldConfig[] => [
    { label: "Vaccine Name:", value: data?.vaccineName },
  ];

  return (
    <AppModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Vaccinations Details"
      onConfirm={handleConfirm}
      confirmLabel={"Download Vaccine"}
      cancelLabel="Remove Vaccine"
      confirmBtnVarient={"primary"}
      position={ModalPosition.RIGHT}
      btnIcon={<DownloadFilledIcon />}
      cancelBtnIcon={<TrashIcon fill="currentColor" />}
      onCancel={onCancel}
      cancelBtnVarient="dangerOutline"
    >
      <div className="space-y-4">
        {getFields(data).map((field) => (
          <div key={field.label} className="w-full flex items-start">
            <span className="text-slate-900 w-full max-w-37.5 min-w-37.5 inline-block font-medium text-base">
              {field.label}
            </span>

            <span className="text-slate-500 text-base font-normal">
              {field.value ?? "-"}
            </span>
          </div>
        ))}

        <AttachedFileCard
          fileName="Vaccination Certificate.pdf"
          fileSize="180 KB"
          onDownload={() => console.log("download")}
          onPreview={() => console.log("preview")}
        />
      </div>
    </AppModal>
  );
};

export default VaccinationDetailModal;
