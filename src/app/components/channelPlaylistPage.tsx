import Image from "next/image";
import ChannelPagePlaylistComponent from "./channelPageComponents/channelPagePlaylistComponent";

export default function ChannelPlaylist({
  channelPlaylist,
}: {
  channelPlaylist: any;
}) {
  return (
    <div className="grid gap-4 pt-2 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]">
      {channelPlaylist.length > 0 &&
        channelPlaylist.map((channelVideo: any) => (
          <ChannelPagePlaylistComponent />
        ))}
    </div>
  );
}
