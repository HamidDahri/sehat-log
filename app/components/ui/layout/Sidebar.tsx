"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Images } from "@/app/ui/images";
import { ArrowHeadDownIcon, DashboardIcon } from "@/public/icons";

type NavItem = {
  label: string;
  href: string;
  section?: "main" | "secondary";
  icon?: React.ComponentType<{ fill?: string }>;
};

const Icon = ({ active }: { active?: boolean }) => (
  <span
    className={[
      "grid place-items-center shrink-0 rounded-full border",
      "h-7.5 w-7.5",
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
      {
        label: "Dashboard",
        href: "/dashboard",
        section: "main",
        icon: DashboardIcon,
      },
      {
        label: "Appointments",
        href: "/appointments",
        section: "main",
        icon: ArrowHeadDownIcon,
      },
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
        "bg-slate-100 ",
        "transition-all duration-300",
        collapsed ? "w-14.5" : "w-55",
      ].join(" ")}
    >
      <div className="h-full flex flex-col px-3 py-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {collapsed ? (
              <Image alt="" src={Images.auth.logoWithoutText} />
            ) : (
              <Image alt="" src={Images.auth.logo} className="w-40" />
            )}
          </div>

          {/* Collapse button */}
        </div>
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
        {/* Nav */}
        <nav className="mt-10 flex-1 overflow-hidden">
          <div className="space-y-1.5">
            {mainItems.map((item) => {
              const active =
                pathname === item.href || pathname?.startsWith(item.href + "/");
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "group flex items-center gap-1.5 rounded-full",
                    "p-0.5",
                    "transition",
                    active
                      ? "bg-[#0EA5E9] text-white"
                      : "text-slate-800 hover:bg-white",
                  ].join(" ")}
                  title={collapsed ? item.label : undefined}
                >
                  <span
                    className={[
                      "grid place-items-center shrink-0 rounded-full bg-white transition",
                      "h-7.5 w-7.5",
                      active ? "text-primary-blue" : "text-slate-800",
                    ].join(" ")}
                  >
                    {IconComponent && <IconComponent fill="currentColor" />}
                  </span>

                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-2.5 border-t border-slate-200" />

          <div className="space-y-1.5">
            {secondaryItems.map((item) => {
              const active =
                pathname === item.href || pathname?.startsWith(item.href + "/");
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "group flex items-center gap-1.5 rounded-full",
                    "p-0.5",
                    "transition",
                    active
                      ? "bg-[#0EA5E9] text-white"
                      : "text-slate-800 hover:bg-white",
                  ].join(" ")}
                  title={collapsed ? item.label : undefined}
                >
                  <span
                    className={[
                      "grid place-items-center shrink-0 rounded-full border transition",
                      "h-7.5 w-7.5",
                      active
                        ? "bg-white/20 border-white/20"
                        : "bg-white border-slate-200",
                    ].join(" ")}
                  >
                    {IconComponent && (
                      <IconComponent fill={active ? "#FFFFFF" : "#1E293B"} />
                    )}
                  </span>

                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
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
              "w-full flex items-center gap-1.5 rounded-full",
              "p-0.5",
              "text-slate-800 hover:bg-white transition",
            ].join(" ")}
            title={collapsed ? "Logout" : undefined}
            onClick={() => console.log("logout")}
          >
            <Icon />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
