"use client";
import React from "react";
import AppModal, { ModalPosition } from "./AppModal";
import { DownloadFilledIcon, TrashIcon } from "@/public/icons";
import { Hospital } from "../Tables/HospitalTable";
import AttachedFileCard from "../Dashboard/AttachedFileCard";
import TestResultsTable from "../Tables/TestResultsTable";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: Hospital | null;
  onCancel: () => void;
}

type FieldConfig = {
  label: string;
  value?: React.ReactNode;
};

const HospitalDetailModal: React.FC<DetailModalProps> = ({
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

  const getFields = (data: Hospital | null): FieldConfig[] => [
    { label: "Hospital/Clinic:", value: data?.hospital },
    { label: "Admission Date", value: data?.admissionDate },
    { label: "Discharge Date:", value: data?.dischargeDate },
    { label: "Reason for Visit:", value: data?.reason },
    { label: "Doctor Notes:", value: data?.notes },
    { label: "Doctor:", value: data?.doctor },
    { label: "Hospital Type:", value: data?.hospitalType },
    { label: "Room/Ward:", value: data?.roomWard },
  ];

  return (
    <AppModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Hospitals Details"
      onConfirm={handleConfirm}
      confirmLabel={"Download Hospital"}
      cancelLabel="Edit Details"
      confirmBtnVarient={"primary"}
      position={ModalPosition.RIGHT}
      btnIcon={<DownloadFilledIcon />}
      cancelBtnIcon={<TrashIcon fill="currentColor" />}
      onCancel={onCancel}
      cancelBtnVarient="primaryOutline"
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
          fileName="Discharge_Summary.pdf"
          fileSize="180 KB"
          onDownload={() => console.log("download")}
          onPreview={() => console.log("preview")}
        />
      </div>
    </AppModal>
  );
};

export default HospitalDetailModal;
