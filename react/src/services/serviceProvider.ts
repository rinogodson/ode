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

export { playFn, pauseFn, ytSetup, getTitle, seekFn };
