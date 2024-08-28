import { Inter } from "next/font/google";

import BBPMusicLogo from "@/components/AudioPlayer/BBPMusicLogo/Logo";
import ComingSoonText from "@/components/AudioPlayer/ComingSoon/ComingSoon";
import SubscribeForm from "@/components/AudioPlayer/Subscribe/SubscribeForm";

import { S3, params } from "@/client/client";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { tracks } from "@/components/AudioPlayer/trackinfo";
import ReactAudioPlayer from "@/components/AudioPlayer/ReactAudioPlayer/ReactAudioPlayer";

const inter = Inter({ subsets: ["latin"] });

export default async function AudioPlayer() {
  const command = new ListObjectsCommand(params);
  const list = await S3.send(command);
  const filtered = list.Contents?.filter((data) => data.Key?.match(/.m3u8/g));
  const data = filtered?.map((item) => ({
    ...item,
    ...tracks.find(
      (data) => data.Title === item.Key?.split(".m3u8")[0].split("_").join(" ")
    ),
  }));
  console.log("data:", data);
  return (
    <div
      style={{
        background: "#101010",
        height: "100%",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        fontFamily: "unset",
      }}
      className={inter.className}
    >
      <div
        style={{
          width: "560px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          position: "relative",
        }}
      >
        <BBPMusicLogo />
        <ComingSoonText />
        <ReactAudioPlayer data={data} />
        <SubscribeForm />
      </div>
    </div>
  );
}
