"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const AnimeForm = () => {
  const { updateId } = useParams();

  const [anime, setAnime] = useState({
    title: "",
    genres: "",
    quality: "",
    image: "",
    seriesName: "",
    releaseYear: "",
    rating: "",
    languages: "",
    screenshots: ["", "", "", ""],
    episodes: [
      {
        episodeNumber: "",
        title: "",
        downloadLinks: { "480p": "", "720p": "", "1080p": "" },
      },
    ],
  });

  // Fetch previous data
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch(
          `https://anizen-server.onrender.com/api/anime/${updateId}`
        );
        if (res.ok) {
          const data = await res.json();
          const { _id, ...animeData } = data; // `_id` বাদ দিন
          setAnime(animeData);
        }
      } catch (error) {
        console.error("Failed to fetch anime:", error);
      }
    };

    if (updateId) fetchAnime();
  }, [updateId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnime((prev) => ({ ...prev, [name]: value }));
  };

  // Handle screenshot change
  const handleScreenshotChange = (index, e) => {
    const newScreenshots = [...anime.screenshots];
    newScreenshots[index] = e.target.value;
    setAnime((prev) => ({ ...prev, screenshots: newScreenshots }));
  };

  // Handle episode changes
  const handleEpisodeChange = (index, e) => {
    const { name, value } = e.target;
    setAnime((prev) => {
      const newEpisodes = [...prev.episodes];
      newEpisodes[index] = { ...newEpisodes[index], [name]: value };
      return { ...prev, episodes: newEpisodes };
    });
  };

  // Handle download link change
  const handleDownloadLinkChange = (index, quality, value) => {
    setAnime((prev) => {
      const newEpisodes = [...prev.episodes];
      newEpisodes[index].downloadLinks[quality] = value;
      return { ...prev, episodes: newEpisodes };
    });
  };

  // Add new episode
  const addEpisode = () => {
    setAnime((prev) => ({
      ...prev,
      episodes: [
        ...prev.episodes,
        {
          episodeNumber: "",
          title: "",
          downloadLinks: { "480p": "", "720p": "", "1080p": "" },
        },
      ],
    }));
  };

  // Submit form with PATCH request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!updateId) {
      toast.error("Anime ID is missing!");
      return;
    }

    try {
      const response = await fetch(
        `https://anizen-server.onrender.com/api/anime/${updateId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(anime),
        }
      );
      console.log(response);

      if (response.ok) {
        const result = await response.json();
        toast.success("Updated successfully");
      } else {
        toast.error("Updated failed");
      }
    } catch (error) {
      toast.error("Error updating data");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Anime</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">Anime Title</label>
        <input
          type="text"
          name="title"
          value={anime.title}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800"
        />

        <label className="block">Genres</label>
        <input
          type="text"
          name="genres"
          value={anime.genres}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800"
        />

        <label className="block">Quality</label>
        <input
          type="text"
          name="quality"
          value={anime.quality}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800"
        />

        <label className="block">Image URL</label>
        <input
          type="text"
          name="image"
          value={anime.image}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800"
        />

        <label className="block">Series Name</label>
        <input
          type="text"
          name="seriesName"
          value={anime.seriesName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800"
        />

        <label className="block">Release Year</label>
        <input
          type="number"
          name="releaseYear"
          value={anime.releaseYear}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800"
        />

        <label className="block">Rating</label>
        <input
          type="number"
          name="rating"
          value={anime.rating}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800"
        />

        <label className="block">Languages</label>
        <input
          type="text"
          name="languages"
          value={anime.languages}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800"
        />

        <h3 className="text-lg font-semibold">Screenshots</h3>
        {anime.screenshots.map((screenshot, index) => (
          <div key={index}>
            <label className="block">{`Screenshot ${index + 1}`}</label>
            <input
              type="text"
              value={screenshot}
              onChange={(e) => handleScreenshotChange(index, e)}
              className="w-full p-2 rounded bg-gray-800"
            />
          </div>
        ))}

        <h3 className="text-lg font-semibold">Episodes</h3>
        {anime.episodes.map((episode, index) => (
          <div key={index} className="space-y-2">
            <label className="block">Episode Number</label>
            <input
              type="text" // Change to "text" to handle it as a string
              name="episodeNumber"
              value={episode.episodeNumber}
              onChange={(e) => handleEpisodeChange(index, e)}
              className="w-full p-2 rounded bg-gray-800"
            />

            <label className="block">Episode Title</label>
            <input
              type="text"
              name="title"
              value={episode.title}
              onChange={(e) => handleEpisodeChange(index, e)}
              className="w-full p-2 rounded bg-gray-800"
            />

            <h4 className="text-md font-semibold">Download Links</h4>
            {["480p", "720p", "1080p"].map((quality) => (
              <div key={quality}>
                <label className="block">{`${quality} Download Link`}</label>
                <input
                  type="text"
                  value={episode.downloadLinks[quality]}
                  onChange={(e) =>
                    handleDownloadLinkChange(index, quality, e.target.value)
                  }
                  className="w-full p-2 rounded bg-gray-800"
                />
              </div>
            ))}
          </div>
        ))}

        <button
          type="button"
          onClick={addEpisode}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Episode
        </button>
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AnimeForm;
