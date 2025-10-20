import axiosClient from "@/app/utils/axiosClient"

//          68e216d24a7f019a8631d112

export const Playlist = {
    getUserPlaylists : async (channelId:string)=>{
        const responce = await axiosClient.get(`http://localhost:8000/api/v1/playlist/user/${channelId}`);
        console.log(responce.data.data)
        return responce.data.data;
    }
}