"use client";

import { Key } from "react";
import BlankPage from "../components/blankPage";
import HomePageVideo from "../components/homePageVideos";
import Loader from "../components/loader";
import VideoListComponent from "../components/videoListComponent";
import { useAppSelector } from "../lib/hooks";
import SearchBoxCases from "../components/SearchBox/serachBoxCases";

export default function Home() {
  const {
    isSearchBoxSelected,
    videos,
    loading: searchLoading,
    error,
  } = useAppSelector((state) => state.search);

  console.log("Rendering <Home /> component...");
  console.log({ isSearchBoxSelected, videos, searchLoading, error });

  if (isSearchBoxSelected) {
    console.log("isSearchBoxSelected:->")
    return <SearchBoxCases/>
  }

  console.log("Rendering HomePageVideo (Default view)");
  return <HomePageVideo />;
}
