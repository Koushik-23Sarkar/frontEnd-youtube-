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
  },
  updateAccountDetails: async (fullName:string,email:string)=>{
    const responce = await axiosClient.patch(
      `http://localhost:8000/api/v1/users/update-account`
    );
    console.log("updateAccountDetails", responce.data.data)
    return responce.data.data;
  },
  changeCurrentPassword: async (oldPassword:string,newPassword:string)=>{
    const responce = await axiosClient.patch(
      `http://localhost:8000/api/v1/users/change-password`,{oldPassword,newPassword}
    );
    console.log("changeCurrentPassword", responce.data)
    return responce.data;
  }
};
