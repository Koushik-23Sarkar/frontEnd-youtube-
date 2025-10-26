
import axiosClient from "@/app/utils/axiosClient";

export const Dashboard = {
    getChannelStats: async ()=>{
        const responce = await axiosClient.get(
            `http://localhost:8000/api/v1/dashboard/stats`
        );
        console.log("getChannelStats", responce.data.data);
        return responce.data.data;
    },
    getChannelVideos: async ()=>{
        const responce = await axiosClient.get(
            `http://localhost:8000/api/v1/dashboard/videos`
        );
        console.log("getChannelVideos", responce.data.data);
        return responce.data.data;
    }
}