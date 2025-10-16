import axios from "axios"

export const Like = {
    video: async (videoId: any)=>{
        const responce = await axios.post(`http://localhost:8000/api/v1/likes/toggle/v/${videoId}`)
        console.log("video like responce"+responce);
        return responce;
    }
}