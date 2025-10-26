"use client";
import { useEffect, useState } from "react";
import EditVideoPopup from "../components/editVideoPopup";
import "../globals.css";
import DeleteVideoPopup from "../components/deleteVideoPopup";
import TableDataAdmin from "../components/tableData.admin";
import ChannelInfoCardAdmin from "../components/channelInfoCard.admin";
import HeaderComponent from "../components/header";
import { useAppSelector } from "../lib/hooks";
import { Dashboard } from "../lib/Dashboard/dashboard.service";
import UploadVideoModelPopUp from "../components/OwnerChannel/uploadVideoModelPopUp";
import UploadingVideoModelPopUp from "../components/OwnerChannel/uploadingVideoModelPopUp";
import UploadedSuccessVideoModelPopUp from "../components/OwnerChannel/uploadedSuccessVideoModelPopUp";
import { Videos } from "../lib/Videos/Videos.service";
import moment from "moment";

enum activeTabStatus {
  editPopup = "editPopup",
  deletePopup = "deletePopup",
  uploadPopup = "uploadPopup",
  uploadingPopup = "uploadingVideoPop",
  uploadedPopup = "uploadedPopup",
  NoVideoPopUp = "noVideoPopUp",
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [numberOfViews, setNumberOfViews] = useState(-1);
  const [numberOfSubscribers, setNumberOfSubscribers] = useState(-1);
  const [numberOfLikes, setNumberOfLikes] = useState(-1);
  const [uploading, setUploading] = useState(false);
  const [videos, setvideos] = useState([]);
  const [updateOrDeleteVideoId, setUpdateOrDeleteVideoId] = useState<string | null>(null);
  const [haveNewData,setHaveNewData] = useState(false)
  //  console.log("admin user ", user)
  const handleActiveTab = (value: any) => {
    console.log(value);
    setActiveTab(value);
  };

  const handleVideoPopUp = (value: string) => {
    setActiveTab(value);
    console.log(value);
  };

  const handleUploadVideo = async ({
    title,
    description,
    videoFile,
    thumbnail,
  }: {
    title: string;
    description: string;
    videoFile: File;
    thumbnail: File;
  }) => {
    setUploading(true);

    try {
      console.log("Before append: ", videoFile);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnail);

      // print data of the from
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const data = await Videos.publishVideo(formData);
      console.log(data);
      setActiveTab(activeTabStatus.uploadedPopup);
    } catch (err: any) {
      console.log("Uploading fail ", err);
    } finally {
      setUploading(false);
    }
  };

  const getupdateOrDeleteVideoId = (videoId:string)=>{
    setUpdateOrDeleteVideoId(videoId)
    console.log("getupdateOrDeleteVideoId", updateOrDeleteVideoId);
  }

  const handleVideoUpdate = async (data: any)=>{
    if(updateOrDeleteVideoId && data){
      await Videos.updateVideo(updateOrDeleteVideoId,data)
      setHaveNewData((prev) => (!prev))
    }
  }
  const handleVideoDelete = async ()=>{
    if(updateOrDeleteVideoId){
      await Videos.deleteVideo(updateOrDeleteVideoId);
      setHaveNewData((prev) => (!prev))
    }
  }
  useEffect(() => {
    const getAdminData = async () => {
      const data = await Dashboard.getChannelStats();
      const data2 = await Dashboard.getChannelVideos();
      console.log("getAdminData", data);
      console.log("getAdminData", data2);

      setNumberOfViews(data[0].numberOfViews);
      setNumberOfSubscribers(data[0].numberOfSubscribers);
      setNumberOfLikes(data[0].numberOfLikes);
    };
    getAdminData();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await Dashboard.getChannelVideos();
      setvideos(data);
    };
    fetchVideos();
  }, [haveNewData]);

  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      <HeaderComponent />
      <div className="relative flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-y-6 px-4 py-8">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="block">
              <h1 className="text-2xl font-bold">
                Welcome Back, {user?.fullName}
              </h1>
              <p className="text-sm text-gray-300">
                Seamless Video Management, Elevated Results.
              </p>
            </div>
            <div className="block">
              <button
                onClick={() => {
                  console.log("upload video");
                  setActiveTab(activeTabStatus.uploadPopup);
                }}
                className="inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  ></path>
                </svg>
                Upload video
              </button>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
            <ChannelInfoCardAdmin title={"views"} number={numberOfViews} />
            <ChannelInfoCardAdmin
              title={"subscribers"}
              number={numberOfSubscribers}
            />
            <ChannelInfoCardAdmin title={"likes"} number={numberOfLikes} />
          </div>
          <div className="w-full overflow-auto">
            <table className="w-full min-w-[1200px] border-collapse border text-white">
              <thead>
                <tr>
                  <th className="border-collapse border-b p-4">Status</th>
                  <th className="border-collapse border-b p-4">Status</th>
                  <th className="border-collapse border-b p-4">Uploaded</th>
                  <th className="border-collapse border-b p-4">Rating</th>
                  <th className="border-collapse border-b p-4">
                    Date uploaded
                  </th>
                  <th className="border-collapse border-b p-4"></th>
                </tr>
              </thead>
              <tbody>
                {videos.length > 0 &&
                  videos.map((video) => (
                    <TableDataAdmin 
                      onActiveTabChange={handleActiveTab} 
                      key={video._id}
                      id={video._id}
                      videoTitle={video.title}
                      numberOfLikes={video.likeCount}  
                      createdAtDate={moment(video.createdAt).format("DD/MM/YYYY")}
                      isPublished={video.isPublished}
                      getupdateOrDeleteVideoId={getupdateOrDeleteVideoId}
                    />
                  ))}
                {/* <TableDataAdmin onActiveTabChange={handleActiveTab} />
                <TableDataAdmin onActiveTabChange={handleActiveTab} /> */}
              </tbody>
            </table>
          </div>
        </div>
        {activeTab == activeTabStatus.editPopup && (
          <EditVideoPopup 
            handleVideoUpdate={handleVideoUpdate}
            onActiveTabChange={handleActiveTab} 
          />
        )}
        {activeTab == activeTabStatus.deletePopup && (
          <DeleteVideoPopup 
            handleVideoDelete={handleVideoDelete}
            onActiveTabChange={handleActiveTab} 
          />
        )}
        {activeTab == activeTabStatus.uploadPopup && (
          <UploadVideoModelPopUp
            handleUploadVideo={handleUploadVideo}
            handleVideoPopUp={handleVideoPopUp}
          />
        )}
        {activeTab == activeTabStatus.uploadingPopup && uploading && (
          <UploadingVideoModelPopUp handleVideoPopUp={handleVideoPopUp} />
        )}
        {activeTab == activeTabStatus.uploadedPopup && (
          <UploadedSuccessVideoModelPopUp handleVideoPopUp={handleVideoPopUp} />
        )}
      </div>
    </div>
  );
}
