"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/src/components/ui/button/Button";
import Badge from "@/src/components/ui/badge";

const Page = () => {
  const [activeTab, setActiveTab] = useState("news");
  const [readItems, setReadItems] = useState(new Set());
  const router = useRouter();

  // Sample IITK News
  const iitkNews = [
    {
      id: 1,
      title:
        "3rd Regulatory Manthan on the Draft Electricity (Amendment) Bill, 2025",
      date: "2025-03-15",
      excerpt:
        "Discussion on the proposed amendments to the electricity bill...",
      timestamp: new Date("2025-03-15").getTime(),
      isNew: true,
    },
    {
      id: 2,
      title: "Celebration of 86 years of Excellence on Foundation Day",
      date: "2025-03-10",
      excerpt:
        "Annual foundation day celebrations marking 86 years of academic excellence...",
      timestamp: new Date("2025-03-10").getTime(),
      isNew: false,
    },
    {
      id: 3,
      title: "IITKarvaan- New York",
      date: "2025-03-05",
      excerpt: "Alumni meet and networking event in New York...",
      timestamp: new Date("2025-03-05").getTime(),
      isNew: true,
    },
    {
      id: 4,
      title: "IITKarvaan- Boston",
      date: "2025-03-01",
      excerpt: "Boston chapter alumni gathering and industry interactions...",
      timestamp: new Date("2025-03-01").getTime(),
      isNew: false,
    },
    {
      id: 5,
      title: "IITKarvaan- Dallas",
      date: "2025-02-25",
      excerpt: "Dallas alumni meet focusing on research collaborations...",
      timestamp: new Date("2025-02-25").getTime(),
      isNew: true,
    },
    {
      id: 6,
      title: "IIT Karvaan- Bay Area",
      date: "2025-02-20",
      excerpt: "Silicon Valley alumni event and startup showcase...",
      timestamp: new Date("2025-02-20").getTime(),
      isNew: false,
    },
  ];

  // Sample Announcements
  const announcements = [
    {
      id: 1,
      title: "GATE-JAM 2026",
      date: "2025-03-12",
      excerpt:
        "Important dates and information for GATE-JAM 2026 examinations...",
      timestamp: new Date("2025-03-12").getTime(),
      isNew: true,
    },
    {
      id: 2,
      title: "Anti Ragging Committee and Squad Team 2025",
      date: "2025-03-08",
      excerpt:
        "Formation of anti-ragging committee for the academic year 2025...",
      timestamp: new Date("2025-03-08").getTime(),
      isNew: false,
    },
    {
      id: 3,
      title: "Faculty Opportunities - Department of Intelligent Systems (DIS)",
      date: "2025-03-03",
      excerpt: "Faculty positions available...",
      timestamp: new Date("2025-03-03").getTime(),
      isNew: true,
    },
    {
      id: 4,
      title: "58th Convocation 2025",
      date: "2025-02-28",
      excerpt:
        "Schedule and details for the 58th annual convocation ceremony...",
      timestamp: new Date("2025-02-28").getTime(),
      isNew: false,
    },
    {
      id: 5,
      title: "ARIIA Reports",
      date: "2025-02-22",
      excerpt: "Annual ARIIA innovation assessment reports now available...",
      timestamp: new Date("2025-02-22").getTime(),
      isNew: true,
    },
    {
      id: 6,
      title: "RFOs Vacancies",
      date: "2025-02-18",
      excerpt: "Research faculty officer positions...",
      timestamp: new Date("2025-02-18").getTime(),
      isNew: false,
    },
  ];

  // Load read items
  useEffect(() => {
    const saved = localStorage.getItem("readNewsItems");
    if (saved) setReadItems(new Set(JSON.parse(saved)));
  }, []);

  // Save read items
  useEffect(() => {
    localStorage.setItem("readNewsItems", JSON.stringify([...readItems]));
  }, [readItems]);

  const markAsRead = (key) => {
    const updated = new Set(readItems);
    updated.add(key);
    setReadItems(updated);
  };

  const handleNewsClick = (id) => {
    markAsRead(`news-${id}`);
    router.push(`/donor/campus-news/iitk-news/${id}`);
  };

  const handleAnnouncementClick = (id) => {
    markAsRead(`announcements-${id}`);
    router.push(`/donor/campus-news/announcements/${id}`);
  };

  const getSortedData = (data, type) =>
    data
      .map((item) => ({
        ...item,
        isUnread: !readItems.has(`${type}-${item.id}`),
      }))
      .sort((a, b) => {
        if (a.isUnread && !b.isUnread) return -1;
        if (!a.isUnread && b.isUnread) return 1;
        return b.timestamp - a.timestamp;
      })
      .slice(0, 4);

  // Calculate unread counts
  const getUnreadCount = (data, type) => {
    return data.filter((item) => !readItems.has(`${type}-${item.id}`)).length;
  };

  const getNewItemsCount = (data, type) => {
    return data.filter(
      (item) => item.isNew && !readItems.has(`${type}-${item.id}`)
    ).length;
  };

  const newsUnreadCount = getUnreadCount(iitkNews, "news");
  const announcementsUnreadCount = getUnreadCount(
    announcements,
    "announcements"
  );
  const newsNewCount = getNewItemsCount(iitkNews, "news");
  const announcementsNewCount = getNewItemsCount(
    announcements,
    "announcements"
  );

  const currentData =
    activeTab === "news"
      ? getSortedData(iitkNews, "news")
      : getSortedData(announcements, "announcements");

  const getBadge = (item, type) => {
    const unread = !readItems.has(`${type}-${item.id}`);
    if (unread && item.isNew)
      return (
        <Badge variant="solid" color="success" size="sm">
          New
        </Badge>
      );
    return null;
  };

  // Custom Badge Component for Tab Count
  const TabCountBadge = ({ count, type = "unread" }) => {
    if (count === 0) return null;

    const bgColor = type === "new" ? "bg-brand-500" : "bg-brand-500";

    return (
      <span
        className={`${bgColor} text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center ml-2`}
      >
        {count > 9 ? "9+" : count}
      </span>
    );
  };

  return (
    <div className="w-full h-full dark:text-white/90">
      {/* Header */}
      <div className="flex justify-between sm:flex-row flex-col sm:gap-0 gap-2">
        <h1 className="sm:text-xl text-md font-bold text-brand-500 dark:text-white">
          Campus News & Announcements
        </h1>

        <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 w-fit justify-center items-center">
          <button
            onClick={() => setActiveTab("news")}
            className={`px-1 py-2 rounded-md font-medium transition-all relative ${
              activeTab === "news"
                ? "bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <span className="flex items-center">
              IITK News
              <TabCountBadge count={newsUnreadCount} />
              {/* {newsNewCount > 0 && (
                <TabCountBadge count={newsNewCount} type="new" />
              )} */}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("announcements")}
            className={`px-6 py-2 rounded-md font-medium transition-all relative ${
              activeTab === "announcements"
                ? "bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <span className="flex items-center">
              Announcements
              <TabCountBadge count={announcementsUnreadCount} />
              {/* {announcementsNewCount > 0 && (
                <TabCountBadge count={announcementsNewCount} type="new" />
              )} */}
            </span>
          </button>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {currentData.map((item) => {
          const key = `${activeTab}-${item.id}`;
          const unread = !readItems.has(key);
          const badge = getBadge(item, activeTab);

          return (
            <div
              key={item.id}
              onClick={() =>
                activeTab === "news"
                  ? handleNewsClick(item.id)
                  : handleAnnouncementClick(item.id)
              }
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border ${
                unread
                  ? "border-brand-200 dark:border-brand-800"
                  : "border-gray-200 dark:border-gray-700"
              } p-6 relative`}
            >
              <div className="absolute top-4 right-4">{badge}</div>

              <h3
                className={`font-semibold text-lg text-gray-800 dark:text-white mb-2 line-clamp-2 ${
                  badge ? "pr-16" : ""
                }`}
              >
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {new Date(item.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                {item.excerpt}
              </p>

              <div className="mt-4">
                <span className="text-brand-600 dark:text-brand-400 text-sm font-medium hover:underline">
                  Read more →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <Button
          onClick={() =>
            router.push(
              activeTab === "news"
                ? "/donor/campus-news/iitk-news"
                : "/donor/campus-news/announcements"
            )
          }
          className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg relative"
        >
          <span className="flex items-center justify-center">
            View All {activeTab === "news" ? "News Updates" : "Announcements"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Page;
