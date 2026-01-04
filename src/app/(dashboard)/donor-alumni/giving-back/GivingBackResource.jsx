"use client";
import React, { useState } from "react";

const GivingBackCards = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [isPopupBlocked, setIsPopupBlocked] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Card data array with images, descriptions, and URLs
  const cardData = [
    {
      id: 1,
      title: "Annual Giving",
      description:
        "Support the ongoing growth and development of our institution through annual contributions that help fund scholarships, research, and campus improvements.",
      imageUrl:
        "https://publicbucket-development.zohostratus.in/Images/Annual_Giving.png",
      redirectUrl: "https://iitk.ac.in/dora/annualgiving/",
    },
    {
      id: 2,
      title: "Batch Initiative",
      description:
        "Join your batchmates in collective giving efforts that create meaningful impact through targeted projects and initiatives specific to your graduating class.",
      imageUrl:
        "https://publicbucket-development.zohostratus.in/Images/Batch_Initiative.png",
      redirectUrl: "https://iitk.ac.in/dora/annualgiving/",
    },
    {
      id: 3,
      title: "Community Welfare",
      description:
        "Contribute to programs that support the well-being of our extended community, including healthcare initiatives, educational outreach, and social welfare projects.",
      imageUrl:
        "https://publicbucket-development.zohostratus.in/Images/Community_Welfare.png",
      redirectUrl: "https://iitk.ac.in/dora/annualgiving/",
    },
    {
      id: 4,
      title: "Current Campaigns",
      description:
        "Explore and support our active fundraising campaigns addressing immediate needs and opportunities across campus and beyond.",
      imageUrl:
        "https://publicbucket-development.zohostratus.in/Images/current.png",
      redirectUrl: "https://iitk.ac.in/dora/annualgiving/",
    },
    {
      id: 5,
      title: "M.A.G.I.K.",
      description:
        "Monthly Alumni Giving for IIT Kanpur - Make a lasting impact through convenient monthly contributions that provide sustained support for our institution's mission.",
      imageUrl:
        "https://publicbucket-development.zohostratus.in/Images/magik.jpeg",
      redirectUrl: "https://iitk.ac.in/dora/annualgiving/",
    },
    {
      id: 6,
      title: "Students",
      description:
        "Help deserving students achieve their academic dreams by supporting scholarship funds that remove financial barriers to education.",
      imageUrl:
        "https://publicbucket-development.zohostratus.in/Images/students.png",
      redirectUrl: "https://iitk.ac.in/dora/annualgiving/",
    },
    {
      id: 7,
      title: "Departments",
      description:
        "Support specific academic departments to enhance research capabilities, upgrade facilities, and provide specialized resources for students and faculty.",
      imageUrl:
        "https://publicbucket-development.zohostratus.in/Images/Departments.png",
      redirectUrl: "https://iitk.ac.in/dora/annualgiving/",
    },
    {
      id: 8,
      title: "Faculty",
      description:
        "Contribute to faculty development programs, research grants, and initiatives that attract and retain top academic talent at IIT Kanpur.",
      imageUrl:
        "https://publicbucket-development.zohostratus.in/Images/faculty.png",
      redirectUrl: "https://iitk.ac.in/dora/annualgiving/",
    },
    {
      id: 9,
      title: "Health & Wellness",
      description:
        "Support healthcare facilities, mental health services, and wellness programs that ensure the well-being of our campus community.",
      imageUrl:
        "https://publicbucket-development.zohostratus.in/Images/health%26welness.png",
      redirectUrl: "https://iitk.ac.in/dora/annualgiving/",
    },
    {
      id: 10,
      title: "Infrastructure",
      description:
        "Help build and maintain state-of-the-art infrastructure including laboratories, classrooms, sports facilities, and student centers.",
      imageUrl:
        "https://publicbucket-development.zohostratus.in/Images/infra.png",
      redirectUrl: "https://iitk.ac.in/dora/annualgiving/",
    },
    {
      id: 11,
      title: "Planned Giving",
      description:
        "Create a lasting legacy through planned giving options including bequests, trusts, and other long-term financial planning instruments.",
      imageUrl:
        "https://publicbucket-development.zohostratus.in/Images/planned.png",
      redirectUrl: "https://iitk.ac.in/dora/annualgiving/",
    },
    {
      id: 12,
      title: "R&D Facilities",
      description:
        "Support cutting-edge research and development facilities that drive innovation and maintain IIT Kanpur's position as a premier research institution.",
      imageUrl:
        "https://publicbucket-development.zohostratus.in/Images/R%26D%20facilites.png",
      redirectUrl: "https://iitk.ac.in/dora/annualgiving/",
    },
  ];

  const handleRedirect = (redirectUrl) => {
    setIsRedirecting(true);

    // Try to open in new tab
    const newWindow = window.open(`${redirectUrl}`, "_blank");

    // Check if popup was blocked
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      setIsPopupBlocked(true);
      setIsRedirecting(false);
    } else {
      setIsPopupBlocked(false);
      // Reset to default UI after a short delay
      setTimeout(() => {
        setIsRedirecting(false);
      }, 1500);
    }
  };

  const handleCardHover = (cardId) => {
    setActiveCard(cardId);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  return (
    <div className="">
      <div className="">
        {/* Butch Initiative Section */}
        <div className="">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
            {cardData.map((card) => (
              <div
                key={card.id}
                className="relative bg-white dark:bg-gray-800 rounded-md shadow-md overflow-hidden cursor-pointer group w-full sm:h-[350px] h-[300px]"
                onMouseEnter={() => handleCardHover(card.id)}
                onMouseLeave={handleCardLeave}
                onClick={() => handleRedirect(card.redirectUrl)}
              >
                {/* Card Image */}
                <div className="absolute inset-0 h-full w-full">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay that appears on hover */}
                  <div
                    className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                      activeCard === card.id ? "opacity-70" : "opacity-0"
                    }`}
                  ></div>

                  {/* Description overlay - appears on top during hover */}
                  <div
                    className={`absolute inset-0 flex flex-col justify-center p-4 transition-all duration-300 ${
                      activeCard === card.id
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="text-white text-center">
                      <p className="text-sm leading-tight mb-3 line-clamp-4">
                        {card.description}
                      </p>
                      <div className="flex items-center justify-center text-brand-300 font-semibold text-sm">
                        <span>Learn more</span>
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Title - Always visible */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h3 className="text-white text-center font-bold text-sm">
                    {card.title}
                  </h3>
                </div>

                {/* Hover Indicator */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GivingBackCards;
