import { NextResponse } from "next/server";

type Status = "Completed" | "Upcoming" | "Missed" ;
const STATUSES: Status[] = [
  "Completed",
  "Upcoming",
  "Missed",
];



const ALL_DATA = Array.from({ length: 52 }, (_, i) => {
  const status: Status =
    i < STATUSES.length
      ? STATUSES[i]                  // guarantee each at least once
      : STATUSES[i % STATUSES.length]; // cycle for rest

  return {
    id: i + 1,
    vaccineName: "COVID-19	",
    doctor: `Dr. Ayesha`,
     date: "March 10, 2024",
     dose: "2 / 2	",
     nextDose: "Aug 06, 2025",
    notes: "Taken at Al-Hayat Clinic",
    status,
  };
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const search = (searchParams.get("search") ?? "").toLowerCase().trim();
  const statusParam = (searchParams.get("status") ?? "").trim();
  const status = (
    ["Reviewed", "Available", "Pending"].includes(statusParam)
      ? (statusParam as Status)
      : null
  );

  // Apply filters
  const filtered = ALL_DATA.filter((item) => {
    const matchesSearch = item.doctor.toLowerCase().includes(search);
    const matchesStatus = status ? item.status === status : true;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;

  const start = (safePage - 1) * safeLimit;
  const paginated = filtered.slice(start, start + safeLimit);

  return NextResponse.json({
    data: paginated,
    total: filtered.length,
  });
}

// import { NextResponse } from "next/server";

// type Status = "Upcoming" | "Completed" | "Missed" | "Canceled";

// type Appointment = {
//   id: number;
//   doctor: string;
//   specialty: string;
//   problem: string;
//   date: string; // "10 July 2025"
//   time: string;
//   status: Status;
// };
// function addDays(base: Date, days: number) {
//   const d = new Date(base);
//   d.setDate(d.getDate() + days);
//   return d;
// }

// function formatDate(d: Date) {
//   return d.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// function formatTime(hour: number, minute = 0) {
//   const d = new Date();
//   d.setHours(hour, minute, 0, 0);
//   return d.toLocaleTimeString("en-US", {
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });
// }

// // fixed base date (IMPORTANT for SSR safety)
// const BASE_DATE = new Date("2026-01-1T00:00:00");

// const ALL_DATA: Appointment[] = Array.from({ length: 52 }, (_, i) => {
//   const dayOffset = i - 26; // spread before/after base date
//   const dateObj = addDays(BASE_DATE, dayOffset);

//   const hours = [9, 10, 11, 12, 14, 15, 16, 17];
//   const hour = hours[i % hours.length];

//   const status: Status =
//     dateObj < BASE_DATE ? "Completed" : "Upcoming";

//   return {
//     id: i + 1,
//     doctor: `Dr. ${i + 1}`,
//     specialty: "Dermatologist",
//     problem: "Checkup",
//     date: formatDate(dateObj), // "10 Jan 2026"
//     time: formatTime(hour),    // "10:00 AM"
//     status,
//   };
// });

// // helper: convert "10 July 2025" → Date
// function parseHumanDate(dateStr: string): Date | null {
//   const d = new Date(dateStr);
//   return isNaN(d.getTime()) ? null : d;
// }

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);

//   const page = Number(searchParams.get("page") ?? 1);
//   const limit = Number(searchParams.get("limit") ?? 10);
//   const search = (searchParams.get("search") ?? "").toLowerCase().trim();

//   // status filter
//   const statusParam = (searchParams.get("status") ?? "").trim();
//   const status: Status | null =
//     ["Upcoming", "Completed", "Missed", "Canceled"].includes(statusParam)
//       ? (statusParam as Status)
//       : null;

//   // date range filters (YYYY-MM-DD)
//   const fromParam = searchParams.get("from");
//   const toParam = searchParams.get("to");

//   const fromDate = fromParam ? new Date(`${fromParam}T00:00:00`) : null;
//   const toDate = toParam ? new Date(`${toParam}T23:59:59`) : null;

//   // Apply filters
//   const filtered = ALL_DATA.filter((item) => {
//     const matchesSearch = item.doctor.toLowerCase().includes(search);
//     const matchesStatus = status ? item.status === status : true;

//     const itemDate = parseHumanDate(item.date);
//     const matchesDate =
//       !itemDate ||
//       (!fromDate || itemDate >= fromDate) &&
//       (!toDate || itemDate <= toDate);

//     return matchesSearch && matchesStatus && matchesDate;
//   });

//   // Pagination (after filtering)
//   const safePage = Number.isFinite(page) && page > 0 ? page : 1;
//   const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;

//   const start = (safePage - 1) * safeLimit;
//   const paginated = filtered.slice(start, start + safeLimit);

//   return NextResponse.json({
//     data: paginated,
//     total: filtered.length,
//   });
// }
