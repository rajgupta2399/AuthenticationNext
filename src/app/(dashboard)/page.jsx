// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { useTheme } from "@/src/context/ThemeContext";

// export default function Page() {
//   const router = useRouter();
//   const { colors } = useTheme();
//   const primary = colors?.primaryColor || "#2563eb"; // fallback to blue-600

//   useEffect(() => {
//     // Add class to hide top loader
//     document.body.classList.add("hide-top-loader");

//     // Redirect after 2s (simulate loading)
//     const timer = setTimeout(() => {
//       router.push("/");
//     }, 2000);

//     return () => {
//       clearTimeout(timer);
//       // Remove class when component unmounts
//       document.body.classList.remove("hide-top-loader");
//     };
//   }, [router]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
//       {/* Logo or Icon */}
//       <div className="relative">
//         <div
//           className="animate-spin rounded-full h-16 w-16 border-b-2"
//           style={{ borderColor: primary }}
//         ></div>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <span className="font-bold text-lg" style={{ color: primary }}>
//             Donor
//           </span>
//         </div>
//       </div>

//       {/* Text */}
//       <p className="mt-6 text-gray-700 dark:text-gray-300 text-lg font-medium animate-pulse">
//         Redirecting to Donor
//       </p>

//       {/* Progress Bar */}
//       <div className="w-64 h-2 mt-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//         <div
//           className="h-full animate-[progress_2s_linear_forwards]"
//           style={{ backgroundColor: primary }}
//         />
//       </div>

//       <style jsx>{`
//         @keyframes progress {
//           from {
//             width: 0%;
//           }
//           to {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { useRole } from "@/src/context/RoleProviderContext";

const Page = () => {
  const { role } = useRole();

  // If authenticated, show your original dashboard content
  return (
    <div className="mb-5">
      {/* Main Profile Dashboard Content */}
      <div className="mb-6">
        {(role === "alumni" ||
          role === "donor" ||
          role === "donoralumni" ||
          role === "evaluation" ||
          role === "moderator" ||
          role === "faculty" ||
          role === "usdms") && (
          <p className="text-brand-600 dark:text-brand-400 text-center font-bold text-xl">
            Leadership Message
          </p>
        )}
      </div>

      {/* Rest of your original dashboard content... */}
      {(role === "alumni" ||
        role === "donor" ||
        role === "donoralumni" ||
        role === "evaluation" ||
        role === "moderator" ||
        role === "faculty" ||
        role === "usdms") && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 md:p-4">
          <div className="text-center mb-6">
            {/* <h2 className="text-2xl md:text-2xl font-bold text-gray-800 dark:text-white mb-3">
                Leadership Message
              </h2> */}
            {/* <div className="w-24 h-1 bg-brand-600 mx-auto"></div> */}
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The DoRA office plays a vital role in IIT Kanpur's success. It
              bridges the gap between the institute and its alumni, fostering
              strong connections. The mission is two-fold: to strengthen these
              bonds and secure resources to fuel the institute's long-term
              goals.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To professionalize alumni engagement, the institute established
              the IITK Development Foundation (IITK DF) in 2020, led by CEO Mr.
              Kapil Kaul. An extended arm of the DoRA office, IITK DF's team
              works with alumni, corporations, and philanthropists to raise
              funds.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Throughout the year, DoRA's team organizes events like reunions,
              alumni day, and Foundation Day to connect with the accomplished
              alumni network of IITK. These events span the globe, helping
              alumni rekindle the bond with their alma mater.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              IIT Kanpur graduates go on to make significant contributions in
              academia, industry, entrepreneurship, and government. Their
              achievements serve as a constant inspiration for current students.
              DoRA team's efforts have resulted in the establishment of over 149
              scholarships, 54 Faculty Chairs, and numerous awards.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The institute's infrastructure has grown significantly, along with
              the creation of new departments and centres. IIT Kanpur is
              committed to continuous improvement. New ventures like the
              departments of Sustainable Energy Engineering, Cognitive Science,
              Design, and Space Sciences & Astronomy, Kotak School of
              Sustainability along with the Gangwal School of Medical Sciences
              and Technology, have been established.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To support these initiatives, DoRA office seeks continued alumni
              contributions. The institute has seen a remarkable rise in
              donations, with an ambitious goal of reaching over Rs. 750 crores
              in the next three years (July 2024 - July 2027). This funding will
              be crucial in supporting the endeavours of the institute.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I express my deepest gratitude to the alumni for their
              encouragement and look forward to maintaining strong connections.
              The message is clear: let's work together to push boundaries,
              innovate, and expand IIT Kanpur's reach. We value your unwavering
              support, creative ideas, and constructive feedback.
            </p>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-800 dark:text-white font-semibold">
                Yours sincerely,
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Prof. Amey Karkar
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
