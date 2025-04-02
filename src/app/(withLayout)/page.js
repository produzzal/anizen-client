import Featured from "@/components/featured/Featured";
import LatestAnime from "@/components/LatestAnime/LatestAnime";
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
    </div>
  );
};

export default HomePage;
