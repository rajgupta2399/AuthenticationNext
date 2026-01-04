"use client";
import React from "react";
import { useRouter } from "next/navigation";

const AnnouncementsPage = () => {
  const router = useRouter();

  const announcements = [
    {
      id: 1,
      title: "GATE-JAM 2026 Registration Now Open",
      date: "2025-03-15",
      excerpt:
        "Registration portal for GATE-JAM 2026 examinations is now live. Important dates and application process details...",
      content: "Full content for announcement 1...",
      category: "Examination",
      isNew: true,
      isLatest: true,
      isUrgent: true,
    },
    {
      id: 2,
      title: "Campus Infrastructure Development Plan",
      date: "2025-03-12",
      excerpt:
        "New infrastructure development initiatives including smart classrooms and research facilities upgrade...",
      content: "Full content for announcement 2...",
      category: "Infrastructure",
      isNew: true,
      isLatest: false,
      isUrgent: false,
    },
    {
      id: 3,
      title: "Summer Internship Program 2025",
      date: "2025-03-10",
      excerpt:
        "Applications invited for summer internship programs across various departments and research centers...",
      content: "Full content for announcement 3...",
      category: "Academics",
      isNew: false,
      isLatest: false,
      isUrgent: false,
    },
    {
      id: 4,
      title: "Research Grant Opportunities",
      date: "2025-03-08",
      excerpt:
        "Multiple research grant opportunities available for faculty and PhD students in emerging technologies...",
      content: "Full content for announcement 4...",
      category: "Research",
      isNew: false,
      isLatest: false,
      isUrgent: false,
    },
    {
      id: 5,
      title: "Hostel Maintenance Schedule",
      date: "2025-03-05",
      excerpt:
        "Scheduled maintenance for hostel facilities during the upcoming semester break. Important notices for residents...",
      content: "Full content for announcement 5...",
      category: "Administration",
      isNew: false,
      isLatest: false,
      isUrgent: false,
    },
    {
      id: 6,
      title: "Alumni Meet 2025 - Save the Date",
      date: "2025-03-01",
      excerpt:
        "Annual alumni meet scheduled for December 2025. Preliminary information and registration details...",
      content: "Full content for announcement 6...",
      category: "Events",
      isNew: false,
      isLatest: false,
      isUrgent: false,
    },
  ];

  // Sort announcements by date (newest first) and then by isLatest flag
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    // First sort by date (newest first)
    const dateComparison = new Date(b.date) - new Date(a.date);
    if (dateComparison !== 0) return dateComparison;

    // If same date, put latest announcements first
    if (a.isLatest && !b.isLatest) return -1;
    if (!a.isLatest && b.isLatest) return 1;

    // Then by urgent flag
    if (a.isUrgent && !b.isUrgent) return -1;
    if (!a.isUrgent && b.isUrgent) return 1;

    return 0;
  });

  const handleAnnouncementClick = (id) => {
    router.push(`/donor/campus-news/announcements/${id}`);
  };

  // Function to determine if announcement is recent (within last 7 days)
  const isRecentAnnouncement = (announcementDate) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return new Date(announcementDate) > sevenDaysAgo;
  };

  // Custom Badge Components
  const LatestBadge = () => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800">
      Latest
    </span>
  );

  const NewBadge = () => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800">
      New
    </span>
  );

  const UrgentBadge = () => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
      Urgent
    </span>
  );

  const CategoryBadge = ({ category }) => {
    const categoryColors = {
      Examination:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      Infrastructure:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      Academics:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
      Research:
        "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 border-teal-200 dark:border-teal-800",
      Administration:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800",
      Events:
        "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 border-pink-200 dark:border-pink-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
          categoryColors[category] || categoryColors.Administration
        }`}
      >
        {category}
      </span>
    );
  };

  return (
    <div className="w-full h-full dark:text-white/90">
      {/* Header */}
      <div className="mb-4 flex justify-between">
        <h1 className="sm:text-xl text-md font-bold text-brand-500 dark:text-white">
          Announcements
        </h1>
        <div className="sm:block hidden">
          <button
            onClick={() => router.back()}
            className="text-brand-600 dark:text-brand-400 hover:underline mb-4"
          >
            ← Back to Campus News
          </button>
        </div>
        <div className="sm:hidden block">
          <button
            onClick={() => router.back()}
            className="text-brand-600 dark:text-brand-400 hover:underline mb-4"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-6">
        {sortedAnnouncements.map((announcement, index) => (
          <div
            key={announcement.id}
            onClick={() => handleAnnouncementClick(announcement.id)}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 p-6 hover:border-brand-300 dark:hover:border-brand-600"
          >
            {/* Badges Container - Top Row */}
            <div className="flex flex-wrap gap-2 mb-3 justify-between items-start">
              <div className="flex flex-wrap gap-2">
                {/* Latest Badge - Only for the first item */}
                {index === 0 && announcement.isLatest && <LatestBadge />}

                {/* New Badge - show if announcement is new OR recent (within 7 days) */}
                {(announcement.isNew ||
                  isRecentAnnouncement(announcement.date)) &&
                  !announcement.isLatest && <NewBadge />}

                {/* Urgent Badge */}
                {announcement.isUrgent && <UrgentBadge />}
              </div>

              {/* Category Badge */}
              <CategoryBadge category={announcement.category} />
            </div>

            {/* Date */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {new Date(announcement.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            {/* Announcement Title */}
            <h3 className="font-semibold text-lg xs:text-xl text-gray-800 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {announcement.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {announcement.excerpt}
            </p>

            {/* Read More */}
            <div className="flex items-center justify-between">
              <span className="text-brand-600 dark:text-brand-400 font-medium group-hover:underline transition-all">
                View details →
              </span>

              {/* Reading time estimate */}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {Math.ceil(announcement.excerpt.split(" ").length / 200)} min
                read
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
