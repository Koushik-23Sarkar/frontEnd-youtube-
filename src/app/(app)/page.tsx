"use client";

import { Key } from "react";
import BlankPage from "../components/blankPage";
import HomePageVideo from "../components/homePageVideos";
import Loader from "../components/loader";
import VideoListComponent from "../components/videoListComponent";
import { useAppSelector } from "../lib/hooks";

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
    if (searchLoading) {
      console.log("Rendering Loader (searchLoading = true)");
      return <Loader />;
    }

    if (error) {
      console.log("Rendering Error Message");
      return <h1>Error: {error}</h1>;
    }

    if (videos?.length > 0) {
      console.log("Rendering Video Found Component");
      return (
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="flex flex-col gap-4 p-4">
            {videos.length > 0 ? (
              videos.map(
                (video: {
                  _id: Key | null | undefined;
                  owner: { username: unknown };
                  title: unknown;
                  description: unknown;
                  views: unknown;
                }) => (
                  <VideoListComponent
                    key={video._id}
                    videoId={video._id}
                    videoOwnerName={video.owner?.username}
                    title={video.title}
                    description={video.description}
                    views={video.views}
                  />
                )
              )
            ) : (
              <h1> video not found!</h1>
            )}
          </div>
        </section>
      );
    }

    if (videos?.length === 0) {
      console.log("Rendering Video Not Found Component");
      return <h1>Video not found!</h1>;
    }

    console.log("Rendering BlankPage (Search box selected, no data)");
    return <BlankPage />;
  }

  console.log("Rendering HomePageVideo (Default view)");
  return <HomePageVideo />;
}
