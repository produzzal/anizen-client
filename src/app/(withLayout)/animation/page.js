import Link from "next/link";

const Animes = async () => {
  const res = await fetch(
    "https://anizen-server.onrender.com/api/animation&cartoon"
  );
  const animeData = await res.json();

  return (
    <div className="w-full py-4 px-4 md:px-7 border-b-1 border-gray-500">
      <h1 className="border-l-3 border-red-600 pl-3 mb-5 mt-15 text-xl font-bold">
        All Animation & Cartoon That You Search For
      </h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {animeData?.map((anime) => (
          <Link
            href={`/animes/${anime._id.toString()}`}
            key={anime._id.toString()}
          >
            <div className="relative w-full h-[200px] md:h-[260px]">
              <img
                src={anime.image}
                alt="Cover"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bg-opacity-1 text-white">
                <p className="text-[12px] bg-red-600 px-2 py-1">Latest</p>
              </div>
              <div className="absolute inset-0  bg-opacity-1 text-white flex flex-col justify-end">
                <div className="flex justify-end">
                  <p className="text-[12px] bg-gray-600 p-1">
                    ⭐ {anime.rating}
                  </p>
                </div>
              </div>
              <div></div>
            </div>
            <div>
              <p className="text-md mt-2 truncate">{anime.title}</p>
              <p className="text-sm text-gray-500">{anime.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Animes;
