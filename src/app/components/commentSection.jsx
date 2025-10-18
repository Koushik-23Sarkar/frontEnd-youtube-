import { useEffect, useState } from "react";
import CommentElement from "./comments/commentElement";
import { Comment } from "../lib/Comments/comment.service";
import { useAppSelector } from "../lib/hooks";

export default function CommentSection({videoId}) {
  const [comments,setComments] = useState([]);
  const [newComment,setNewComment]=useState("");
  const {user} = useAppSelector(state => state.auth);
  console.log(user);
  
  const handleEnter = async (e)=>{
    if(e.key == "Enter"){
      // push to the top the comments array
      comments.unshift({
        content:newComment,
        owner: {
          username:user.username,
          fullName:user.fullName
        }
      })
      setNewComment("");
      // send new comment to the server
      const responce = await Comment.addComment(videoId,{commentContent:newComment})
      console.log(responce);
    }
  }

  useEffect(()=>{
    async function getVideoComments(videoId){
      const videoComments = await Comment.getVideoComments(videoId);
      setComments(videoComments);
    }
    getVideoComments(videoId)
  },[])

  return (
    <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
      <div className="block">
        <h6 className="mb-4 font-semibold">{comments?.length} Comments</h6>
        <input
          onKeyPress={handleEnter}
          value={newComment}
          onChange={(e)=>setNewComment(e.target.value)}
          type="text"
          className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
          placeholder="Add a Comment"
        />
      </div>
      <hr className="my-4 border-white" />
      <>
      {
        (comments?.length>0) ? 
        ( comments.map((comment)=><CommentElement
          fullName={comment.owner.fullName}
          username={comment.owner.username}
          content={comment.content}
        />) )
        : (<div> No comments! </div>)
      }
      </>
      
    </div>
  );
}
