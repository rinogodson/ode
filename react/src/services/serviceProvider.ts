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

export { playFn, pauseFn, ytSetup };
