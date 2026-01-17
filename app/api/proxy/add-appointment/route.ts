import { NextResponse } from "next/server";

export type DoctorDTO = {
  id: string;
  name: string;
  code?: string;
  specialization: string;
  clinic: string;
  location: string;
  avatar: string;
  isLiked: boolean;
  visits: number; // for "Most Frequently Visited"
  distanceKm: number; // for "Nearby"
};

const DOCTORS: DoctorDTO[] = [
  {
    id: "1",
    name: "Dr. Irum",
    code: "PK-20358",
    specialization: "Gynecologist",
    clinic: "Family Health Clinic",
    location: "G-8, Islamabad",
    avatar: "/images/doctor-1.jpg",
    isLiked: true,
    visits: 9,
    distanceKm: 2.4,
  },
  {
    id: "2",
    name: "Dr. Asad Khan",
    code: "PK-20359",
    specialization: "Orthopedic Surgeon",
    clinic: "Bone & Joint Center",
    location: "F-10, Islamabad",
    avatar: "/images/doctor-2.jpg",
    isLiked: false,
    visits: 18,
    distanceKm: 6.8,
  },
  {
    id: "3",
    name: "Dr. Hina Ali",
    code: "PK-20360",
    specialization: "Dermatologist",
    clinic: "SkinCare Point",
    location: "DHA, Lahore",
    avatar: "/images/doctor-3.jpg",
    isLiked: true,
    visits: 5,
    distanceKm: 1.1,
  },
  {
    id: "4",
    name: "Dr. Hamza Farooq",
    code: "PK-20361",
    specialization: "Cardiologist",
    clinic: "Heart & Vascular Clinic",
    location: "Gulberg, Lahore",
    avatar: "/images/doctor-4.jpg",
    isLiked: false,
    visits: 22,
    distanceKm: 3.9,
  },
];

function contains(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const tab = searchParams.get("tab") ?? "liked"; // liked | frequent | nearby
  const q = (searchParams.get("q") ?? "").trim();
  const specialization = searchParams.get("specialization") ?? "All Specializations";
  const location = searchParams.get("location") ?? "All Locations";

  // Filter
  let results = [...DOCTORS];

  // tab filter / sorting
  if (tab === "liked") {
    results = results.filter((d) => d.isLiked);
  } else if (tab === "frequent") {
    results = results.sort((a, b) => b.visits - a.visits);
  } else if (tab === "nearby") {
    results = results.sort((a, b) => a.distanceKm - b.distanceKm);
  }

  // specialization filter
  if (specialization !== "All Specializations") {
    results = results.filter((d) => d.specialization === specialization);
  }

  // location filter
  if (location !== "All Locations") {
    results = results.filter((d) => d.location === location);
  }

  // search filter
  if (q) {
    results = results.filter((d) => {
      return (
        contains(d.name, q) ||
        contains(d.specialization, q) ||
        contains(d.clinic, q) ||
        contains(d.location, q) ||
        contains(d.code ?? "", q)
      );
    });
  }

  // Simulate latency for demo
  await new Promise((r) => setTimeout(r, 350));

  return NextResponse.json({
    ok: true,
    total: results.length,
    data: results,
  });
}
