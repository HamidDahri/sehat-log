"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type SidebarContextType = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  toggle: () => void;
  expand: () => void;
  collapse: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({
  children,
  defaultCollapsed = false,
}: {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const value = useMemo(
    () => ({
      collapsed,
      setCollapsed,
      toggle: () => setCollapsed((p) => !p),
      expand: () => setCollapsed(false),
      collapse: () => setCollapsed(true),
    }),
    [collapsed]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
};
