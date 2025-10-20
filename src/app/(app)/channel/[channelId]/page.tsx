"use client";
import Image from "next/image";
import ChannelEmptyVideoPage from "../../../components/channelEmptyVideoPage";
import ChannelVideoList from "../../../components/channelVideoListPage";
import ChannelEmptyPlaylist from "../../../components/channelEmptyPlaylistPage";
import ChannelPlaylist from "../../../components/channelPlaylistPage";
import ChannelEmptyTweet from "../../../components/channelEmptyTweetPage";
import { useEffect, useState } from "react";
import ChannelEmptySubScribed from "@/app/components/channelEmptySubscribedPage";
import SearchBoxCases from "@/app/components/SearchBox/serachBoxCases";
import { useAppSelector } from "@/app/lib/hooks";
import ChannelSubscribeButton from "@/app/components/channel/channelSubscribeButton";
import { useParams } from "next/navigation";
import OwnChannelEditButton from "@/app/components/userAvater/ownChannelEditButton";
import OwnerChannelEmptyVideoPage from "@/app/components/OwnerChannel/ownerChannelEmptyVideoPage";
import OwnerChannelEmptyTweetPage from "@/app/components/OwnerChannel/ownerChannelEmptyTweetPage";
import UploadVideoModelPopUp from "@/app/components/OwnerChannel/uploadVideoModelPopUp";
import UploadingVideoModelPopUp from "@/app/components/OwnerChannel/uploadingVideoModelPopUp";
import UploadedSuccessVideoModelPopUp from "@/app/components/OwnerChannel/uploadedSuccessVideoModelPopUp";
import PersonalInformationChange from "@/app/components/OwnerChannel/personalInformationChange";
import { ChannelInformationChange } from "@/app/components/OwnerChannel/channelInformationChange";
import ChannelPasswordChange from "@/app/components/OwnerChannel/channelPasswordChange";
import { Videos } from "@/app/lib/Videos/Videos.service";
import ChannelTweetPage from "@/app/components/channelTweetsPage";
import ChannelSubscribedPage from "@/app/components/channelSubscribedPage";
import { Playlist } from "@/app/lib/Playlists/Playlists.service";
import { Tweets } from "@/app/lib/Tweets/Tweets.service";
import { Subscription } from "@/app/lib/Subscription/subscription.service";

enum activeTabStatus {
  Video = "video",
  Playlist = "playlist",
  Tweet = "tweet",
  Subscribed = "subscribed",
  PersonalInformation = "Personal Information",
  ChannelInformation = "Channel Information",
  ChangePassword = "Change Password",
}

enum activeModeStatus {
  Edit = "editMode",
  View = "viewMode",
}

enum videoPopUpStatus {
  NoVideoPopUp = "noVideoPopUp",
  uploadVideoPop = "uploadVideoPopUp",
  uploadingVideoPop = "uploadingVideoPop",
  uploadedVideoPop = "uploadedVideoPopUp",
}

