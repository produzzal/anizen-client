import Featured from "@/components/featured/Featured";
import LatestAnime from "@/components/LatestAnime/LatestAnime";
import Schedule from "@/components/Schedule/Schedule";
import SearchBar from "@/components/searchBar/SearchBar";
import DemoSlider from "@/components/slider/DemoSlider";
import TrackVisitor from "@/components/Visitor-track/Visitor-track-post";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <TrackVisitor />
      <SearchBar />
      <DemoSlider />
      <Featured />
      <LatestAnime />
      <Schedule />
    </div>
  );
};

export default HomePage;
