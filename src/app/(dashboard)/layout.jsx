"use client";

import AppHeader from "@/src/layout/AppHeader";
import AppSidebar from "@/src/layout/AppSidebar";
import Backdrop from "@/src/layout/Backdrop";
import { useSidebar } from "@/src/context/SidebarContext";
import AppFooter from "@/src/layout/AppFooter";
import { RoleProvider } from "@/src/context/RoleProviderContext";
import { useState, useEffect } from "react";

export default function DonorLayout({ children }) {
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

  return (
    <div className="h-screen overflow-hidden">
      <RoleProvider role="donoralumni">
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
// app/(dashboard)/donor/layout.jsx
// "use client";
// import { useState, useEffect } from "react";
// import { useSidebar } from "@/src/context/SidebarContext";
// import { useAuth } from "@/src/context/AuthContext";
// import { RoleProvider } from "@/src/context/RoleProviderContext"; // Fixed import
// import AppSidebar from "@/src/layout/AppSidebar";
// import AppHeader from "@/src/layout/AppHeader";
// import AppFooter from "@/src/layout/AppFooter";
// import Backdrop from "@/src/layout/Backdrop";

// export default function DonorLayout({ children }) {
//   const { isExpanded, isHovered, isMobileOpen } = useSidebar();
//   const { user } = useAuth();
//   const [isIframe, setIsIframe] = useState(false);

//   useEffect(() => {
//     if (window.self !== window.top) {
//       setIsIframe(true);
//     }
//   }, []);

//   const mainContentMargin = isMobileOpen
//     ? "ml-0"
//     : isExpanded || isHovered
//     ? "lg:ml-[260px]"
//     : "lg:ml-[90px]";

//   if (isIframe) {
//     return <main className="p-0 m-0 w-full">{children}</main>;
//   }

//   // Get role from authenticated user
//   const userRole = user?.role || "donor";

//   console.log(userRole);

//   return (
//     <div className="h-screen overflow-hidden">
//       <RoleProvider role={userRole}>
//         {" "}
//         {/* Use RoleProvider, not RoleProviderContext */}
//         <AppSidebar />
//         <Backdrop />
//         <div
//           className={`flex flex-col h-full transition-all duration-300 ease-in-out ${mainContentMargin}`}
//         >
//           <div className="shrink-0 sticky top-0 z-50 bg-[#0c0f17]">
//             <AppHeader />
//           </div>
//           <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
//           <div className="shrink-0 sticky bottom-0 z-50 bg-[#0c0f17]">
//             <AppFooter />
//           </div>
//         </div>
//       </RoleProvider>
//     </div>
//   );
// }