export default function Home() {
  const { isSearchBoxSelected } = useAppSelector((state) => state.search);
  const { user } = useAppSelector((state) => {
    console.log(state);
    return state.auth;
  });
  const [videoPopUp, setVideoPopUp] = useState<videoPopUpStatus>(videoPopUpStatus.NoVideoPopUp);
  const [activeTab, setActiveTab] = useState<activeTabStatus>(activeTabStatus.Video);
  const [activeMode, setActiveMode] = useState<activeModeStatus>(activeModeStatus.View);
  const { channelId } = useParams();

  const [channelVideos, setChannelVideos] = useState<any[] | null>(null);
  const [channelPlaylist,setChannelPlaylist] = useState<any[] | null>(null);
  const [channeTweets,setChannelTweets]=useState<any[] | null>(null);
  const [channelSubscribed,setChannelSubscribed] = useState<any[] | null>(null);


  console.log(channelId);
  console.log(user?._id);

  if (isSearchBoxSelected) {
    console.log("isSearchBoxSelected:->");
    return <h1>Search History</h1>;
  }

  const handleActiveMode = () => {
    if (activeMode == activeModeStatus.Edit) {
      setActiveMode(activeModeStatus.View);
      setActiveTab(activeTabStatus.Video);
    } else {
      setActiveMode(activeModeStatus.Edit);
      setActiveTab(activeTabStatus.PersonalInformation);
    }
  };

  const handleVideoPopUp = (value: string) => {
    setVideoPopUp(value);
    console.log(value);
  };

  useEffect(()=>{
    async function fetchData(){
      if(channelId){
        const videoData = await Videos.getChannelVideos(channelId);
        const playlistData = await Playlist.getUserPlaylists(channelId);
        const tweetsData = await Tweets.getUserTweets(channelId);
        const subscribedData = await Subscription.getSubscribedChannels(channelId);

        console.log(videoData);
        console.log(playlistData);
        console.log(tweetsData)
        console.log(subscribedData)

        setChannelVideos(videoData);
        setChannelPlaylist(playlistData)
        setChannelSubscribed(subscribedData)
        setChannelTweets(tweetsData);
      }
    }


    fetchData();
  },[])


  return (
    <section className="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="relative min-h-[150px] w-full pt-[16.28%]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1092424/pexels-photo-1092424.jpeg?auto=compress"
            alt="cover-photo"
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-4 pb-4 pt-6">
          <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
            <img
              src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Channel"
              className="h-full w-full"
            />
          </span>
          <div className="mr-auto inline-block">
            <h1 className="font-bolg text-xl">React Patterns</h1>
            <p className="text-sm text-gray-400">@reactpatterns</p>
            <p className="text-sm text-gray-400">
              600k Subscribers · 220 Subscribed
            </p>
          </div>
          {/** If i visit my own channel then Subscribe button become Edit button */}
          {channelId == user?._id ? (
            <OwnChannelEditButton
              handleActiveMode={handleActiveMode}
              activeMode={activeMode}
            />
          ) : (
            <ChannelSubscribeButton />
          )}
        </div>

        <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
          {activeMode == activeModeStatus.Edit ? (
            /** Edit mode is on */
            <>
              <li className="w-full">
                <button
                  onClick={() =>
                    setActiveTab(activeTabStatus.PersonalInformation)
                  }
                  className={`w-full px-3 py-1.5 border-b-2 ${
                    activeTab === activeTabStatus.PersonalInformation
                      ? "border-[#ae7aff] text-[#ae7aff]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Personal Information
                </button>
              </li>
              <li className="w-full">
                <button
                  onClick={() =>
                    setActiveTab(activeTabStatus.ChannelInformation)
                  }
                  className={`w-full px-3 py-1.5 border-b-2 ${
                    activeTab === activeTabStatus.ChannelInformation
                      ? "border-[#ae7aff] text-[#ae7aff]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Channel Information
                </button>
              </li>
              <li className="w-full">
                <button
                  onClick={() => setActiveTab(activeTabStatus.ChangePassword)}
                  className={`w-full px-3 py-1.5 border-b-2 ${
                    activeTab === activeTabStatus.ChangePassword
                      ? "border-[#ae7aff] text-[#ae7aff]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Change Password
                </button>
              </li>
            </>
          ) : (
            /** Edit mode is off */
            <>
              <li className="w-full">
                <button
                  onClick={() => setActiveTab(activeTabStatus.Video)}
                  className={`w-full px-3 py-1.5 border-b-2 ${
                    activeTab === activeTabStatus.Video
                      ? "border-[#ae7aff] text-[#ae7aff]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Videos
                </button>
              </li>
              <li className="w-full">
                <button
                  onClick={() => setActiveTab(activeTabStatus.Playlist)}
                  className={`w-full px-3 py-1.5 border-b-2 ${
                    activeTab === activeTabStatus.Playlist
                      ? "border-[#ae7aff] text-[#ae7aff]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Playlist
                </button>
              </li>
              <li className="w-full">
                <button
                  onClick={() => setActiveTab(activeTabStatus.Tweet)}
                  className={`w-full px-3 py-1.5 border-b-2 ${
                    activeTab === activeTabStatus.Tweet
                      ? "border-[#ae7aff] text-[#ae7aff]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Tweets
                </button>
              </li>
              <li className="w-full">
                <button
                  onClick={() => setActiveTab(activeTabStatus.Subscribed)}
                  className={`w-full px-3 py-1.5 border-b-2 ${
                    activeTab === activeTabStatus.Subscribed
                      ? "border-[#ae7aff] text-[#ae7aff]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Subscribed
                </button>
              </li>
            </>
          )}
        </ul>
        {/* <ChannelEmptyVideoPage/> */}
        {activeTab == activeTabStatus.Video && (
          channelVideos?.length ? <ChannelVideoList/> : <ChannelEmptyVideoPage/>
        )}
        {activeTab == activeTabStatus.Playlist && (
          channelPlaylist?.length ? <ChannelPlaylist/> :<ChannelEmptyPlaylist />
        )}
        {activeTab == activeTabStatus.Tweet && (
          channeTweets?.length ? <ChannelTweetPage/> :<ChannelEmptyTweet />
        )}
        {activeTab == activeTabStatus.Subscribed && (
          channelSubscribed?.length? <ChannelSubscribedPage/> : <ChannelEmptySubScribed />
        )}
        {activeTab == activeTabStatus.PersonalInformation && (
          <PersonalInformationChange />
        )}
        {activeTab == activeTabStatus.ChannelInformation && (
          <ChannelInformationChange />
        )}
        {activeTab == activeTabStatus.ChangePassword && (
          <ChannelPasswordChange />
        )}
        {/**         {( <condition> ) && ( <result> )}             */}
      </div>


      <>  {/** All video popups */}
        {videoPopUp == videoPopUpStatus.uploadVideoPop && (
          <UploadVideoModelPopUp handleVideoPopUp={handleVideoPopUp} />
        )}
        {videoPopUp == videoPopUpStatus.uploadingVideoPop && (
          <UploadingVideoModelPopUp handleVideoPopUp={handleVideoPopUp} />
        )}
        {videoPopUp == videoPopUpStatus.uploadedVideoPop && (
          <UploadedSuccessVideoModelPopUp handleVideoPopUp={handleVideoPopUp} />
        )}
      </>
    </section>
  );
}
