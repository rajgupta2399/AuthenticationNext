"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";

const AnnouncementDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const newsId = params.id;

  // In a real app, you would fetch the news data based on the ID
  const newsData = {
    id: 1,
    title:
      "3rd Regulatory Manthan on the Draft Electricity (Amendment) Bill, 2025",
    date: "2025-03-15",
    content: `
      <p>Detailed content about the 3rd Regulatory Manthan event...</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, fugit! Porro voluptatibus, expedita voluptatem asperiores voluptas excepturi error debitis. Officia ab quod aspernatur, velit similique vel earum consectetur repellendus temporibus incidunt eius maxime, minima, in sequi qui veniam perspiciatis voluptatum soluta. Impedit fugiat saepe aliquid at consequuntur doloremque voluptatibus quod, delectus voluptates quae voluptas eum aut eius asperiores quidem nobis tempora explicabo! In necessitatibus facilis inventore, odit rem magnam aperiam beatae modi? Dignissimos eum necessitatibus doloribus accusantium ipsam at distinctio, eos suscipit consequatur error, voluptatum ratione laboriosam. In nihil similique fuga recusandae dolores totam quaerat iusto sequi minus, sed odio natus deleniti non soluta officia iure animi veritatis facilis. Quasi eveniet velit sit voluptatibus ut repellat deleniti soluta quia, commodi obcaecati perferendis pariatur accusantium ducimus porro odit officia. Distinctio reiciendis vero nam, officia accusantium asperiores id quia quam explicabo itaque iusto cupiditate voluptate mollitia temporibus quos vel recusandae voluptatem beatae corporis aliquid ad eum molestiae excepturi nemo? Asperiores rerum eligendi nulla culpa earum, fugiat totam ut dignissimos consequatur repellat nesciunt iusto molestiae sit ducimus soluta exercitationem? Dolor veniam obcaecati error! Commodi officia accusantium eius esse dolorum eum culpa, nam quae asperiores. Id placeat sequi delectus dicta? Atque repellendus numquam optio quis repudiandae modi similique fugiat nam enim expedita. Numquam, aperiam distinctio a impedit deleniti sint reiciendis totam id, vel, unde tenetur et. Aspernatur, asperiores fuga. Consectetur expedita, totam magnam veniam iste eius voluptatum adipisci exercitationem. Error, impedit molestias? Maxime quibusdam sit esse voluptates laboriosam eaque amet mollitia nemo quidem natus reprehenderit aut aliquam consectetur blanditiis atque dolorum, facere quas aspernatur voluptatibus. Architecto ipsum illum laborum labore non corporis, corrupti sed velit molestiae odit soluta quidem id reiciendis dolor accusamus beatae vero dolore officia tempore consequatur? Eaque, inventore voluptas repellat recusandae consectetur eius ab suscipit eligendi rem quidem ipsam, nam eum velit totam nesciunt alias ducimus ea minima ad? Illum similique reprehenderit explicabo natus totam deserunt consectetur, eaque quae ipsam aliquam, officia eligendi iure quia, reiciendis facilis assumenda odit recusandae pariatur odio. Laudantium modi adipisci reiciendis impedit eum odit consectetur. Vero aspernatur facere dignissimos rem a rerum explicabo maxime et debitis eaque, incidunt amet expedita doloremque accusantium sed eligendi. Sed temporibus nostrum saepe, pariatur excepturi maiores. Quisquam minima ad corrupti, amet possimus nisi at molestias. Dignissimos cupiditate tempore iusto possimus fuga distinctio eligendi dolore consequatur minima corporis ratione accusamus at deleniti aut enim, exercitationem magni numquam fugit rem explicabo non sunt reprehenderit sed? Libero suscipit, ex quae quo asperiores nemo eos earum nisi, excepturi ducimus rem eius reiciendis. Dolore sed deleniti obcaecati, voluptates quidem cupiditate accusamus nemo adipisci, veniam eligendi commodi dolorem cum. Facere in nam nemo odit facilis veritatis suscipit quae. Est labore modi, facere facilis, quos laborum harum quisquam sunt cupiditate delectus nobis nisi numquam quae earum corrupti totam alias, expedita recusandae dolor! Natus, eum dolore commodi esse et blanditiis! Voluptatum magni voluptatem temporibus nesciunt voluptas minus, laborum officiis delectus, odit quos, nobis at consequuntur aliquam soluta. Sit doloremque aperiam ratione nam sed, incidunt ab labore facilis laborum. Aut.</p>
      <p>Key topics included renewable energy integration, grid modernization, and consumer protection measures.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1758429295457-ba071dfb22eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RHJhZnQlMjBFbGVjdHJpY2l0eSUyMGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D", // optional
    category: "Event",
  };

  return (
    <div className="w-full h-full dark:text-white/90">
      <div className="flex justify-end">
        <button
          onClick={() => router.back()}
          className="text-brand-600 dark:text-brand-400 hover:underline mb-6"
        >
          ← Back to News
        </button>
      </div>

      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="mb-6">
          <span className="inline-block bg-brand-100 dark:bg-brand-900 text-brand-800 dark:text-brand-200 px-3 py-1 rounded-full text-sm font-medium">
            {newsData.category}
          </span>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {new Date(newsData.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          {newsData.title}
        </h1>
        {newsData.image && (
          <div className="mb-6">
            <img
              src={newsData.image}
              alt={newsData.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: newsData.content }}
        />
      </article>
    </div>
  );
};

export default AnnouncementDetailPage;
