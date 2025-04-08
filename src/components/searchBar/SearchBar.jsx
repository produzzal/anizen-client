"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [animes, setAnimes] = useState([]);
  const [filteredAnimes, setFilteredAnimes] = useState([]);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await fetch(
          "https://anizen-server.onrender.com/api/all-anime"
        );
        const data = await response.json();
        setAnimes(data);
      } catch (error) {
        console.error("Error fetching animes:", error);
      }
    };
    fetchAnimes();
  }, []);

  // 🔄 Auto filter while typing
  useEffect(() => {
    const filtered = animes.filter(
      (anime) =>
        anime.title.toLowerCase().includes(query.toLowerCase()) ||
        anime.seriesName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAnimes(filtered);
  }, [query, animes]);

  return (
    <div className="w-full p-4 bg-[#1F1226]">
      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-black"
        />
        {/* Button */}
        <button
          type="button"
          className="px-4 py-[9px] md:mr-4 bg-yellow-500 rounded-md text-white hover:bg-yellow-600"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div>
        {/* Only show "No anime found" when no query or no results */}
        {query && filteredAnimes.length === 0 && (
          <p className="text-white text-center my-4">No anime found!</p>
        )}

        {/* Only display results after typing */}
        {query && filteredAnimes.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAnimes.map((anime) => (
              <Link
                href={`/animes/${anime._id}`}
                key={anime._id}
                className="p-4 bg-gray-900 text-white rounded-lg"
              >
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-lg font-bold mt-2">{anime.title}</h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
