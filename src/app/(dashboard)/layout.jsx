"use client";

import { usePathname } from "next/navigation";
import { useSidebar } from "@/src/context/SidebarContext";
import { RoleProvider } from "@/src/context/RoleProviderContext";
import { useState, useEffect } from "react";
import AppHeader from "@/src/layout/AppHeader";
import AppSidebar from "@/src/layout/AppSidebar";
import Backdrop from "@/src/layout/Backdrop";
import AppFooter from "@/src/layout/AppFooter";

export default function DonorLayout({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [isIframe, setIsIframe] = useState(false);
  const pathname = usePathname();

  const userRole = pathname.split('/')[1] || 'donor';

  console.log(userRole);

  useEffect(() => {
    if (window.self !== window.top) {
      setIsIframe(true);
    }
  }, []);

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[260px]"
    : "lg:ml-[90px]";

  if (isIframe) {
    return <main className="p-0 m-0 w-full">{children}</main>;
  }

  return (
    <div className="h-screen overflow-hidden">
      <RoleProvider role={userRole}>
        <AppSidebar />
        <Backdrop />
        <div
          className={`flex flex-col h-full transition-all duration-300 ease-in-out ${mainContentMargin}`}
        >
          <div className="shrink-0 sticky top-0 z-50 bg-[#0c0f17]">
            <AppHeader />
          </div>
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
          <div className="shrink-0 sticky bottom-0 z-50 bg-[#0c0f17]">
            <AppFooter />
          </div>
        </div>
      </RoleProvider>
    </div>
  );
}