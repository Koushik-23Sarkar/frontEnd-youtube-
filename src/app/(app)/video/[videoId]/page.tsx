import Image from "next/image";
import VideoSuggestionCard from '../../../components/videoSuggestionCard';
import CommentSection from '../../../components/commentSection';
import VideoPlay from "../../../components/videoPlay";
import VideoDetails from "../../../components/videoDetails";

export default function Home() {
  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
      <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
        <div className="col-span-12 w-full">
          <VideoPlay/>
          <VideoDetails/>
          <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
            <h6 className="font-semibold">573 Comments...</h6>
          </button>
          <CommentSection/>
        </div>
        <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
          <VideoSuggestionCard/> 
          <VideoSuggestionCard/>
          <VideoSuggestionCard/>
          <VideoSuggestionCard/>
          <VideoSuggestionCard/>
          <VideoSuggestionCard/>
          <VideoSuggestionCard/>
          <VideoSuggestionCard/>
          <VideoSuggestionCard/>
        </div>
      </div>
    </section>
  );
}
