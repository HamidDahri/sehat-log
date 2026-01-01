"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  section?: "main" | "secondary";
};

const Icon = ({ active }: { active?: boolean }) => (
  <span
    className={[
      "grid place-items-center shrink-0 rounded-full border",
      "h-9 w-9",
      active ? "bg-white/20 border-white/20" : "bg-white border-slate-200",
    ].join(" ")}
    aria-hidden="true"
  >
    {/* single placeholder icon */}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l8 7v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10l8-7z"
        stroke={active ? "white" : "#475569"}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const items = useMemo<NavItem[]>(
    () => [
      { label: "Dashboard", href: "/dashboard", section: "main" },
      { label: "Appointments", href: "/appointments", section: "main" },
      { label: "Reports", href: "/reports", section: "main" },
      { label: "Prescriptions", href: "/prescriptions", section: "main" },
      { label: "Referrals", href: "/referrals", section: "main" },
      { label: "Hospitals", href: "/hospitals", section: "main" },
      { label: "Vaccination", href: "/vaccination", section: "main" },
      { label: "My Diseases", href: "/my-diseases", section: "main" },
      { label: "Gallery", href: "/gallery", section: "main" },
      { label: "Doctors", href: "/doctors", section: "main" },
      { label: "My Family", href: "/my-family", section: "main" },
      { label: "Shared Records", href: "/shared-records", section: "main" },

      { label: "Upload", href: "/upload", section: "secondary" },
      { label: "Messages", href: "/messages", section: "secondary" },
      { label: "Archives", href: "/archives", section: "secondary" },
      { label: "Settings", href: "/settings", section: "secondary" },
    ],
    []
  );

  const mainItems = items.filter((i) => i.section === "main");
  const secondaryItems = items.filter((i) => i.section === "secondary");

  return (
    <aside
      className={[
        "h-dvh sticky top-0",
        "bg-[#F5F9FC] border-r border-slate-200",
        "transition-all duration-300",
        collapsed ? "w-[86px]" : "w-[280px]",
      ].join(" ")}
    >
      <div className="h-full flex flex-col px-4 py-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {!collapsed && (
              <div className="leading-tight">
                <div className="text-sm text-slate-500">Dashboard</div>
                <div className="text-xl font-extrabold tracking-wide text-slate-900">
                  SEHA<span className="text-green-600">LOG</span>
                </div>
              </div>
            )}
          </div>

          {/* Collapse button */}
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="h-10 w-10 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 grid place-items-center"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="#0f172a"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="mt-6 flex-1 overflow-y-auto pr-1">
          <div className="space-y-1">
            {mainItems.map((item) => {
              const active =
                pathname === item.href || pathname?.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "group flex items-center gap-3 rounded-full",
                    "px-2 py-1.5",
                    "transition",
                    active
                      ? "bg-[#0EA5E9] text-white"
                      : "text-slate-900 hover:bg-white",
                  ].join(" ")}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon active={active} />

                  {!collapsed && (
                    <span className="text-sm font-semibold">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-slate-200" />

          <div className="space-y-1">
            {secondaryItems.map((item) => {
              const active =
                pathname === item.href || pathname?.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "group flex items-center gap-3 rounded-full",
                    "px-2 py-1.5",
                    "transition",
                    active
                      ? "bg-[#0EA5E9] text-white"
                      : "text-slate-900 hover:bg-white",
                  ].join(" ")}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon active={active} />
                  {!collapsed && (
                    <span className="text-sm font-semibold">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="pt-4">
          <button
            type="button"
            className={[
              "w-full flex items-center gap-3 rounded-full",
              "px-2 py-2",
              "text-slate-900 hover:bg-white transition",
            ].join(" ")}
            title={collapsed ? "Logout" : undefined}
            onClick={() => console.log("logout")}
          >
            <Icon />
            {!collapsed && (
              <span className="text-sm font-semibold">Logout</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
