import Image from "next/image";
import ChannelPageVideoComponent from "./channelPageComponents/channelPageVideoComponent";

export default function ChannelVideoList({
  channelVideos,
}: {
  channelVideos: any;
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2">
      {channelVideos.length > 0 &&
        channelVideos.map((channelVideo: any) => <ChannelPageVideoComponent />)}
    </div>
  );
}
