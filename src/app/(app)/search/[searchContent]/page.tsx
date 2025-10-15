"use client";
import VideoListComponent from "@/app/components/videoListComponent";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { changeIsSearchBoxSelected, searchVideo } from "@/app/searchSlice";
import { useEffect } from "react";

export default function Home() {
  const { isSearchBoxSelected, videos } = useAppSelector(
    (state) => state.search
  );
  const dispatch = useAppDispatch();



  useEffect(() => {
    dispatch(changeIsSearchBoxSelected(false));
  });

  if (isSearchBoxSelected) {
    console.log("isSearchBoxSelected:->");
    return <h1>Search History</h1>;
  }
  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="flex flex-col gap-4 p-4">
        {videos?.length > 0 ? (
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
