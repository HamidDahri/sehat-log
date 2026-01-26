"use client";

import React, { useState } from "react";
import AppModal, { ModalPosition } from "./AppModal";
import Dropdown from "../ui/dropdown/ThemeDropDown";
import ThemeInput from "../ui/input/ThemeInput";
import ThemeButton from "../ui/buttons/ThemeButton";
import { CheckIcon, ClipIcon, CrossIcon } from "@/public/icons";
import UploadArrowIcon from "@/public/icons/UploadArrowIcon";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ThemeTextarea from "../ui/input/ThemeTextarea";
import TestResultsTable, { TestResultRow } from "../Tables/TestResultsTable";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const reportStatusOptions = [
  { label: "Available", value: "available" },
  { label: "Reviewed", value: "reviewed" },
  { label: "Pending", value: "pending" },
];

const orderStatuses = [
  { label: "Reports", value: "Reports" },
  {
    label: "Prescriptions",
    value: "Prescriptions",
  },
  { label: "Vaccination", value: "Vaccination" },
  { label: "Diseases", value: "Diseases" },
  { label: "Gallery", value: "Gallery" },
];

const AddPrescriptionModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = async () => {
    onConfirm();
  };
  const [clinic, setClinic] = useState<string | undefined>();

  const [notes, setNotes] = useState("");

  const [rows, setRows] = useState<TestResultRow[]>([
    {
      id: crypto.randomUUID(),
      parameter: "",
      result: "",
      normalRange: "",
    },
  ]);

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Appointment"
      onConfirm={handleConfirm}
      confirmLabel="Submit"
      cancelLabel="Cancel"
      cancelBtnVarient="outline"
      size="small"
      confimBtnDisable={false}
      position={ModalPosition.RIGHT}
      cancelBtnIcon={<CrossIcon />}
      btnIcon={<CheckIcon fill="white" />}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <ThemeInput
            label="Name:"
            placeholder="Enter Report Name"
            onChange={() => {}}
            type="text"
          />
          <ThemeInput
            label="Lab:"
            placeholder="Enter Lab:"
            onChange={() => {}}
            type="text"
          />

          <ThemeInput
            label="Doctor"
            onChange={() => {}}
            type="text"
            placeholder="Enter Doctor Name"
          />
          <ThemeInput label="Date" onChange={() => {}} type="date" />
          <ThemeInput label="Time" onChange={() => {}} type="time" />

          <Dropdown
            options={reportStatusOptions}
            value={clinic}
            onChange={setClinic}
            placeholder="Select Your Report status"
            label={"Status"}
          />
        </div>
        <ThemeTextarea
          title="Notes"
          placeholder="Additional Notes"
          value={notes}
          onChange={setNotes}
        />
        <TestResultsTable mode="edit" rows={rows} onChange={setRows} />;
        <div className="space-y-1.5">
          <p className=" text-sm font-semibold text-slate-700">
            Attachments{" "}
            <span className="text-slate-500 text-xs font-medium">
              (Optional)
            </span>
          </p>

          <div className="flex items-center gap-2">
            <div>
              <Menu>
                <MenuButton className="flex justify-between py-1.5 md:py-2 px-2 sm:px-3.5 cursor-pointer whitespace-nowrap bg-white text-slate-900 items-center gap-2 rounded-lg font-semibold text-sm md:text-base border border-slate-200  focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-slate-50 data-open:bg-slate-50">
                  <ClipIcon /> Attach File
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom start"
                  className={`min-w-32 md:min-w-44  z-400 origin-top-right rounded-lg border bg-white shadow p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0`}
                >
                  {orderStatuses.map((status) => (
                    <MenuItem key={status.label}>
                      <button
                        onClick={() => {}}
                        className={`flex items-center cursor-pointer font-medium gap-2 rounded-md text-slate-700 text-xs md:text-sm py-2 px-2.5 hover:bg-gray-100 w-full`}
                      >
                        {status.label}
                      </button>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
            <div>
              <ThemeButton
                label="Upload From Desktop"
                icon={<UploadArrowIcon />}
                variant="outline"
              />
            </div>
          </div>
        </div>
      </div>
    </AppModal>
  );
};

export default AddPrescriptionModal;
