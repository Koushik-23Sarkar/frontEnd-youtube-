import axiosClient from "@/app/utils/axiosClient";

export const Like = {
    toggleVideoLike: async (videoId: any)=>{
        console.log(videoId);
        const responce = await axiosClient.post(`http://localhost:8000/api/v1/likes/toggle/v/${videoId}`);
        console.log("video like responce", responce);
        return responce;
    }
}