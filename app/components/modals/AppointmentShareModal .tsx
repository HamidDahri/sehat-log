"use client";
import React, { useState } from "react";
import AppModal from "./AppModal";
import {
  CalendarCheckIcon,
  GmailIcon,
  SMSIcon,
  WhatsappIcon,
} from "@/public/icons";
import ThemeInput from "../ui/input/ThemeInput";
import Dropdown from "../ui/dropdown/ThemeDropDown";
import { docsOptions } from "./AddAppointmentModal";
import CustomCheckbox from "../ui/input/CustomCheckBox";
import ThemeButton from "../ui/buttons/ThemeButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AppointmentShareModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = async () => {
    onConfirm();
  };
  const [doctor, setDoctor] = useState<string | undefined>();

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Record"
      onConfirm={handleConfirm}
      confirmLabel="Share Record"
      cancelLabel="Cancel"
      cancelBtnVarient="outline"
      confirmBtnVarient="secondary"
      size="small"
      confimBtnDisable={false}
      bodyPaddingClasses="p-6"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <ThemeInput
            label="Record Name"
            value="CBC Report – 15 Sept 2025"
            disabled
          />
          <div className="flex items-start gap-4 w-full">
            <div className="w-full">
              <ThemeInput label="Start Date" type="date" />
            </div>
            <div className="w-full">
              <ThemeInput label="Start Time" type="time" />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-full">
              <ThemeInput label="End Date" type="date" />
            </div>
            <div className="w-full">
              <ThemeInput label="End Time" type="time" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <CustomCheckbox
            checked
            direction="flex-row-reverse"
            width="w-full"
            label="Allow Forwarding to Another Specialist"
            onChange={() => {}}
          />
          <CustomCheckbox
            checked
            direction="flex-row-reverse"
            width="w-full"
            label="Allow Doctor to Comment"
            onChange={() => {}}
          />
          <CustomCheckbox
            checked
            direction="flex-row-reverse"
            width="w-full"
            label="Allow Doctor to Sort / Organize Records"
            onChange={() => {}}
          />
          <CustomCheckbox
            checked={false}
            direction="flex-row-reverse"
            width="w-full"
            label="Restrict to Selected Reports Only"
            onChange={() => {}}
          />
          <CustomCheckbox
            checked
            direction="flex-row-reverse"
            width="w-full"
            label="Allow Download"
            onChange={() => {}}
          />
        </div>

        <div>
          <Dropdown
            options={docsOptions}
            value={doctor}
            onChange={setDoctor}
            placeholder="Select Doctor Name"
            label={"Doctor Name"}
          />
        </div>

        <div className="flex items-center w-full gap-3">
          <hr className="flex-1" />
          <h2 className="text-slate-700 text-sm">OR</h2>
          <hr className="flex-1" />
        </div>

        <div className="flex items-center justify-center gap-3">
          <ThemeButton label="Copy Link" variant="outline" type="button" />
          <ThemeButton label="QR Code" variant="outline" type="button" />
          <ThemeButton
            label=""
            variant="outline"
            type="button"
            icon={<WhatsappIcon />}
          />
          <ThemeButton
            label=""
            variant="outline"
            type="button"
            icon={<GmailIcon />}
          />
          <ThemeButton
            label=""
            variant="outline"
            type="button"
            icon={<SMSIcon />}
          />
        </div>
      </div>
    </AppModal>
  );
};

export default AppointmentShareModal;
