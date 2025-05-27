import YouTubeIFrameCtrl from "youtube-iframe-ctrl";

let ytElement: YouTubeIFrameCtrl;

const ytSetup = (yt_ref: React.RefObject<HTMLIFrameElement>) => {
  ytElement = new YouTubeIFrameCtrl(yt_ref.current);
};

const playFn = () => {
  ytElement.play();
};

const pauseFn = () => {
  ytElement.pause();
};

const getTitle = () => {
//  ytElement.command("setPlaybackRate", [2]);
};

const seekFn = (seconds: number) => {
  ytElement.command("seekTo", [seconds]);
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds - minutes * 60);
  return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
}

const formatText = (text: string) => {
  return text.slice(0, 38) + (text.length > 38 ? "..." : "");
}

export { playFn, pauseFn, ytSetup, getTitle, seekFn, formatTime, formatText };

