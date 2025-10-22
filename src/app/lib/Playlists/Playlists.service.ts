import axiosClient from "@/app/utils/axiosClient"

//          68e216d24a7f019a8631d112

export const Playlist = {
    getUserPlaylists : async (channelId:string)=>{
        const responce = await axiosClient.get(`http://localhost:8000/api/v1/playlist/user/${channelId}`);
        console.log("getUserPlaylists ",responce.data.data)
        return responce.data.data;
    },
    createPlaylist: async (name:string,description:string="new playlist description")=>{
        const responce = await axiosClient.post(
            `http://localhost:8000/api/v1/playlist/`,{name,description}
        );
        console.log("createPlaylist ",responce.data.data)
        return responce.data.data;
    },
    addVideoToPlaylist: async (videoId:string,playlistId:string)=>{
        console.log("addVideoToPlaylist" , videoId,playlistId)
        const responce = await axiosClient.patch(
            `http://localhost:8000/api/v1/playlist/add/${videoId}/${playlistId}`
        );
        console.log(responce.data.data);
        return responce.data.data;
    },
    removeVideoFromPlaylist: async (videoId:string,playlistId:string)=>{
        console.log("removeVideoFromPlaylist" , videoId,playlistId)
        const responce = await axiosClient.patch(
            `http://localhost:8000/api/v1/playlist/remove/${videoId}/${playlistId}`
        );
        console.log(responce.data.data);
        return responce.data.data;
    }
}