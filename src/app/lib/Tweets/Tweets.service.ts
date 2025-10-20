import axiosClient from "@/app/utils/axiosClient"

//          68e216adfe8a2154bbb068dd

export const Tweets = {
    getUserTweets: async (channelId:string)=>{
        const responce = await axiosClient.get(`http://localhost:8000/api/v1/tweets/user/${channelId}`);
        console.log(responce.data.data)
        return responce.data.data;
    }
}