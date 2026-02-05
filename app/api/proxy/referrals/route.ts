import { NextResponse } from "next/server";

type Status = "Pending" | "Completed" | "InProgress" ;
const STATUSES: Status[] = [
  "Pending",
  "Completed",
  "InProgress",
];

const ALL_DATA = Array.from({ length: 52 }, (_, i) => {
  const status: Status =
    i < STATUSES.length
      ? STATUSES[i]                  // guarantee each at least once
      : STATUSES[i % STATUSES.length]; // cycle for rest

  return {
    id: i + 1,
    referedDoctor: `Dr. ${i + 1}`,
    referedToDoctor: `Dr. R ${i + 1}`,
    urgency: "Dermatologist",
    date: "10 July 2025",
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
    ["Completed", "InProgress", "Pending"].includes(statusParam)
      ? (statusParam as Status)
      : null
  );

  // Apply filters
  const filtered = ALL_DATA.filter((item) => {
    const matchesSearch = item.referedDoctor.toLowerCase().includes(search);
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

