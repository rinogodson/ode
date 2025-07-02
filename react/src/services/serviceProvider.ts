import type React from "react";
import YouTubeIFrameCtrl from "youtube-iframe-ctrl";

let ytElement: YouTubeIFrameCtrl;

function download(filename: string, text: string) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const ytSetup = (yt_ref: React.RefObject<HTMLIFrameElement> | React.RefObject<null>) => {
  if (!yt_ref.current) return;
  ytElement = new YouTubeIFrameCtrl(yt_ref.current);
  //  ytElement.command("loadVideoById", [appContext.loadedCard.songs[appContext.currentTrack].id])
  //
};

const fetchYouTubeTitle = async (link: string)=>{
  const url = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${link}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    
    const title = json.title;
    console.log(title);
    return title 
  } catch (error: any) {
    console.error(error.message);
    return ""
  }
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
};

const formatText = (text: string, limit: number) => {
  return text.slice(0, limit) + (text.length > limit ? "..." : "");
};

export {
  playFn,
  pauseFn,
  ytSetup,
  getTitle,
  seekFn,
  formatTime,
  formatText,
  ytElement,
  fetchYouTubeTitle,
  download
};
