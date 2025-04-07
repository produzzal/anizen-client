"use client";
import Loading from "@/app/loading";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleAnime = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [relatedAnime, setRelatedAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(relatedAnime);

  useEffect(() => {
    const fetchRelatedAnime = async () => {
      try {
        const res = await fetch(
          `https://anizen-server.onrender.com/api/all-anime`,
          {
            next: { revalidate: 10 },
          }
        );
        const data = await res.json();
        const shuffled = data.sort(() => 0.5 - Math.random());
        const random = shuffled.slice(0, 3);
        setRelatedAnime(random);
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };
    fetchRelatedAnime();
  }, []);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch(
          `https://anizen-server.onrender.com/api/anime/${id}`,
          {
            next: { revalidate: 10 },
          }
        );
        const data = await res.json();
        setAnime(data);
      } catch (error) {
        console.error("Error fetching anime data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!anime) {
    return <div>Anime not found</div>;
  }
  const lastItem = anime?.episodes[anime.episodes.length - 1];
  const qualities = anime.quality.split(", ");

  return (
    <div className="md:flex md:gap-4 w-full p-4 md:p-7">
      {/* First div (75-80% width) */}
      <div
        className=" md:w-[75%]
       p-4"
      >
        <h2 className=" text-sm md:text-xl font-serif text-gray-300">
          {anime.genres} (Hindi Dubbed)
        </h2>
        {anime?.type === "anime" ? (
          <h2 className="font-bold text-2xl md:text-4xl mt-3 font-serif text-gray-300">
            {anime.title} [Episode {lastItem?.episodeNumber} added !]
          </h2>
        ) : (
          <h2 className="font-bold text-2xl md:text-4xl mt-3 font-serif text-gray-300">
            {anime.title}
          </h2>
        )}

        <p className="mt-2 text-sm text-gray-400">{lastItem.createdAt}</p>
        <p className="text-center mt-8">{anime.title}</p>
        <img className="mt-5 mx-auto h-88 w-72" src={anime.image} alt="" />
        <p className="text-center mt-5 text-xl text-gray-300">
          {anime.seriesName}
        </p>
        <p className="text-center mt-3">IMDb Rating : {anime.rating}/10</p>
        <p className="text-center mt-3">Genres : {anime.genres}</p>
        <p className="text-center mt-3">
          Quality: {qualities[0]} | {qualities[1]} | {qualities[2]}
        </p>
        <p className="text-center mt-3">Language : {anime.languages}</p>
        <h1 className="text-center text-3xl text-yellow-500 mt-5 underline">
          Screenshots
        </h1>
        {anime.type === "anime" ? (
          <div className="grid md:grid-cols-2 mt-4 w-full md:w-[700px] mx-auto">
            {anime.screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
                className="md:w-[350px] md:h-[250px]"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 mt-4 w-full md:w-[700px] mx-auto">
            {anime.screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
                className="md:w-[350px] md:h-[250px]"
              />
            ))}
          </div>
        )}
        <Link href="/" className="flex justify-center underline text-2xl mt-7">
          [ How to Download ]
        </Link>
        <h1 className="text-4xl mt-5 text-center underline text-red-600 font-extrabold italic">
          Download Links
        </h1>
        <div>
          {anime?.episodes.map((episode) => (
            <div className="border-b-1 " key={episode.episodeNumber}>
              {anime?.type === "anime" ? (
                <h1 className="text-xl font-bold py-5 text-center">
                  <span className="text-yellow-500">
                    Episode {episode.episodeNumber}
                  </span>{" "}
                  ― <span className="text-gray-400">{episode.title}</span>
                </h1>
              ) : null}
              <div className="text-xl text-center pb-5">
                <Link
                  className="underline hover:text-orange-500 focus:text-orange-500"
                  href={episode?.downloadLinks["480p"]}
                >
                  {qualities[2]} Drive{" "}
                </Link>{" "}
                <span className="text-red-600">||</span>
                <Link
                  className="underline hover:text-orange-500 focus:text-orange-500"
                  href={episode?.downloadLinks["720p"]}
                >
                  {" "}
                  {qualities[1]} Drive{" "}
                </Link>{" "}
                <span className="text-red-600">||</span>
                <Link
                  className="underline  hover:text-orange-500 focus:text-orange-500"
                  href={episode?.downloadLinks["1080p"]}
                >
                  {" "}
                  {qualities[0]} Drive{" "}
                </Link>
              </div>
            </div>
          ))}
        </div>
        {anime?.type === "anime" ? (
          <h1 className="italic text-center mt-8">
            <span className="text-md font-bold text-red-600">Note: </span>
            More Episode Will Be Added Weekly...
          </h1>
        ) : null}
        <h1 className="text-center border-b-1 py-10">
          So Stay Tune With Us For Better Updates...
          <Link
            className="underline font-bold hover:text-orange-500"
            href="https://t.me/pro_d_uzzal
"
            target="_blank"
          >
            Follow Us On Telegram
          </Link>
        </h1>
      </div>

      {/* Second div (remaining width) */}
      <div className="flex-1 p-4">
        <h1 className="text-center text-xl mb-5 font-bold text-gray-300">
          Related More Actions:
        </h1>
        {relatedAnime?.map((anime) => (
          <Link key={anime._id} href={`/animes/${anime._id}`}>
            <div className="relative w-full h-[200px] md:h-[260px] mb-5">
              <img
                src={anime.image}
                alt="Cover"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute flex bg-opacity-1 text-white">
                <p className="text-xl p-1 bg-black/10 px-2 py-1 shadow-lg text-center ">
                  {anime.seriesName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SingleAnime;
