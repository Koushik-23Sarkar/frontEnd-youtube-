import axiosClient from "@/app/utils/axiosClient";

export const Comment = {
    getVideoComments: async (videoId)=>{
        console.log(videoId);
        const responce = await axiosClient.get(`http://localhost:8000/api/v1/comments/${videoId}`);
        console.log("getVideoComments: "+responce);
        console.log(responce.data.data.docs);
        return responce.data.data.docs;     // If we put wrong videoId then, it will give you Empty array
    },
    addComment: async (videoId,commentContent)=>{
        console.log(videoId);
        console.log(commentContent);
        const responce = await axiosClient.post(`http://localhost:8000/api/v1/comments/${videoId}`,commentContent)
        console.log(responce.data.data)
        return responce;
    }
}