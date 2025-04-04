"use client";

import { useState } from "react";

const AnimeForm = () => {
  const [anime, setAnime] = useState({
    title: "",
    genres: "",
    quality: "",
    image: "",
    seriesName: "",
    type: "",
    releaseYear: "",
    createdAt: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnime((prev) => ({ ...prev, [name]: value }));
  };

  const handleEpisodeChange = (index, e) => {
    const { name, value } = e.target;
    setAnime((prev) => {
      const newEpisodes = [...prev.episodes];
      newEpisodes[index][name] = value;
      return { ...prev, episodes: newEpisodes };
    });
  };

  const handleDownloadLinkChange = (index, quality, value) => {
    setAnime((prev) => {
      const newEpisodes = [...prev.episodes];
      newEpisodes[index].downloadLinks[quality] = value;
      return { ...prev, episodes: newEpisodes };
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://anizen-server.onrender.com/api/anime",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(anime),
        }
      );
      console.log(response);

      if (response.ok) {
        const result = await response.json();
        window.location.reload();
        console.log("Data submitted successfully:", result);
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Anime Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={anime.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 rounded bg-gray-800"
          required
        />
        <input
          type="text"
          name="genres"
          value={anime.genres}
          onChange={handleChange}
          placeholder="Genres"
          className="w-full p-2 rounded bg-gray-800"
          required
        />
        <input
          type="text"
          name="quality"
          value={anime.quality}
          onChange={handleChange}
          placeholder="Quality"
          className="w-full p-2 rounded bg-gray-800"
          required
        />
        <input
          type="text"
          name="image"
          value={anime.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 rounded bg-gray-800"
          required
        />
        <input
          type="text"
          name="seriesName"
          value={anime.seriesName}
          onChange={handleChange}
          placeholder="Series Name"
          className="w-full p-2 rounded bg-gray-800"
          required
        />
        <select
          name="type"
          value={anime.seriesType}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        >
          <option value="">Select Type</option>
          <option value="anime">Anime</option>
          <option value="movie">Movie</option>
          <option value="animation & cartoon">Animation & Cartoon</option>
          <option value="tv series">Tv Series</option>
        </select>

        <input
          type="number"
          name="releaseYear"
          value={anime.releaseYear}
          onChange={handleChange}
          placeholder="Release Year"
          className="w-full p-2 rounded bg-gray-800"
          required
        />
        <input
          type="text"
          name="createdAt"
          value={new Date().toLocaleDateString("en-GB").replace(/\//g, "-")}
          onChange={handleChange}
          placeholder="Created At"
          className="w-full p-2 rounded bg-gray-800"
          required
        />

        <input
          type="number"
          name="rating"
          value={anime.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="w-full p-2 rounded bg-gray-800"
          required
        />
        <input
          type="text"
          name="languages"
          value={anime.languages}
          onChange={handleChange}
          placeholder="Languages"
          className="w-full p-2 rounded bg-gray-800"
          required
        />

        <h3 className="text-lg font-semibold">Screenshots</h3>
        {anime.screenshots.map((screenshot, index) => (
          <input
            key={index}
            type="text"
            value={screenshot}
            onChange={(e) => {
              const newScreenshots = [...anime.screenshots];
              newScreenshots[index] = e.target.value;
              setAnime({ ...anime, screenshots: newScreenshots });
            }}
            placeholder={`Screenshot ${index + 1} URL`}
            className="w-full p-2 rounded bg-gray-800"
            required
          />
        ))}

        <h3 className="text-lg font-semibold">Episodes</h3>
        {anime.episodes.map((episode, index) => (
          <div key={index} className="space-y-2">
            <input
              type="number"
              name="episodeNumber"
              value={episode.episodeNumber}
              onChange={(e) => handleEpisodeChange(index, e)}
              placeholder="Episode Number"
              className="w-full p-2 rounded bg-gray-800"
            />
            <input
              type="text"
              name="title"
              value={episode.title}
              onChange={(e) => handleEpisodeChange(index, e)}
              placeholder="Episode Title"
              className="w-full p-2 rounded bg-gray-800"
            />
            <h4 className="text-md font-semibold">Download Links</h4>
            {["480p", "720p", "1080p"].map((quality) => (
              <input
                key={quality}
                type="text"
                value={episode.downloadLinks[quality]}
                onChange={(e) =>
                  handleDownloadLinkChange(index, quality, e.target.value)
                }
                placeholder={`${quality} Download Link`}
                className="w-full p-2 rounded bg-gray-800"
              />
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default AnimeForm;
