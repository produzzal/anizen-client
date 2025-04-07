import next from "next";
import Link from "next/link";

const LatestAnime = async () => {
  const res = await fetch("https://anizen-server.onrender.com/api/anime", {
    next: { revalidate: 10 },
  });
  const data = await res.json();
  const animeData = data.reverse().slice(0, 30);

  return (
    <div className="w-full py-4 px-4 md:px-7 border-b-1 border-gray-500">
      <div className="flex items-center justify-between">
        <h1 className="border-l-3 border-red-600 pl-3 mb-5 mt-15 text-xl font-bold">
          Latest Anime
        </h1>
        <a
          href="/animes"
          className="mt-8 md:mt-3 p-2 rounded text-sm bg-red-600"
        >
          See All
        </a>
      </div>
      <div className="grid grid-cols-3 gap-2 md:gap-4 md:grid-cols-5">
        {animeData?.map((anime) => (
          <Link className="mb-3" href={`/animes/${anime._id}`} key={anime._id}>
            <div className="relative w-full h-[190px] md:h-[260px]">
              <img
                src={anime.image}
                alt="Cover"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bg-opacity-1 text-white">
                <p className="text-[10px] md:text-[12px] bg-red-600 px-2 py-1">
                  Latest
                </p>
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
              <p className="text-sm md:text-md mt-2 truncate">{anime.title}</p>
              <p className="text-sm text-gray-500">{anime.releaseYear}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestAnime;
