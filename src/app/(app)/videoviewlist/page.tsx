import Image from "next/image";
import VideoListComponent from '../../components/videoListComponent';



export default function Home() {

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="flex flex-col gap-4 p-4">
        <VideoListComponent/>
        <VideoListComponent/>
        <VideoListComponent/>
        <VideoListComponent/>
        <VideoListComponent/>
      </div>
    </section>
  );
}
