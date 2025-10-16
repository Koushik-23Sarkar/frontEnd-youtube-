import axiosClient from "@/app/utils/axiosClient";

export const Like = {
    video: async (videoId: any)=>{
        console.log(videoId);
        const responce = axiosClient.post(`http://localhost:8000/api/v1/likes/toggle/v/${videoId}`);
        console.log("video like responce"+responce);
        return responce;
    }
}