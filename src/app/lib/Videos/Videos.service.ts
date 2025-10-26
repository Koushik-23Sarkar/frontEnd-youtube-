import axiosClient from "@/app/utils/axiosClient";
import axios from "axios";

//    68e216adfe8a2154bbb068dd

export const Videos = {
  getChannelVideos: async (channelId: string) => {
    const responce = await axiosClient.get(
      `http://localhost:8000/api/v1/videos?userId=${channelId}`
    );
    console.log(responce.data.data.docs);
    return responce.data.data.docs;
  },
  deleteVideo: async (videoId: string) => {
    const responce = await axiosClient.delete(
      `http://localhost:8000/api/v1/videos?videoId=${videoId}`
    );
    console.log(responce.data.data);
    return responce.data.data;
  },
  updateVideo: async (videoId: string, data: any) => {
    const responce = await axiosClient.patch(
      `http://localhost:8000/api/v1/videos?videoId=${videoId}`,
      data
    );
    console.log(responce.data.data);
    return responce.data.data;
  },
  publishVideo: async (formData: any) => {
    console.log(formData);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/videos",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, 
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error: any) {
      console.error("Error uploading video:", error);
      throw error;
    }
  },
  togglePublishStatus: async (videoId:string)=>{
    console.log("togglePublishStatus",videoId)
    const response = await axiosClient.patch(
        `http://localhost:8000/api/v1/videos/toggle/publish/${videoId}`
    );
    console.log("togglePublishStatus", response.data.data)
    return response.data.data
  }
};
