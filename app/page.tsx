import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen gap-4 flex-col items-center justify-center bg-zinc-50">
      <Link
        href={"/register"}
        className="bg-primary-blue p-2 min-w-40 text-center cursor-pointer rounded-lg text-white"
      >
        Register
      </Link>
      <Link
        href={"/login"}
        className="bg-primary-blue p-2  min-w-40 text-center rounded-lg cursor-pointer text-white"
      >
        login
      </Link>
    </div>
  );
}
