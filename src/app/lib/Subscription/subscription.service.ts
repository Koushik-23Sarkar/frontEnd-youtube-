import axiosClient from "@/app/utils/axiosClient"

//          68e216d24a7f019a8631d112
//          68e216d24a7f019a8631d114
export const Subscription = {
    getSubscribedChannels : async (channelId:string)=>{
        const responce = await axiosClient.get(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`);
        console.log(responce.data.data)
        return responce.data.data;
    },
    getNumberOfSubscribedChannels: async (channelId:string)=>{
        const responce = await axiosClient.get(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`);
        console.log(responce.data.data.length)
        return responce.data.data.length;
    }
}