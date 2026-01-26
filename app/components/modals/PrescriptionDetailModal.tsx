"use client";
import React from "react";
import AppModal, { ModalPosition } from "./AppModal";
import { DownloadFilledIcon, TrashIcon } from "@/public/icons";
import { Report } from "../Tables/ReportTable";
import AttachedFileCard from "../Dashboard/AttachedFileCard";
import TestResultsTable from "../Tables/TestResultsTable";
import { Prescription } from "../Tables/PrescriptionTable";
import MedicineResultsTable from "../Tables/MedicineResultsTable";

interface PrescriptionDetailModallProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: Prescription | null;
  onCancel: () => void;
}

type FieldConfig = {
  label: string;
  value?: React.ReactNode;
};

const PrescriptionDetailModal: React.FC<PrescriptionDetailModallProps> = ({
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

  const getFields = (data: Prescription | null): FieldConfig[] => [
    { label: "Prescription:", value: data?.prescriptions },
    { label: "Doctor:", value: data?.doctor },
    { label: "Hospital:", value: data?.clinic },
    { label: "Issued Date::", value: data?.visitDate },
    { label: "Expires On::", value: data?.expireDate },
    {
      label: "Status:",
      value: <StatusBadge status={data?.status} />,
    },

    { label: "Time:", value: data?.expireDate },
    { label: "Doctor Notes:", value: data?.disease },
  ];

  const StatusBadge = ({ status }: { status?: Prescription["status"] }) => {
    if (!status) return null;

    const map = {
      Expired: "text-slate-600 bg-slate-100",
      Ongoing: "text-success-600 bg-success-100",
    };

    return (
      <span
        className={`py-1 px-2 rounded-full font-medium text-xs ${
          map[status] ?? map.Expired
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Appointment Details"
      onConfirm={handleConfirm}
      confirmLabel={"Download Prescription"}
      cancelLabel="Delete Prescription"
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

        <MedicineResultsTable
          mode="view"
          rows={[
            {
              id: "1",
              medicine: "Metformin 500mg",
              dosage: "1 tablet, twice daily",
              duration: "30 days",
              notes: "After meals",
            },
            {
              id: "2",
              medicine: "Insulin 10 units",
              dosage: "Before breakfast",
              duration: "30 days",
              notes: "Refrigerate",
            },
          ]}
        />

        <AttachedFileCard
          fileName="Diabetes_Guide.pdf"
          fileSize="180 KB"
          onDownload={() => console.log("download")}
          onPreview={() => console.log("preview")}
        />
      </div>
    </AppModal>
  );
};

export default PrescriptionDetailModal;
