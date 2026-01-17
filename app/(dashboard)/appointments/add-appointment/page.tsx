"use client";

import React from "react";
import {
  AddAppointmentModal,
  AppointmentConfirmModal,
  DoctorAddCard,
  GroupToggle,
  ThemeButton,
} from "@/app/components";
import { ArrowHeadDownIcon, CrossIcon, SearchIcon } from "@/public/icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import ProblemDropdown, {
  SymptomItem,
} from "@/app/components/ui/dropdown/ProblemDropdown";

type DoctorDTO = {
  id: string;
  name: string;
  code?: string;
  specialization: string;
  clinic: string;
  location: string;
  avatar: string;
  isLiked: boolean;
  visits: number;
  distanceKm: number;
};

const SPECIALIZATIONS = [
  "Gynecologist",
  "Orthopedic Surgeon",
  "Dermatologist",
  "Cardiologist",
];

const LOCATIONS = [
  "G-8, Islamabad",
  "F-10, Islamabad",
  "DHA, Lahore",
  "Gulberg, Lahore",
];

const Page = () => {
  const [tab, setTab] = React.useState("liked");
  const [search, setSearch] = React.useState("");
  const [specialization, setSpecialization] = React.useState(
    "All Specializations",
  );
  const [location, setLocation] = React.useState("All Locations");
  const [showAppointmentModal, setShowAddAppointmentModal] =
    React.useState(false);
  const [showAppointmentConfirmModal, setShowAddAppointmentConfirmModal] =
    React.useState(false);

  const debouncedSearch = useDebouncedValue(search, 450);

  const [loading, setLoading] = React.useState(false);
  const [doctors, setDoctors] = React.useState<DoctorDTO[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const fetchDoctors = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        tab,
        q: debouncedSearch,
        specialization,
        location,
      });

      const res = await fetch(
        `/api/proxy/add-appointment?${params.toString()}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      if (!res.ok) throw new Error(`API error (${res.status})`);

      const json = await res.json();
      setDoctors(json.data ?? []);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }, [tab, debouncedSearch, specialization, location]);

  // ✅ API called when:
  // - search stops typing (debouncedSearch changes)
  // - specialization changes
  // - location changes
  // - tab changes
  React.useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const clearFilters = () => {
    setSearch("");
    setSpecialization("All Specializations");
    setLocation("All Locations");
    // tab left as-is (up to you)
  };

  return (
    <div className="p-4 lg:p-6 w-full lg:pt-26 space-y-5">
      <div className="w-fit">
        <GroupToggle value={tab} onChange={setTab} />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center relative flex-1 max-w-152 min-w-60">
          <input
            placeholder="Search by name, specialization, clinic..."
            className="border border-slate-200 min-w-60 flex-1 focus:ring-slate-300 focus:ring-1 placeholder:text-slate-400 text-slate-900 font-normal text-sm md:text-base outline-none ps-10 rounded-lg py-2.5 px-3.5"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute start-4">
            <SearchIcon />
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Specialization */}
          <Menu>
            <MenuButton className="flex justify-between py-1.5 md:py-2.5 px-2 sm:px-3.5 cursor-pointer whitespace-nowrap bg-white text-slate-900 items-center gap-2 rounded-lg min-w-45 text-sm md:text-base font-normal border border-slate-200 data-hover:bg-slate-50 data-open:bg-slate-50">
              {specialization} <ArrowHeadDownIcon fill="#717680" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="min-w-32 md:min-w-44 z-40 origin-top-right rounded-lg border bg-white shadow p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
              <MenuItem>
                <button
                  onClick={() => setSpecialization("All Specializations")}
                  className="text-slate-700 cursor-pointer hover:bg-gray-100 font-medium w-full py-2 px-2.5 rounded-md text-xs md:text-sm text-start"
                >
                  All Specializations
                </button>
              </MenuItem>

              {SPECIALIZATIONS.map((s) => (
                <MenuItem key={s}>
                  <button
                    onClick={() => setSpecialization(s)}
                    className="text-slate-700 cursor-pointer hover:bg-gray-100 font-medium w-full py-2 px-2.5 rounded-md text-xs md:text-sm text-start"
                  >
                    {s}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>

          {/* Location */}
          <Menu>
            <MenuButton className="flex justify-between py-1.5 md:py-2.5 px-2 sm:px-3.5 cursor-pointer whitespace-nowrap bg-white text-slate-900 items-center gap-2 rounded-lg min-w-45 text-sm md:text-base font-normal border border-slate-200 data-hover:bg-slate-50 data-open:bg-slate-50">
              {location} <ArrowHeadDownIcon fill="#717680" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="min-w-32 md:min-w-44 z-40 origin-top-right rounded-lg border bg-white shadow p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
              <MenuItem>
                <button
                  onClick={() => setLocation("All Locations")}
                  className="text-slate-700 cursor-pointer hover:bg-gray-100 font-medium w-full py-2 px-2.5 rounded-md text-xs md:text-sm text-start"
                >
                  All Locations
                </button>
              </MenuItem>

              {LOCATIONS.map((l) => (
                <MenuItem key={l}>
                  <button
                    onClick={() => setLocation(l)}
                    className="text-slate-700 cursor-pointer hover:bg-gray-100 font-medium w-full py-2 px-2.5 rounded-md text-xs md:text-sm text-start"
                  >
                    {l}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>

          <ThemeButton
            variant="outline"
            label="Clear Filter"
            icon={<CrossIcon />}
            onClick={clearFilters}
            iconDirection="end"
            size="large"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-3xl space-y-3">
          {loading && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
              Loading doctors...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && doctors.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
              No doctors found.
            </div>
          )}

          {!loading &&
            !error &&
            doctors.map((d) => (
              <DoctorAddCard
                key={d.id}
                id={d.id}
                name={d.name}
                code={d.code}
                specialization={d.specialization}
                clinic={d.clinic}
                location={d.location}
                isLiked={d.isLiked}
                actionLabel={tab === "liked" ? "Add Doctor" : "Select"}
                onActionClick={(id) => {
                  if (tab === "liked") {
                    console.log("Action", id);
                  } else {
                    setShowAddAppointmentModal(true);
                  }
                }}
                onLikeToggle={(id, liked) => console.log("Liked:", id, liked)}
              />
            ))}
        </div>
      </div>

      <AddAppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAddAppointmentModal(true)}
        onConfirm={() => setShowAddAppointmentConfirmModal(true)}
      />

      <AppointmentConfirmModal
        isOpen={showAppointmentConfirmModal}
        onClose={() => {
          setShowAddAppointmentConfirmModal(false);
        }}
        onConfirm={() => {
          setShowAddAppointmentModal(false);
          setShowAddAppointmentConfirmModal(false);
        }}
      />

      <h2>share remains</h2>
    </div>
  );
};

export default Page;
