"use client";
import { useEffect } from "react";
import FormPage from "./forms/FormPage";

// app/superadmin/page.jsx
export default function SuperAdminDashboard() {
  async function getData() {
    const url =
      "https://iitk-50035778635.development.catalystappsail.in/api/pledge_list";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 dark:bg-[#1D1F24] bg-[#ffffff]">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-5 capitalize px-3 pt-4">
          Form Page
        </h3>
        <FormPage />
      </div>
    </div>
  );
}
