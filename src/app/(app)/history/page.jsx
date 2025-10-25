"use client";
import VideoListComponent from "@/app/components/videoListComponent";
import { Users } from "@/app/lib/Users/users.service";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function home() {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHistories = async () => {
      const data = await Users.getWatchHistory();
      console.log(data);
      setHistories(data);
      setLoading(false);
    };
    getHistories();
  }, []);

  if (loading){
      return (
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="flex items-center justify-center h-screen">
            <Loading/>
          </div>
        </section>
      );
  }

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="flex flex-col gap-4 p-4">
        {histories.length > 0 ? (
          histories.map((history) => (
            <VideoListComponent
              videoOwnerName={history.owner.fullName}
              title={history.title}
              views={history.views}
              description={history.description}
              videoId={history._id}
            />
          ))
        ) : (
          <h1> No histories </h1>
        )}
      </div>
    </section>
  );
}
