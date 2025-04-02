"use client";

import { useState, useEffect } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [animes, setAnimes] = useState([]);
  const [filteredAnimes, setFilteredAnimes] = useState([]);

  useEffect(() => {
    // Fetch anime list on component mount
    const fetchAnimes = async () => {
      try {
        const response = await fetch(
          "https://anizen-server.onrender.com/api/anime"
        );
        const data = await response.json();
        setAnimes(data);
      } catch (error) {
        console.error("Error fetching animes:", error);
      }
    };
    fetchAnimes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const filtered = animes.filter(
      (anime) =>
        anime.title.toLowerCase().includes(query.toLowerCase()) ||
        anime.seriesName.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredAnimes(filtered);
  };

  return (
    <div className="w-full p-4 bg-[#1F1226]">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-black"
        />
        <button
          type="submit"
          className="px-4 py-[9px] md:mr-4 bg-yellow-500 rounded-md text-white hover:bg-yellow-600"
        >
          Search
        </button>
      </form>

      {/* Search Results */}
      <div>
        {/* Show "No anime found" only when the filtered list is empty */}
        {query && filteredAnimes.length === 0 && (
          <p className="text-white text-center my-4">No anime found!</p>
        )}

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Show anime cards only if there are filtered animes */}
          {filteredAnimes.length > 0 ? (
            filteredAnimes.map((anime) => (
              <div
                key={anime._id}
                className="p-4 bg-gray-900 text-white rounded-lg"
              >
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-lg font-bold mt-2">{anime.title}</h3>
              </div>
            ))
          ) : (
            // Don't show this block if filteredAnimes has results
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
