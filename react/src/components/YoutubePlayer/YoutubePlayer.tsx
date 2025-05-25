import { playFn } from "@/services/serviceProvider";
import { useEffect } from "react";
const YoutubePlayer = ({
  yt_ref,
  currentSong
}: {
  yt_ref: React.RefObject<HTMLIFrameElement>;
  currentSong: string;
}) => {
  useEffect(() => {
    window.addEventListener("load", () => {
      playFn(yt_ref);
    });
  }, []);

  return (
    <div>
      <iframe
        width="1"
        height="1"
        ref={yt_ref}
        src={`https://www.youtube-nocookie.com/embed/${currentSong}?enablejsapi=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="YouTube music player"
        style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
      ></iframe>
    </div>
  );
};

export default YoutubePlayer;
