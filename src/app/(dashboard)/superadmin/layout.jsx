"use client";

import AppHeader from "@/src/layout/AppHeader";
import AppSidebar from "@/src/layout/AppSidebar";
import Backdrop from "@/src/layout/Backdrop";
import { useSidebar } from "@/src/context/SidebarContext";
import AppFooter from "@/src/layout/AppFooter";
import { useEffect, useState } from "react";

export default function SuperAdminLayout({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    // Check if page is rendered inside an iframe
    if (window.self !== window.top) {
      setIsIframe(true);
    }
  }, []);

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[260px]"
    : "lg:ml-[90px]";

  // 👉 If inside iframe, render only the page content
  if (isIframe) {
    return <main className="p-0 m-0 w-full">{children}</main>;
  }

  // 👉 Normal full layout
  return (
    <div className="min-h-screen xl:flex">
      {/* <AppSidebar role="superadmin" />
      <Backdrop />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader /> */}
      <main className="w-full">{children}</main>
      {/* <main className="p-4 md:p-6">{children}</main> */}
      {/* <AppFooter />
      </div> */}
    </div>
  );
}
