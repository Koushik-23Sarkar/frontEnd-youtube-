"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { changeIsSearchBoxSelected } from "../searchSlice";
import { Like } from "../lib/Likes/like.service";
import { useEffect, useState } from "react";
import { Playlist } from "../lib/Playlists/Playlists.service";
import moment from "moment";
import { Users } from "../lib/Users/users.service";
import { Subscription } from "../lib/Subscription/subscription.service";

export default function VideoDetails({
  channelId,
  videoID,
  numOfVideoLikes,
  videoDiscription,
  videoTitle,
  videoOwnerFullName,
  videoViews,
  videoCreatedAt,
  alreadyLiked,
}) {
  const { isSearchBoxSelected } = useAppSelector((state) => state.search);
  const router = useRouter();
  const [numOfLikes, setNumOfLikes] = useState(numOfVideoLikes);
  console.log("alreadyLiked", alreadyLiked);
  const [userAction, setUserAction] = useState(
    alreadyLiked == true ? "like" : null
  );
  const { user } = useAppSelector((state) => {
    console.log(state);
    return state.auth;
  });
  const [playlistList, setPlaylistList] = useState();
  const dispatch = useAppDispatch();
  const [newPlaylistName, setNewPlalistName] = useState("");
  const [subscribe, setSubscribed] = useState(false);   // at first, that should be false, then fetch data, and take decision based on that 
  const [checkedBoxPlaylist,setCheckedBoxPlsylist] = useState(false)

  const getThatChannel = () => {
    console.log("channel click!");
    router.push("/channel/ckjhbasdcjhbdsac");
  };

  const handleCreateNewPlaylist = async () => {
    console.log("handle create playlist");
    const newPLaylist = await Playlist.createPlaylist(newPlaylistName);
    setPlaylistList([...playlistList,newPLaylist]);
    setNewPlalistName("")
  };
  const handleTheVideoLikeButton = async () => {
    console.log("click like button");
    await Like.toggleVideoLike(videoID);
    if (userAction === "like") {
      // Undo like
      setNumOfLikes(numOfLikes - 1);
      setUserAction(null);
    } else {
      // Like the video
      setNumOfLikes(numOfLikes + 1);
      setUserAction("like");
    }
  };

  const handleSubscribed = async ()=>{
    const data = await Subscription.toggleSubscription(channelId)
    console.log(data);
    setSubscribed(!subscribe);
  }

  const handleCheckedBoxPlaylist = async (videoid,playlistId,present)=>{
    console.log("handleCheckedBoxPlaylist ", videoid,playlistId,present)
    if(present){ // video is already present in the playlist, we need to remove that video
      const responce = await Playlist.addVideoToPlaylist(videoid,playlistId);
      console.log("handleCheckedBoxPlaylist remove", responce);
      setCheckedBoxPlsylist(!checkedBoxPlaylist)
    }else {
      const responce = await Playlist.removeVideoFromPlaylist(videoid,playlistId);
      console.log("handleCheckedBoxPlaylist add",responce)
      setCheckedBoxPlsylist(!checkedBoxPlaylist)
    }
  }

  useEffect(() => {
    async function getPlaylistList() {
      // return array
      console.log("getPlaylistList")
      const response = await Playlist.getUserPlaylists(user?._id);
      console.log("getPlaylistList ",response)
      setPlaylistList(response);
    }
    getPlaylistList();
  }, [checkedBoxPlaylist]);

  useEffect(() => {
    const issubscribedChannel = async (channelId) => {
      console.log("videoDetails", channelId)
      const responce = await Users.getUserChannelProfileById(channelId);
      return responce.isSubscribed;
    };
    setSubscribed(issubscribedChannel(channelId));
  }, []);

  return (
    <div
      className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
      role="button"
      tabIndex="0"
    >
      <div className="flex flex-wrap gap-y-2">
        <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
          <h1 className="text-lg font-bold">{videoTitle}</h1>
          <p className="flex text-sm text-gray-200">
            {videoViews} Views ·{moment(videoCreatedAt).fromNow()}
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
          <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
            {/** like and dislike part */}
            <div className="flex overflow-hidden rounded-lg border">
              <button
                onClick={handleTheVideoLikeButton}
                // disabled={userAction === "dislike"} // Disable if disliked
                className={`group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5
          ${
            userAction === "like"
              ? "bg-[#ae7aff]/20 text-[#ae7aff]"
              : "hover:bg-white/10"
          }
          ${userAction === "dislike" ? "opacity-50" : ""}
        `}
              >
                <span className="inline-block w-5">👍</span>
                <span>{numOfLikes}</span>
              </button>

              {/* 👎 Dislike Button */}
            </div>
            {/** save to the playlist button */}
            <div className="relative block">
              <button className="peer flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black">
                <span className="inline-block w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    ></path>
                  </svg>
                </span>
                Save
              </button>
              <div className="absolute right-0 top-full z-10 hidden w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30 hover:block peer-focus:block">
                <h3 className="mb-4 text-center text-lg font-semibold">
                  Save to playlist
                </h3>
                <ul className="mb-4">
                  {playlistList?.length > 0 &&
                    playlistList.map((playlist) => (
                      <li className="mb-2 last:mb-0">
                        {console.log("playlist section")}
                        <label
                          className="group/label inline-flex cursor-pointer items-center gap-x-3"
                          htmlFor={`Collections-checkbox-${playlist._id}`}
                        >
                          <input
                            type="checkbox"
                            checked={playlist.videos.includes(videoID)}
                            value={playlist._id}
                            onChange={(e)=>handleCheckedBoxPlaylist(videoID,e.target.value,e.target.checked)}
                            className="peer hidden"
                            id={`Collections-checkbox-${playlist._id}`}
                          />
                          <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="3"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              ></path>
                            </svg>
                          </span>
                          {playlist.name}
                        </label>
                      </li>
                    ))}
                </ul>
                <div className="flex flex-col">
                  <label
                    for="playlist-name"
                    className="mb-1 inline-block cursor-pointer"
                  >
                    Name
                  </label>
                  <input
                    value={newPlaylistName}
                    onChange={(e) => setNewPlalistName(e.target.value)}
                    className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-[#ae7aff]"
                    id="playlist-name"
                    placeholder="Enter playlist name"
                  />
                  <button
                    onClick={() => handleCreateNewPlaylist()} // create a new playlist and add that video into it
                    className="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black"
                  >
                    Create new playlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div
          onClick={() => getThatChannel()}
          className="flex items-center gap-x-4 cursor-pointer"
        >
          <div className="mt-2 h-12 w-12 shrink-0">
            <img
              src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="reactpatterns"
              className="h-full w-full rounded-full"
            />
          </div>
          <div className="block">
            <p className="text-gray-200">{videoOwnerFullName}</p>
            <p className="text-sm text-gray-400">757K Subscribers</p>
          </div>
        </div>
        <div className="block">
          <button 
            onClick={()=>{
              handleSubscribed()
            }}
          className={`group/btn mr-1 flex w-full items-center gap-x-2 ${(subscribe==true)?("bg-[#e3ddee]"):("bg-[#ae7aff]")} px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto`}>
            <span className="inline-block w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                ></path>
              </svg>
            </span>
            {subscribe == true ? (
              <span className="group-focus/btn:block">Subscribed</span>
            ) : (
              <span className="group-focus/btn:block">Subscribe</span>
            )}
          </button>
        </div>
      </div>
      <hr className="my-4 border-white" />
      <div className="h-5 overflow-hidden group-focus:h-auto">
        {" "}
        {/*description box section*/}
        <p className="text-sm">{videoDiscription}</p>
      </div>
    </div>
  );
}
