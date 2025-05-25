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

// TODO: fix this
const getState = (yt_ref: React.RefObject<HTMLIFrameElement>) => {
  yt_ref.current.addEventListener(
    "ytmessage",
    (e: { detail: { info: { currentTime: number } } }) => {
      console.log(e.detail);
      e.detail;
    },
  );
};

const getTime = (yt_ref: React.RefObject<HTMLIFrameElement>) => {
  yt_ref.current.addEventListener("ytmessage", (e) => {
    return {
      current: e.detail ?? 0,
      total: e.detail.info.progressState.duration ?? 0,
    };
  });
};
export { playFn, pauseFn, getState, getTime, ytSetup };
