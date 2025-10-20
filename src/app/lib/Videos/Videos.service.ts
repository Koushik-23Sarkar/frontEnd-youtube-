import axiosClient from "@/app/utils/axiosClient";

//    68e216adfe8a2154bbb068dd

export const Videos = {
    getChannelVideos: async (channelId:string)=>{
        const responce = await axiosClient.get(`http://localhost:8000/api/v1/videos?userId=${channelId}`);
        console.log(responce.data.data.docs);
        return responce.data.data.docs;
    }
}