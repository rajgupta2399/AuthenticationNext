"use client";
import React from "react";
import { useRouter } from "next/navigation";

const IITKNewsPage = () => {
  const router = useRouter();

  const iitkNews = [
    {
      id: 1,
      title:
        "3rd Regulatory Manthan on the Draft Electricity (Amendment) Bill, 2025",
      date: "2025-03-15",
      excerpt:
        "Discussion on the proposed amendments to the electricity bill and its impact on the power sector. Experts from across the country gather to deliberate on the proposed changes.",
      isNew: true,
      isLatest: true,
      isFeatured: true,
    },
    {
      id: 2,
      title: "Celebration of 86 years of Excellence on Foundation Day",
      date: "2025-03-10",
      excerpt:
        "Annual foundation day celebrations marking 86 years of academic excellence with special guests, cultural events, and awards ceremony for outstanding achievements.",
      isNew: true,
      isLatest: false,
      isFeatured: false,
    },
    {
      id: 3,
      title: "IITKarvaan- New York",
      date: "2025-03-05",
      excerpt:
        "Alumni meet and networking event in New York featuring keynote speakers from industry and academia, fostering connections among IITK graduates.",
      isNew: false,
      isLatest: false,
      isFeatured: false,
    },
    {
      id: 4,
      title: "IITKarvaan- Boston",
      date: "2025-03-01",
      excerpt:
        "Boston chapter alumni gathering and industry interactions with focus on research collaborations and startup opportunities in the New England region.",
      isNew: false,
      isLatest: false,
      isFeatured: true,
    },
    {
      id: 5,
      title: "IITKarvaan- Dallas",
      date: "2025-02-25",
      excerpt:
        "Dallas alumni meet focusing on research collaborations, technology transfer, and strengthening the IITK network in the southern United States.",
      isNew: false,
      isLatest: false,
      isFeatured: false,
    },
    {
      id: 6,
      title: "IIT Karvaan- Bay Area",
      date: "2025-02-20",
      excerpt:
        "Silicon Valley alumni event and startup showcase featuring successful entrepreneurs from IITK and discussions on emerging technologies.",
      isNew: false,
      isLatest: false,
      isFeatured: false,
    },
  ];

  // Sort news by date (newest first) and then by isLatest flag
  const sortedNews = [...iitkNews].sort((a, b) => {
    // First sort by date (newest first)
    const dateComparison = new Date(b.date) - new Date(a.date);
    if (dateComparison !== 0) return dateComparison;

    // If same date, put latest news first
    if (a.isLatest && !b.isLatest) return -1;
    if (!a.isLatest && b.isLatest) return 1;

    return 0;
  });

  const handleNewsClick = (id) => {
    router.push(`/donor/campus-news/iitk-news/${id}`);
  };

  // Function to determine if news is recent (within last 7 days)
  const isRecentNews = (newsDate) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return new Date(newsDate) > sevenDaysAgo;
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

  const FeaturedBadge = () => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
      Featured
    </span>
  );

  const HotBadge = () => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
      Hot
    </span>
  );

  return (
    <div className="w-full h-full dark:text-white/90">
      {/* Header */}
      <div className=" flex justify-between">
        <h1 className="sm:text-xl text-md font-bold text-brand-500 dark:text-white">
          IITK News Updates
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

      {/* News List */}
      <div className="space-y-6">
        {sortedNews.map((news, index) => (
          <div
            key={news.id}
            onClick={() => handleNewsClick(news.id)}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 p-6 relative hover:border-brand-300 dark:hover:border-brand-600"
          >
            {/* Badges Container - Top Right */}
            <div className="flex flex-wrap gap-2 mb-3 justify-between items-start">
              <div className="flex flex-wrap gap-2">
                {/* Latest Badge - Only for the first item */}
                {index === 0 && news.isLatest && <LatestBadge />}

                {/* New Badge - show if news is new OR recent (within 7 days) */}
                {(news.isNew || isRecentNews(news.date)) && !news.isLatest && (
                  <NewBadge />
                )}

                {/* Featured Badge */}
                {news.isFeatured && <FeaturedBadge />}

                {/* Hot Badge for very recent news (within 2 days) */}
                {isRecentNews(news.date) &&
                  new Date(news.date) >
                    new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) && (
                    <HotBadge />
                  )}
              </div>

              {/* Date */}
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {new Date(news.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* News Title */}
            <h3 className="font-semibold text-lg xs:text-xl text-gray-800 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {news.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {news.excerpt}
            </p>

            {/* Read More */}
            <div className="flex items-center justify-between">
              <span className="text-brand-600 dark:text-brand-400 font-medium group-hover:underline transition-all">
                Read full story →
              </span>

              {/* Reading time estimate */}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {Math.ceil(news.excerpt.split(" ").length / 200)} min read
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IITKNewsPage;
