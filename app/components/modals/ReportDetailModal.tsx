"use client";
import React from "react";
import AppModal, { ModalPosition } from "./AppModal";
import {
  CalendarIcon2,
  CrossIcon,
  DownloadFilledIcon,
  DownloadIcon,
  TrashIcon,
} from "@/public/icons";
import { Report } from "../Tables/ReportTable";
import AttachedFileCard from "../Dashboard/AttachedFileCard";
import TestResultsTable from "../Tables/TestResultsTable";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: Report | null;
  onCancel: () => void;
}

type FieldConfig = {
  label: string;
  value?: React.ReactNode;
};

const ReportDetailModal: React.FC<DetailModalProps> = ({
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

  const getFields = (data: Report | null): FieldConfig[] => [
    { label: "Name:", value: data?.reportName },
    { label: "Lab:", value: data?.lab },
    { label: "Doctor:", value: data?.doctor },
    { label: "Date:", value: data?.date },
    { label: "Time:", value: data?.time },
    {
      label: "Status:",
      value: <StatusBadge status={data?.status} />,
    },

    { label: "Description:", value: data?.analysis },
  ];

  const StatusBadge = ({ status }: { status?: Report["status"] }) => {
    if (!status) return null;

    const map = {
      Reviewed: "text-warning-600 bg-warning-100",
      Pending: "text-error-600 bg-error-100",
      Available: "text-success-600 bg-success-100",
    };

    return (
      <span
        className={`py-1 px-2 rounded-full font-medium text-xs ${
          map[status] ?? map.Pending
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
      confirmLabel={"Download Report"}
      cancelLabel="Delete Report"
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

        <TestResultsTable
          mode="view"
          rows={[
            {
              id: "1",
              parameter: "WBC Count",
              result: "16.3 ×10³/µL",
              normalRange: "4.5–11 ×10³/µL",
            },
            {
              id: "2",
              parameter: "RBC Count",
              result: "4.17 ×10⁶/µL",
              normalRange: "4.2–5.9 ×10⁶/µL",
            },
            {
              id: "3",
              parameter: "Haemoglobin",
              result: "11.8 g/dL",
              normalRange: "13.5–17.5 g/dL",
            },
            {
              id: "4",
              parameter: "Hematocrit",
              result: "35%",
              normalRange: "38–50%",
            },
          ]}
        />

        <AttachedFileCard
          fileName="CBC_Report.pdf"
          fileSize="180 KB"
          onDownload={() => console.log("download")}
          onPreview={() => console.log("preview")}
        />
      </div>
    </AppModal>
  );
};

export default ReportDetailModal;
