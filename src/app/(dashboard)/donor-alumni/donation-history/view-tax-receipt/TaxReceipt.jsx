import React from "react";

const TaxReceipt = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 text-gray-900 dark:text-white font-serif relative">
      {/* CSS Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: `url('https://publicbucket-development.zohostratus.in/pdf/download__2_-removebg-preview.png')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "clamp(40%, 400px, 80%)",
        }}
      />

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 text-gray-900 font-serif relative dark:text-white">
        {/* Top Right Box */}
        <p className="font-semibold text-center text-sm sm:text-base">
          DONOR COPY
        </p>
        <p className="mt-2 font-semibold text-center text-sm sm:text-base md:text-lg">
          INDIAN INSTITUTE OF TECHNOLOGY KANPUR
        </p>
        <p className="text-center text-xs sm:text-sm md:text-base">
          KANPUR-208016
        </p>

        <div className="w-full flex justify-end text-right leading-tight mt-4 sm:mt-6">
          <div className="text-xs sm:text-sm md:text-base">
            <p className="font-semibold">
              IITK-TAN-NO : KNPI01010C <br />
              IITK-PAN-NO : AAAJI0169A
            </p>

            <p className="mt-2 sm:mt-4">
              <strong>Date :</strong> 08-Aug-2025
            </p>
          </div>
        </div>

        {/* Left Side Info */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-sm sm:text-base">
          <p>
            <strong>NO :</strong> IITK/END/2025-26/82
          </p>
          <p className="mt-1">
            <strong>DONAR PAN NO :</strong> AFLPS9246L
          </p>
        </div>

        {/* Main Sentence (Centered) */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center text-base sm:text-lg leading-relaxed">
          <p>
            Received with thanks from{" "}
            <span className="italic font-semibold">
              Prof. Rasiklal Jagjivandas Shah
            </span>{" "}
            a sum of Rupees{" "}
            <span className="italic font-semibold">Nine Thousand Only</span> as
            a donation to{" "}
            <span className="italic font-semibold">IIT Kanpur</span> by{" "}
            <span className="italic font-semibold">Bank Transfer</span> Dated{" "}
            <span className="italic font-semibold">05-Aug-2025</span>.
          </p>
        </div>

        {/* Amount Box */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-0">
          <div className="border border-black px-4 py-3 sm:py-0 sm:px-5 flex justify-center items-center w-full sm:w-auto dark:border-white">
            <p className="text-sm sm:text-base">9,000.00</p>
          </div>

          {/* Signature */}
          <div className="w-full flex justify-center sm:justify-end text-center sm:text-right">
            <div className="text-sm sm:text-base">
              <p className="font-semibold">Registrar</p>
              <p>Indian Institute of Technology</p>
              <p>Kanpur</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-xs sm:text-sm leading-relaxed text-gray-700 text-center dark:text-white">
          <p>
            All donation to IIT Kanpur are eligible for 100% deductions from
            income for the Income Tax purpose u/s 80G, Institute is eligible u/s
            80G (2)(a)(iiif) as notified by D. G. (Income Tax exemptions) vide
            No. 192-196 F.No. D.G. (E/80G/93-94) dated 18th January, 1994.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaxReceipt;
