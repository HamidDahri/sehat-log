"use client";
import React from "react";
import AppModal, { ModalPosition } from "./AppModal";
import { CalendarIcon2, CrossIcon, TrashIcon } from "@/public/icons";
import { Appointment } from "../Tables/AppointmentTable";

interface AppointmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: Appointment | null;
  onCancel: () => void;
}

type FieldConfig = {
  label: string;
  value?: React.ReactNode;
};

const AppointmentDetailModal: React.FC<AppointmentDetailModalProps> = ({
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

  const getFields = (data: Appointment | null): FieldConfig[] => [
    { label: "Doctor", value: data?.doctor },
    { label: "Specialization", value: data?.specialty },
    { label: "Hospital", value: "SehatCare Clinic" },
    {
      label: "Status",
      value: <StatusBadge status={data?.status} />,
    },
    { label: "Date", value: data?.date },
    { label: "Time", value: data?.time },
    { label: "Problem", value: data?.problem },
    { label: "Booking ID", value: data?.id },
  ];

  const StatusBadge = ({ status }: { status?: Appointment["status"] }) => {
    if (!status) return null;

    const map = {
      Upcoming: "text-warning-600 bg-warning-100",
      Canceled: "text-error-600 bg-error-100",
      Completed: "text-success-600 bg-success-100",
      Missed: "text-slate-600 bg-slate-100",
    };

    return (
      <span
        className={`py-1 px-2 rounded-full font-medium text-xs ${
          map[status] ?? map.Missed
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
      confirmLabel={
        data?.status === "Missed" || data?.status === "Upcoming"
          ? "Reschedule"
          : "Delete"
      }
      hideCancelBtn={data?.status !== "Upcoming"}
      confirmBtnVarient={
        data?.status === "Canceled" || data?.status === "Completed"
          ? "danger"
          : data?.status === "Missed" || data?.status === "Upcoming"
          ? "yellow"
          : "primary"
      }
      position={ModalPosition.RIGHT}
      btnIcon={
        data?.status === "Missed" || data?.status === "Upcoming" ? (
          <CalendarIcon2 />
        ) : (
          <TrashIcon />
        )
      }
      cancelBtnIcon={<CrossIcon width="12" height="12" fill="white" />}
      onCancel={onCancel}
    >
      <div className="space-y-4">
        {getFields(data).map((field) => (
          <div key={field.label} className="w-full flex items-start">
            <span className="text-slate-900 w-full max-w-37.5 min-w-37.5 inline-block font-medium text-base">
              {field.label}:
            </span>

            <span className="text-slate-500 text-base font-normal">
              {field.value ?? "-"}
            </span>
          </div>
        ))}
      </div>
    </AppModal>
  );
};

export default AppointmentDetailModal;
