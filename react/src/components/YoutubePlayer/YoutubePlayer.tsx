const YoutubePlayer = ({
  yt_ref,
}: {
  yt_ref: React.RefObject<HTMLIFrameElement>;
}) => {
  return (
    <div>
      <iframe
        width="1"
        height="1"
        ref={yt_ref}
        src={`https://www.youtube-nocookie.com/embed?enablejsapi=1&autoplay=1&controls=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="YouTube music player"
        style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
      ></iframe>
    </div>
  );
};

export default YoutubePlayer;
