import Image from "next/image";
import ChannelPageTweetComponent from "./channelPageComponents/channelPageTweetComponent";

export default function ChannelTweetPage({
  channeTweets,
}: {
  channeTweets: any;
}) {
  return (
    <div className="py-4">
      {channeTweets.length > 0 &&
        channeTweets.map((channelVideo: any) => <ChannelPageTweetComponent />)}
    </div>
  );
}
