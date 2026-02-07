"use client";
import {
  AddHospitalModal,
  AppointmentShareModal,
  DashboardCard,
  DashboardEmptyState,
  DeleteModal,
  HospitalDetailModal,
  HospitalsCard,
  HospitalsTable,
  SegmentedViewToggle,
  ThemeButton,
} from "@/app/components";
import { getPaginationRange } from "@/app/components/Tables/AppointmentTable";
import { Hospital } from "@/app/components/Tables/HospitalTable";
import DateRangeFilter, {
  DateRangeValue,
} from "@/app/components/ui/DateRangeFilter";
import { Images } from "@/app/ui/images";
import {
  ArchiveDashIcon,
  ArrowHeadDownIcon,
  ArrowIcon,
  CloudCheckIcon,
  CrossIcon,
  DownloadFilledIcon,
  HospitalDashIcon,
  HospitalEmpty,
  PendingIcon,
  PlusIcon,
  SearchIcon,
} from "@/public/icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { SortingState } from "@tanstack/react-table";
import { endOfDay, formatISO, startOfDay } from "date-fns";

import { useEffect, useMemo, useState } from "react";

const dashboardCards = [
  {
    value: 15,
    label: "Total Hospitals",
    icon: <HospitalDashIcon />,
    illustration: Images.dashboard.dashCardIllu,

    gradientClass: "from-butterfly-blue to-jordy-blue",
    shadowColor: "#74C5EB",
  },
  {
    value: 12,
    label: "Verified Hospitals",
    icon: <CloudCheckIcon />,
    illustration: Images.dashboard.dashCardIllu,
    gradientClass: "from-emerald-500 to-emerald-400",
    shadowColor: "#34D399",
  },
  {
    value: 4,
    label: "Pending Verification",
    icon: <PendingIcon />,
    illustration: Images.dashboard.dashCardIllu,
    gradientClass: "from-amber-500 to-amber-400",
    shadowColor: "#FBBF24",
  },
  {
    value: 3,
    label: "Archived Hospitals",
    icon: <ArchiveDashIcon />,
    illustration: Images.dashboard.dashCardIllu,
    gradientClass: "from-red-500 to-red-400",
    shadowColor: "#F87171",
  },
];

type StatusFilter = "All" | Hospital["status"];

type labFilter =
  | "All Hospital"
  | "Excel Medical & Diagnostics"
  | "Maroof International Hospital"
  | "Shifa Care Clinic";

