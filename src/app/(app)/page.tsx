"use client"
import Image from "next/image";
import VideoCardComponent from "../components/videoCardComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./loading";


export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ track loading state

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/videos");
        setVideos(res.data.data.docs);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false); // ✅ stop loading
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <Loading />; // ✅ show loading before data

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
        {videos.length > 0 ? (
            videos.map((video) => (
                <VideoCardComponent
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
    </section>
  );
}
