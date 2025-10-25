import axiosClient from "@/app/utils/axiosClient";

export const Users = {
  getUserChannelProfileById: async (channelId: string) => {
    console.log("getUserChannelProfileById", channelId)
    const responce = await axiosClient.get(
      `http://localhost:8000/api/v1/users/id/${channelId}`
    );
    console.log(responce.data.data);
    return responce.data.data;
  },
  getWatchHistory: async ()=>{
    const responce = await axiosClient.get(
      `http://localhost:8000/api/v1/users/history`,
      {
        withCredentials: true, // 🔥 important line
      }
    );
    console.log(responce.data.data) 
    return responce.data.data   // return array
  }
};
