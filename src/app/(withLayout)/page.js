import Featured from "@/components/featured/Featured";
import LatestAnime from "@/components/LatestAnime/LatestAnime";
import Schedule from "@/components/Schedule/Schedule";
import SearchBar from "@/components/searchBar/SearchBar";
import DemoSlider from "@/components/slider/DemoSlider";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <SearchBar />
      <DemoSlider />
      <Featured />
      <LatestAnime />
      <Schedule />
    </div>
  );
};

export default HomePage;
