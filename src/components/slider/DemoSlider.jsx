"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const DemoSlider = () => {
  const movies = [
    {
      id: 1,
      title: "The Colors of Fire (2022)",
      year: "2022",
      image: "https://i.ibb.co.com/ZRtX5q7t/d0-Kslr-Ou-Qk6as-XCGxzb-Ca8-A3d-ZU.jpg",
      type: "MOVIE",
    },
    {
      id: 2,
      title: "Gamera - Rebirth",
      year: "Mar 28, 2025",
      image: "https://i.ibb.co.com/KcxMN1bk/41-NGOCSj-DGv-Ny-CSR8-LP0-Argegx-H.jpg",
      type: "MOVIE",
    },
    {
      id: 3,
      title: "Another Movie",
      year: "2023",
      image: "https://i.ibb.co.com/YTJBzDD7/2l-BBZb-BXEeu-Ck-Rrk4rgi0017-NKu-1.jpg",
      type: "MOVIE",
    },
    {
      id: 4,
      title: "Another Movie",
      year: "2023",
      image: "https://i.ibb.co.com/YTJBzDD7/2l-BBZb-BXEeu-Ck-Rrk4rgi0017-NKu-1.jpg",
      type: "MOVIE",
    },
    {
      id: 5,
      title: "Another Movie",
      year: "2023",
      image: "https://i.ibb.co.com/YTJBzDD7/2l-BBZb-BXEeu-Ck-Rrk4rgi0017-NKu-1.jpg",
      type: "MOVIE",
    },
    {
      id: 6,
      title: "Another Movie",
      year: "2023",
      image: "https://i.ibb.co.com/YTJBzDD7/2l-BBZb-BXEeu-Ck-Rrk4rgi0017-NKu-1.jpg",
      type: "MOVIE",
    },
    {
      id: 7,
      title: "Another Movie",
      year: "2023",
      image: "https://i.ibb.co.com/YTJBzDD7/2l-BBZb-BXEeu-Ck-Rrk4rgi0017-NKu-1.jpg",
      type: "MOVIE",
    },
    {
      id: 8,
      title: "Another Movie",
      year: "2023",
      image: "https://i.ibb.co.com/YTJBzDD7/2l-BBZb-BXEeu-Ck-Rrk4rgi0017-NKu-1.jpg",
      type: "MOVIE",
    },
  ];

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
        {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
   <div className="relative w-full h-[200px] md:h-[260px]">
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


