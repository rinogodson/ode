import { useRef, useEffect } from "react";
const YoutubePlayer = () => {
  const ytRef = useRef(null);
  const play_video = () => {
    ytRef.current.contentWindow.postMessage('{ "event": "command", "func": "playVideo" }', '*')
    console.log(ytRef.current);
    
  }
  const pause_video = () => {
    ytRef.current.contentWindow.postMessage('{ "event": "command", "func": "pauseVideo" }', '*')
    console.log(ytRef.current);
  }
  useEffect(() => {
    window.addEventListener("load", play_video)
  }, [])
  
  return (
    <div>
      <iframe
        width="1"
        height="1"
        ref={ytRef}
        src="https://www.youtube-nocookie.com/embed/9SqWBe5aK5s?enablejsapi=1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="YouTube music player"
        style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
      ></iframe>
      <button type="button" onClick={play_video}>play</button>
      <button type="button" onClick={pause_video}>pause</button>
    </div>
  );
};

export default YoutubePlayer;
