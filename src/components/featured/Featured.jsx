"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Featured = () => {
  const [animeList, setAnimeList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch("https://anizen-server.onrender.com/api/anime");
        if (!res.ok) throw new Error("Failed to fetch anime");
        const data = await res.json();
        setAnimeList(data);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };

    fetchAnime();
  }, []);

  const handleClick = (animeLink) => {
    router.push(`/animes/${animeLink}`);
  };

  return (
    <div className="w-full py-4 px-4 md:px-7 border-b-1 border-gray-500">
      <h1 className="border-l-3 border-red-600 pl-3 mb-5 mt-15 text-xl font-bold">
        Featured
      </h1>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={15}
        pagination={{ clickable: true, type: "none" }}
        breakpoints={{
          0: { slidesPerView: 2 },
          1024: { slidesPerView: 6 },
        }}
        className="w-full h-full"
      >
        {animeList.slice(0, 10).map((anime) => (
          <SwiperSlide key={anime._id}>
            <div
              onClick={() => {
                handleClick(anime._id);
              }}
              className="relative w-full h-[200px] md:h-[260px]"
            >
              <img
                src={anime.image}
                alt="Cover"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bg-opacity-1 text-white">
                <p className="text-[12px] bg-red-600 p-1">Feature</p>
              </div>
              <div className="absolute inset-0  bg-opacity-1 text-white flex flex-col justify-end">
                <div className="flex justify-end">
                  <p className="text-[12px] bg-gray-600 p-1">⭐ 7</p>
                </div>
              </div>
              <div></div>
            </div>
            <div>
              <p className="text-md mt-2 truncate">{anime.title}</p>
              <p className="text-sm text-gray-500">{anime.releaseYear}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Featured;
