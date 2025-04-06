"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DemoSlider = () => {
  const [movies, setMovies] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const res = await fetch("https://anizen-server.onrender.com/api/movie");
        const data = await res.json();
        const shuffled = data.sort(() => 0.5 - Math.random());
        const random = shuffled.slice(0, 5);
        setMovies(random);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchAnimes();
  }, []);

  const handleClick = (movieLink) => {
    router.push(`/animes/${movieLink}`);
  };

  return (
    <div className="w-full py-4 px-4 md:px-7 border-b-1 border-gray-500">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full h-full"
      >
        {movies?.map((movie) => (
          <SwiperSlide key={movie._id}>
            <div
              onClick={() => {
                handleClick(movie._id);
              }}
              className="relative w-full h-[200px] md:h-[260px]"
            >
              <img
                src={movie.image}
                alt="Cover"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0  bg-opacity-1 text-white flex flex-col justify-end">
                <p className="text-xl  pl-4">{movie.title}</p>
                <div className="flex justify-between">
                  <p className="text-sm pl-4">{movie.year}</p>
                  <p className="text-sm bg-red-600 p-[6px]">{movie.type}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DemoSlider;
