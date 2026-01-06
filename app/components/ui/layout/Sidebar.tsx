"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Images } from "@/app/ui/images";
import { DashboardActiveIcon, DashboardIcon, LogoutIcon } from "@/public/icons";
import { useSidebar } from "@/app/context/SidebarContext";

type NavItem = {
  label: string;
  href: string;
  section?: "main" | "secondary";
  icon: React.ComponentType<{ fill?: string }>;
  activeIcon: React.ComponentType<{ fill?: string }>;
};

const Sidebar = () => {
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  const items = useMemo<NavItem[]>(
    () => [
      {
        label: "Dashboard",
        href: "/dashboard",
        section: "main",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },
      {
        label: "Appointments",
        href: "/appointments",
        section: "main",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },
      {
        label: "Reports",
        href: "/reports",
        section: "main",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },
      {
        label: "Prescriptions",
        href: "/prescriptions",
        section: "main",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },
      {
        label: "Referrals",
        href: "/referrals",
        section: "main",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },
      {
        label: "Hospitals",
        href: "/hospitals",
        section: "main",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },
      {
        label: "Vaccination",
        href: "/vaccination",
        section: "main",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },
      {
        label: "My Diseases",
        href: "/my-diseases",
        section: "main",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },
      {
        label: "Gallery",
        href: "/gallery",
        section: "main",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },
      {
        label: "Doctors",
        href: "/doctors",
        section: "main",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },
      {
        label: "My Family",
        href: "/my-family",
        section: "main",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },
      {
        label: "Shared Records",
        href: "/shared-records",
        section: "main",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },

      {
        label: "Upload",
        href: "/upload",
        section: "secondary",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },
      {
        label: "Messages",
        href: "/messages",
        section: "secondary",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },
      {
        label: "Archives",
        href: "/archives",
        section: "secondary",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },
      {
        label: "Settings",
        href: "/settings",
        section: "secondary",
        icon: DashboardIcon,
        activeIcon: DashboardActiveIcon,
      },
    ],
    []
  );

  const mainItems = items.filter((i) => i.section === "main");
  const secondaryItems = items.filter((i) => i.section === "secondary");

  return (
    <aside
      className={[
        "h-dvh  top-0",
        "bg-slate-100 ",
        "transition-all duration-500",
        collapsed ? "w-14.5" : "w-55",
      ].join(" ")}
    >
      <div className={"h-full flex pb-5 flex-col"}>
        <div
          className={`flex items-start justify-between gap-3 ${
            !collapsed && "px-3 pt-5"
          } `}
        >
          <div className="relative flex items-center gap-3 h-16 w-45">
            <Image
              alt=""
              src={Images.auth.logoWithoutText}
              className={`absolute transition-all duration-500 ease-in-out
      ${collapsed ? "opacity-100 scale-100" : "opacity-0 scale-95"}
    `}
            />

            <Image
              alt=""
              src={Images.auth.logo}
              className={`absolute w-40 transition-all duration-500 ease-in-out
      ${collapsed ? "opacity-0 scale-95" : "opacity-100 scale-100"}
    `}
            />
          </div>
        </div>

        <nav className="mt-10 flex-1 px-3 pb-5 overflow-hidden">
          <div className="space-y-1.5">
            {mainItems.map((item) => {
              const active =
                pathname === item.href || pathname?.startsWith(item.href + "/");
              const IconComponent = item.icon;
              const ActiveIconComponent = item.activeIcon;
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
                    {IconComponent && active ? (
                      <ActiveIconComponent fill="currentColor" />
                    ) : (
                      <IconComponent fill="currentColor" />
                    )}
                  </span>

                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </div>

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

        <div className="pt-4 px-3">
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
            <span
              className={[
                "grid place-items-center shrink-0 rounded-full transition",
                "h-7.5 w-7.5 bg-white",
              ].join(" ")}
            >
              <LogoutIcon />
            </span>

            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
