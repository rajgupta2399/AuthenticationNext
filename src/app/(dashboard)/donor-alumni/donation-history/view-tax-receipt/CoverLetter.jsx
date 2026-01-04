import React from "react";

const CoverLetter = ({
  recipientName = "Prof. Randall Jagirandar Shah",
  donationAmount = "Rs. 9,000.00",
  donationDate = "05-Aug-2025",
  causeName = "NICEE",
  organization = "IT Kaspor",
  receiptNumber = "IITK/END/2025-26/82",
  receiptDate = "08-Aug-2025",
  taxSection = "8102",
  senderName = "Nikih Verma",
  referenceNumber = "DORA/N/2025",
  currentDate = "25-Aug-2025",
}) => {
  return (
    <div className="w-full px-12 py-10 text-gray-900 font-serif relative dark:text-white">
      {/* CSS Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: `url('https://publicbucket-development.zohostratus.in/pdf/download__2_-removebg-preview.png')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "50%",
        }}
      />
      <div
        className="donation-receipt h-full relative"
        style={{
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.6",
        }}
      >
        <div className=" flex justify-between">
          <div></div>
          <div>
            <p>No. {referenceNumber}</p>
            <p>{currentDate}</p>
          </div>
        </div>
        <header
          style={{ marginBottom: "1rem" }}
          className="flex justify-between"
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              marginBottom: "0rem",
            }}
          >
            {recipientName}
          </h3>
        </header>

        <main style={{ marginBottom: "2rem" }}>
          <p>Dear {recipientName.split(" ")[0]},</p>

          <p style={{ margin: "1rem 0" }}>
            We thankfully acknowledge the receipt of your online donation
            through bank transfer for <strong>{donationAmount}</strong> dated{" "}
            <strong>{donationDate}</strong> towards{" "}
            <strong>"{causeName}"</strong> at {organization}.
          </p>

          <p style={{ margin: "1rem 0" }}>
            Please find enclosed herewith the receipts No.{" "}
            <strong>{receiptNumber}</strong> dated{" "}
            <strong>{receiptDate}</strong> for claiming deduction under section{" "}
            {taxSection} of the Income Tax Act, 1961 on your donation.
          </p>

          <p style={{ margin: "1rem 0" }}>
            We sincerely appreciate your kind gesture of donating for a noble
            cause and we look forward to your continued guidance and support.
          </p>
        </main>

        <footer>
          <p style={{ margin: "1rem 0" }}>With warm regards,</p>

          <div style={{ margin: "1rem 0 1rem 0" }}>
            <p>Sincerely,</p>
            <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
              {senderName}
            </p>
          </div>

          <div
            style={{ fontSize: "0.9rem", color: "#666", marginTop: "1rem" }}
            className="dark:text-white"
          >
            <p>Encl: As above</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CoverLetter;