const Page = () => {
  const [data, setData] = useState<Hospital[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"list" | "board">("list");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Hospital>();
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  // parent owns search
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // parent owns pagination + sorting
  const [pageIndex, setPageIndex] = useState(0);
  const DEFAULT_LIST_SIZE = 10;
  const DEFAULT_BOARD_SIZE = 12;

  const [pageSize, setPageSize] = useState(DEFAULT_LIST_SIZE);
  const [pageSizeTouched, setPageSizeTouched] = useState(false);

  const setPageSizeUser = (next: number) => {
    setPageSizeTouched(true);
    setPageSize(next);
    setPageIndex(0);
  };
  const [sorting, setSorting] = useState<SortingState>([]);

  const [status, setStatus] = useState<StatusFilter>("All");
  const [lab, setLab] = useState<labFilter>("All Hospital");

  const [dateRange, setDateRange] = useState<DateRangeValue>({
    startDate: startOfDay(new Date()),
    endDate: endOfDay(new Date()),
  });

  useEffect(() => {
    setPageIndex(0);
  }, [status, dateRange.startDate, dateRange.endDate]);

  // debounce in parent
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPageIndex(0);
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  // if you want sorting to affect API:
  const sortParam = useMemo(() => {
    if (!sorting.length) return "";
    const s = sorting[0]; // single sort
    return `${s.id}:${s.desc ? "desc" : "asc"}`;
  }, [sorting]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchHospitals() {
      try {
        setLoading(true);

        const qs = new URLSearchParams();
        qs.set("page", String(pageIndex + 1));
        qs.set("limit", String(pageSize));
        qs.set("search", debouncedSearch);

        if (status !== "All") qs.set("status", status);

        qs.set(
          "from",
          formatISO(dateRange.startDate, { representation: "date" }),
        );
        qs.set("to", formatISO(dateRange.endDate, { representation: "date" }));

        if (sortParam) qs.set("sort", sortParam);

        // ✅ If you want view-specific params, do it here:
        // if (view === "board") qs.set("view", "board");

        const res = await fetch(`/api/proxy/hospitals?${qs.toString()}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          const err = await res
            .json()
            .catch(() => ({ message: "Unknown error" }));
          throw new Error(err.message);
        }

        const json = await res.json();
        setData(json.data);
        setTotal(json.total);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (e.name !== "AbortError") console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchHospitals();
    return () => controller.abort();
  }, [
    pageIndex,
    pageSize,
    debouncedSearch,
    status,
    dateRange.startDate,
    dateRange.endDate,
    sortParam,
    view, // keep it always present if you want it
  ]);

  useEffect(() => {
    if (pageSizeTouched) return;

    const desired = view === "board" ? DEFAULT_BOARD_SIZE : DEFAULT_LIST_SIZE;

    // avoid extra re-render loop
    if (pageSize !== desired) {
      setPageSize(desired);
      setPageIndex(0);
    }
  }, [view, pageSizeTouched, pageSize]);

  // actions (parent)
  const handleView = (row: Hospital) => {
    console.log("VIEW", row);
    setSelectedRow(row);
    setShowDetailModal(true);
  };

  const handleDownload = (row: Hospital) => {
    console.log("DOWNLOAD", row);
    // call api to download
  };

  const handleShare = (row: Hospital) => {
    console.log("SHARE", row);
    setShowShareModal(true);
    // share modal / copy link etc.
  };

  const orderStatuses = [
    { label: "Reviewed", value: "Reviewed", color: "before:bg-warning-500" },
    { label: "Available", value: "Available", color: "before:bg-success-600" },
    { label: "Pending", value: "Pending", color: "before:bg-error-500" },
  ];

  const labs = [
    {
      label: "All Hospital",
      value: "All Hospital",
    },
    {
      label: "Excel Medical & Diagnostics",
      value: "Excel Medical & Diagnostics",
    },
    {
      label: "Maroof International Hospital",
      value: "Maroof International Hospital",
    },
    {
      label: "Shifa Care Clinic",
      value: "Shifa Care Clinic",
    },
  ];

  const currentPage = pageIndex + 1;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const from = total === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min(from + pageSize - 1, total);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <DashboardEmptyState
          btnLabel="Link New Hospital"
          icon={<HospitalEmpty />}
          label="No Hospitals Linked"
          subTitle="You haven’t linked any hospitals yet. Once your doctor or lab shares hospitals or prescriptions, they’ll appear here automatically."
        />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 w-full lg:pt-26 space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 lg:gap-6">
        {dashboardCards.map((card, index) => (
          <DashboardCard
            key={index}
            value={card.value}
            label={card.label}
            icon={card.icon}
            illustration={card.illustration}
            gradientClass={card.gradientClass}
            shadowColor={card.shadowColor}
          />
        ))}
      </div>

      <div className="space-y-5">
        <div className="space-y-3">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center relative flex-1 max-w-152 min-w-60">
              <input
                placeholder="Search by doctor name..."
                className="border border-slate-200 min-w-60 flex-1 focus:ring-slate-300 focus:ring-1 placeholder:text-slate-400 text-slate-900 font-normal text-sm md:text-base outline-none ps-10 rounded-lg py-2.5 px-3.5"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="absolute start-4">
                <SearchIcon />
              </span>
            </div>
            <div className="flex items-center gap-4">
              <SegmentedViewToggle value={view} onChange={setView} />
              <div>
                <ThemeButton
                  label="Download Hospitals"
                  icon={<DownloadFilledIcon />}
                  onClick={() => {}}
                  variant="secondary"
                />
              </div>
              <div>
                <ThemeButton
                  label="New Hospitals"
                  icon={<PlusIcon />}
                  onClick={() => {
                    setShowHospitalModal(true);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-end">
            <div className="flex items-center gap-4">
              <DateRangeFilter
                value={dateRange}
                onApply={(next) => {
                  setDateRange(next);
                  setPageIndex(0);
                }}
              />

              <Menu>
                <MenuButton className="flex justify-between py-1.5 md:py-2.5 px-2 sm:px-3.5 cursor-pointer whitespace-nowrap bg-white text-slate-900 items-center gap-2 rounded-lg min-w-45 text-sm md:text-base font-normal border border-slate-200  focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-slate-50 data-open:bg-slate-50">
                  {status} <ArrowHeadDownIcon fill="#717680" />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className={`min-w-32 md:min-w-44  z-400 origin-top-right rounded-lg border bg-white shadow p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0`}
                >
                  <MenuItem>
                    <button
                      onClick={() => {
                        setStatus("All");
                      }}
                      className="text-slate-700 cursor-pointer hover:bg-gray-100 font-medium w-full py-2 px-2.5 rounded-md text-xs md:text-sm text-start"
                    >
                      All Status
                    </button>
                  </MenuItem>
                  {orderStatuses.map((status) => (
                    <MenuItem key={status.label}>
                      <button
                        onClick={() => {
                          setStatus(status.value as StatusFilter);
                        }}
                        className={`flex items-center cursor-pointer font-medium gap-2 rounded-md text-slate-700 text-xs md:text-sm py-2 px-2.5 hover:bg-gray-100 w-full before:w-1.5 before:h-1.5 before:shrink-0 before:content-[''] before:rounded-full before:relative before:block ${status.color}`}
                      >
                        {status.label}
                      </button>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
              <Menu>
                <MenuButton className="flex justify-between py-1.5 md:py-2.5 px-2 sm:px-3.5 cursor-pointer whitespace-nowrap bg-white text-slate-900 items-center gap-2 rounded-lg min-w-45 text-sm md:text-base font-normal border border-slate-200  focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-slate-50 data-open:bg-slate-50">
                  {lab} <ArrowHeadDownIcon fill="#717680" />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className={`min-w-32 md:min-w-44  z-400 origin-top-right rounded-lg border bg-white shadow p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0`}
                >
                  {labs.map((lab) => (
                    <MenuItem key={lab.label}>
                      <button
                        onClick={() => {
                          setLab(lab.value as labFilter);
                        }}
                        className={`flex items-center cursor-pointer font-medium gap-2 rounded-md text-slate-700 text-xs md:text-sm py-2 px-2.5 hover:bg-gray-100 w-full`}
                      >
                        {lab.label}
                      </button>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
              <div>
                <ThemeButton
                  label="Clear Filter"
                  size="large"
                  iconDirection="end"
                  icon={<CrossIcon />}
                  onClick={() => {
                    // router.push("/hospitals/add-hospital");
                  }}
                  variant="outline"
                />
              </div>
            </div>
          </div>
        </div>

        {view === "list" ? (
          <HospitalsTable
            data={data}
            total={total}
            loading={loading}
            pageIndex={pageIndex}
            pageSize={pageSize}
            sorting={sorting}
            onPageIndexChange={setPageIndex}
            // onPageSizeChange={setPageSize}
            onPageSizeChange={setPageSizeUser}
            onSortingChange={setSorting}
            onView={handleView}
            onDownload={handleDownload}
            onShare={handleShare}
          />
        ) : (
          <>
            <div className="grid grid-cols-4 gap-5">
              {data.map((item, index) => (
                <HospitalsCard
                  key={index}
                  data={item}
                  onView={() => handleView(item)}
                  onDownload={() => handleDownload(item)}
                />
              ))}
            </div>
            {data.length > 0 && !loading && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-t-slate-200 text-sm">
                <div className="flex items-center gap-2.5 text-slate-500 text-xs justify-end">
                  Show
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSizeUser(Number(e.target.value))}
                    className="border border-slate-200 text-slate-700 text-xs outline-0 focus:ring-1 focus:ring-slate-300 px-3 py-2 rounded"
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                  </select>
                  per page
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-700 text-sm">
                    {from}-{to} of {total}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      disabled={pageIndex === 0 || loading}
                      onClick={() => setPageIndex(pageIndex - 1)}
                      className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-40"
                    >
                      <ArrowIcon />
                    </button>

                    {getPaginationRange(currentPage, totalPages).map(
                      (page, idx) =>
                        page === "..." ? (
                          <span key={idx} className="px-2 text-slate-700">
                            …
                          </span>
                        ) : (
                          <button
                            key={idx}
                            onClick={() => setPageIndex(page - 1)}
                            className={`px-3 py-1 rounded text-slate-700 ${
                              page === currentPage
                                ? "bg-slate-100 font-semibold"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        ),
                    )}

                    <button
                      disabled={currentPage >= totalPages || loading}
                      onClick={() => setPageIndex(pageIndex + 1)}
                      className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-40"
                    >
                      <span className="inline-block rotate-180">
                        <ArrowIcon />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <AddHospitalModal
        isOpen={showHospitalModal}
        onClose={() => {
          setShowHospitalModal(false);
        }}
        onConfirm={() => {
          setShowHospitalModal(false);
        }}
      />

      <HospitalDetailModal
        onConfirm={() => {}}
        onCancel={() => {
          setShowDeleteModal(true);
        }}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
        }}
        data={selectedRow ?? null}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setShowDetailModal(false);
        }}
        onConfirm={() => {
          setShowDeleteModal(false);
          setShowDetailModal(false);
        }}
      />

      <AppointmentShareModal
        isOpen={showShareModal}
        onClose={() => {
          setShowShareModal(false);
        }}
        onConfirm={() => setShowShareModal(true)}
      />
    </div>
  );
};

export default Page;
