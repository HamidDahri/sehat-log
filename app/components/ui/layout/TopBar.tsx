"use client";
import { useSidebar } from "@/app/context/SidebarContext";
import { Images } from "@/app/ui/images";
import {
  ArrowHeadDownIcon,
  BellIcon,
  KeyIcon,
  LinesIcon,
  LogoutIcon,
  ProfileIcon,
  ProfileLogoutIcon,
  SettingsIcon,
} from "@/public/icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const TopBar = () => {
  const { collapsed, toggle } = useSidebar();
  const pathname = usePathname();

  // normalize pathname
  const isDashboard = pathname === "/dashboard";

  const pageTitle = isDashboard
    ? "👋 Welcome, Asad!"
    : `My ${pathname
        .replace("/", "")
        .replaceAll("-", " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())}`;
  return (
    <div className="flex items-center sticky top-0 justify-between w-full p-5 border-b border-b-slate-200">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => toggle()}
          className="h-10 w-10 rounded-lg cursor-pointer bg-white border border-slate-200 hover:bg-slate-50 grid place-items-center"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand" : "Collapse"}
        >
          <LinesIcon />
        </button>

        <h1 className="font-semibold text-3xl text-black">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-sm h-10 w-10 flex items-center justify-center relative bg-slate-100 ">
          <BellIcon />
          <span className="absolute inline-block w-1.25 h-1.25 rounded-full bg-red-500 top-2.5 end-3.5"></span>
        </button>

        <div className="rounded-sm  py-2 px-3 flex items-center gap-2 bg-slate-100">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.7597 19.9048C15.9197 15.1612 8.07918 24.6469 0.239258 19.9048V4.09571C8.07918 8.83855 15.9198 -0.647144 23.7597 4.09571V19.9048Z"
              fill="#CCCBCA"
            />
            <path
              d="M23.5674 19.5991C15.8564 15.1612 8.14499 24.263 0.433594 19.8277V4.40386C8.14507 8.83987 15.8564 -0.261939 23.5674 4.1761V19.5991Z"
              fill="#2E307F"
            />
            <path
              d="M23.567 4.17723C22.6411 3.64391 21.7139 3.30651 20.7867 3.11719C17.8577 4.47145 14.9287 7.31012 12.0005 10.1481C9.07145 9.08154 6.14244 8.01489 3.21335 5.46512C2.28649 5.2758 1.35997 4.9384 0.433105 4.40507V6.25812C3.36211 9.89579 6.29112 11.5801 9.22012 12.7953C6.29112 15.4852 3.36211 17.7061 0.433105 17.9744V19.8275C1.35997 20.3602 2.28649 20.6976 3.21335 20.8876C6.14235 19.5313 9.07136 16.6926 12.0004 13.854C14.9287 14.9219 17.8577 15.9887 20.7866 18.539C21.7138 18.729 22.641 19.0664 23.5669 19.5991V17.746C20.6379 14.1077 17.7089 12.4234 14.7798 11.2076C17.7089 8.51765 20.6379 6.29732 23.5669 6.03036L23.567 4.17723Z"
              fill="white"
            />
            <path
              d="M0.434082 4.40527V5.3312C4.28995 10.1199 8.14556 11.5246 12.0013 12.9284V12.0012C8.14548 10.5974 4.28995 9.19393 0.434082 4.40527ZM23.5678 18.6734C19.713 13.8846 15.8569 12.4793 12.0013 11.0742V12.001C15.8569 13.4065 19.713 14.8105 23.5678 19.5991V18.6734Z"
              fill="#D12433"
            />
            <path
              d="M0.434082 19.8276C0.897386 20.0933 1.36027 20.3112 1.82357 20.4865C5.21613 19.5035 8.60878 16.2159 12.0013 12.9281V12.0009C8.14548 15.7376 4.28995 19.4756 0.434082 19.8276ZM22.1784 3.51855C18.7859 4.5002 15.3932 7.78786 12.0013 11.0755V12.0023C15.8569 8.26606 19.7116 4.52941 23.5666 4.17668C23.1225 3.92003 22.6582 3.69993 22.1784 3.51855Z"
              fill="#D12433"
            />
            <path
              d="M23.567 10.5391C20.0336 8.5054 16.4989 9.315 12.9641 10.3624V4.00098C12.3211 4.19156 11.679 4.3902 11.036 4.58078V10.9422C7.50162 11.9893 3.96749 12.7997 0.433105 10.7669V13.4664C3.96749 15.4988 7.50162 14.6885 11.036 13.6417V20.0031C11.679 19.8119 12.3211 19.6139 12.9641 19.4227V13.0612C16.4988 12.0146 20.0335 11.2045 23.567 13.2379V10.5391Z"
              fill="#D12633"
            />
            <path
              d="M10.2642 4.80439V10.3941C6.98726 11.3206 3.7101 11.8802 0.433105 9.99496V10.7667C3.96749 12.7994 7.50162 11.9891 11.036 10.9421V4.58061C10.7787 4.65689 10.5216 4.73132 10.2642 4.80439ZM0.43319 14.2366C3.71018 16.1215 6.98734 15.5623 10.2643 14.6351V20.2261C10.5217 20.1531 10.7788 20.0787 11.0361 20.0029V13.6414C7.5017 14.6882 3.96757 15.4986 0.43319 13.4661V14.2366ZM23.567 13.2377C20.0336 11.2043 16.4989 12.0143 12.9641 13.061V19.4225C13.2218 19.3467 13.4794 19.2724 13.7358 19.1993V13.6083C17.0128 12.6824 20.2899 12.1232 23.5669 14.0081L23.567 13.2377ZM23.567 9.76703C20.29 7.88139 17.0129 8.44062 13.7359 9.36655V3.77686C13.4795 3.84992 13.2219 3.92502 12.9641 4.00072V10.3622C16.4989 9.31474 20.0336 8.50514 23.567 10.5389L23.567 9.76703Z"
              fill="white"
            />
          </svg>

          <span className="text-slate-700 text-sm font-normal">English</span>
        </div>

        <Menu>
          <MenuButton
            className={
              "bg-slate-100 flex cursor-pointer items-center outline-0 rounded-sm "
            }
          >
            <Image
              alt=""
              src={Images.dashboard.userImage}
              className="rounded-sm"
            />
            <span className="py-2 px-3 text-slate-600">
              <ArrowHeadDownIcon fill="currentColor" />
            </span>
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className={
              "outline-0 bg-white rounded-lg mt-1 p-1 me-2 drop-shadow"
            }
          >
            <MenuItem>
              <a
                className="flex items-center gap-2 data-focus:bg-slate-100 py-2 px-2.5 text-slate-700 p-1 rounded-md font-medium text-sm"
                href="/settings"
              >
                <ProfileIcon /> My Profile
              </a>
            </MenuItem>
            <MenuItem>
              <a
                className="flex items-center gap-2 data-focus:bg-slate-100 py-2 px-2.5 text-slate-700 p-1 rounded-md font-medium text-sm"
                href="/settings"
              >
                <SettingsIcon /> Setting
              </a>
            </MenuItem>
            <MenuItem>
              <a
                className="flex items-center gap-2 data-focus:bg-slate-100 py-2 px-2.5 text-slate-700 p-1 rounded-md font-medium text-sm"
                href="/settings"
              >
                <KeyIcon /> Change Password
              </a>
            </MenuItem>
            <MenuItem>
              <a
                className="flex items-center gap-2 data-focus:bg-slate-100 py-2 px-2.5 text-slate-700 p-1 rounded-md font-medium text-sm"
                href="/settings"
              >
                <ProfileLogoutIcon /> Logout
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

export default TopBar;
