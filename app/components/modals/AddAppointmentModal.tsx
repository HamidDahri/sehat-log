"use client";

import React, { useState } from "react";
import AppModal, { ModalPosition } from "./AppModal";
import Dropdown from "../ui/dropdown/ThemeDropDown";
import ProblemDropdown, {
  SymptomGroup,
  SymptomItem,
} from "../ui/dropdown/ProblemDropdown";
import ThemeInput from "../ui/input/ThemeInput";
import AppointmentTypePills from "../ui/buttons/AppointmentTypePills";
import ThemeButton from "../ui/buttons/ThemeButton";
import { ClipIcon, CrossIcon, EyeOpenedIcon, UploadIcon } from "@/public/icons";
import UploadArrowIcon from "@/public/icons/UploadArrowIcon";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

type ConfirmPayload = {
  date: string; // "YYYY-MM-DD"
  time: string; // slot.value
  reason?: string;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const langsOptions = [
  { label: "English", value: "english" },
  { label: "German", value: "german" },
  { label: "French", value: "french" },
  { label: "Chinese", value: "chinese" },
  { label: "Hindi", value: "hindi" },
];

export const docsOptions = [
  { label: "Dr ali", value: "ali" },
  { label: "Dr khan", value: "khan" },
  { label: "Dr Asad", value: "Asad" },
  { label: "Dr Hamid", value: "Hamid" },
];
const groups: SymptomGroup[] = [
  {
    label: "Favorites",
    options: [
      { value: "fever", label: "Fever", isFavorite: true },
      { value: "cough", label: "Cough", isFavorite: true },
      { value: "headache", label: "Headache", isFavorite: true },
    ],
  },
  {
    label: "Recently Used",
    options: [
      { value: "fatigue", label: "Fatigue / Weakness" },
      { value: "myalgia", label: "Generalized body aches / Myalgia" },
      { value: "abdominal_pain", label: "Abdominal pain" },
    ],
  },
  {
    label: "All Symptoms",
    options: [
      { value: "sore_throat", label: "Sore throat" },
      { value: "runny_nose", label: "Runny nose / Nasal congestion" },
    ],
  },
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

const AddAppointmentModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = async () => {
    onConfirm();
  };
  const [doctor, setDoctor] = useState<string | undefined>();
  const [clinic, setClinic] = useState<string | undefined>();
  const [selected, setSelected] = React.useState<SymptomItem[]>([
    { value: "fever", label: "Fever", isFavorite: true },
    { value: "abdominal_pain", label: "Abdominal pain" },
  ]);

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Appointment"
      onConfirm={handleConfirm}
      confirmLabel="Confirm"
      cancelLabel="Cancel"
      cancelBtnVarient="outline"
      size="small"
      confimBtnDisable={false}
      position={ModalPosition.RIGHT}
    >
      <div className="space-y-5">
        <Dropdown
          options={docsOptions}
          value={doctor}
          onChange={setDoctor}
          placeholder="Select Doctor Name"
          label={"Doctor Name"}
        />
        <AppointmentTypePills
          options={[
            { value: "clinic", label: "Physical Visit to Clinic" },
            { value: "video", label: "Video Call" },
            { value: "hybrid", label: "Hybrid Consultation" },
          ]}
          defaultValue="clinic"
          onChange={(v) => console.log(v)}
        />

        <Dropdown
          options={langsOptions}
          value={clinic}
          onChange={setClinic}
          placeholder="Select Hospital/Clinic"
          label={"Hospital/Clinic"}
        />

        <ThemeInput label="Appointment Date" onChange={() => {}} type="date" />
        <ThemeInput label="Appointment Date" onChange={() => {}} type="time" />

        <ProblemDropdown
          groups={groups}
          value={selected}
          onChange={setSelected}
          onToggleFavorite={(item, next) => {
            console.log("favorite toggle", item.value, next);
            // Here you can update your groups state in parent.
          }}
        />

        <div className="space-y-1.5">
          <p className=" text-sm font-semibold text-slate-700">
            Attachments{" "}
            <span className="text-slate-500 text-xs font-medium">
              (Optional)
            </span>
          </p>

          <div className="rounded-sm py-2 px-3 border border-slate-200 bg-slate-50">
            <p className="text-[10px] text-slate-700">
              <span className="font-semibold">Note:</span> These attachments are
              only shared with the doctor for this appointment, not permanently
              in their profile.
            </p>
          </div>

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

        <div className="py-2 px-4 rounded-lg border border-slate-200 flex items-center gap-2">
          <span className="text-slate-700  text-base font-medium flex-1">
            Allergy Prescription
          </span>
          <span className="w-9 h-9 rounded-lg hover:bg-slate-50 flex items-center justify-center">
            <EyeOpenedIcon />
          </span>
          <span className="w-9 h-9 rounded-lg hover:bg-slate-50 flex items-center justify-center">
            <CrossIcon fill="#F04438" height="12" width="12" />
          </span>
        </div>
      </div>
    </AppModal>
  );
};

export default AddAppointmentModal;
