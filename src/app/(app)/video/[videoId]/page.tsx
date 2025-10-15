"use client";
import Image from "next/image";
import VideoSuggestionCard from "../../../components/videoSuggestionCard";
import CommentSection from "../../../components/commentSection";
import VideoPlay from "../../../components/videoPlay";
import VideoDetails from "../../../components/videoDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../loading";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/app/lib/hooks";
import SearchBoxCases from "@/app/components/SearchBox/serachBoxCases";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ track loading state
  const { videoId } = useParams();
  const [channelId, setChannelId] = useState(null);
  const { isSearchBoxSelected } = useAppSelector((state) => state.search);

  useEffect(() => {
    const fetchThatVideo = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/v1/videos/${videoId}`
      );
      console.log("Info about that video: ");
      console.log(res);
    };
    fetchThatVideo();
  }, []);

  useEffect(() => {
    const fetchSuggestionVideos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/videos");
        setVideos(res.data.data.docs);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false); // ✅ stop loading
      }
    };
    fetchSuggestionVideos();
  }, []);

  if (loading) return <Loading />; // ✅ show loading before data

  if (isSearchBoxSelected) {
    return <SearchBoxCases />;
  }

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
      <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
        <div className="col-span-12 w-full">
          <VideoPlay />
          <VideoDetails channelId={channelId} />
          <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
            <h6 className="font-semibold">573 Comments...</h6>
          </button>
          <CommentSection />
        </div>
        <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
          {videos.length > 0 ? (
            videos.map((video) => (
              <VideoSuggestionCard
                key={video.title} // ✅ add key
                title={video.title}
                thumbnail={video.thumbnail}
                views={video.views}
                videoId={video._id}
                avatar={video.owner?.avatar}
                createdTime={video.createdAt}
              />
            ))
          ) : (
            <p className="text-center w-full col-span-full text-gray-400">
              No videos available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
