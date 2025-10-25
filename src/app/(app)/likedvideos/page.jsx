"use client"
import VideoListComponent from "@/app/components/videoListComponent";
import { Like } from "@/app/lib/Likes/like.service";
import { Users } from "@/app/lib/Users/users.service"
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../loading";


export default function home(){
    const [likedVideos,setLikedVideos] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getHistories = async ()=>{
            const data = await Like.getLikedVideos()
            console.log(data)
            setLikedVideos(data)
            setLoading(false)
        }
        getHistories();
    },[])

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
        {
            (likedVideos.length > 0) ? (
                likedVideos.map((video)=>
                    (<VideoListComponent
                        videoOwnerName={video.ownerDetails.fullName}
                        title={video.videoDetails.title}
                        views={video.videoDetails.views}
                        description={video.videoDetails.description}
                        videoId={video.video}
                    />)
                )
            )  : (<h1> No histories </h1>)
        }
        </div>
        </section>
    )
}