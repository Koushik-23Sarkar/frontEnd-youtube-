import axiosClient from "@/app/utils/axiosClient";

export const Users = {
  getUserChannelProfileById: async (channelId: string) => {
    const responce = await axiosClient.get(
      `http://localhost:8000/api/v1/users/id/${channelId}`
    );
    console.log(responce.data.data);
    return responce.data.data;
  },
};
