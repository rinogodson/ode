import * as LucideIcons from "lucide-react";
import { useEffect, useRef, useState } from "react";
import YouTubePlayer from "../YoutubePlayer/YoutubePlayer";
import {
  playFn,
  pauseFn,
  ytSetup,
  seekFn,
  formatTime,
  formatText,
  ytElement,
} from "@/services/serviceProvider";
import Slider from "../Slider/Slider";
import React from "react";
import { LoadedCard } from "@/services/ContextService";
function Player({
  timestamp,
  setTimestamp,
  yt_ref,
}: {
  timestamp: { current: number; total: number };
  setTimestamp: React.Dispatch<
    React.SetStateAction<{ current: number; total: number }>
  >;
  yt_ref: any;
}) {
  const time_bar_ref = useRef(null);

  const { appContext, setAppContext }: any = React.useContext(LoadedCard);

  useEffect(() => {
    if (!yt_ref.current) return;
    ytSetup(yt_ref);
    ytElement.command("loadVideoById", [
      appContext.loadedCard.songs[appContext.currentTrack].id,
    ]);

    const handleTimeUpdate = (data: { current: number; total: number }) => {
      setTimestamp(data);
    };
    yt_ref.current.addEventListener("ytmessage", (e: any) => {
      const { info } = e.detail || {};
      if (info?.progressState) {
        handleTimeUpdate({
          current: info.progressState.current,
          total: info.progressState.duration,
        });
      }
    });

    yt_ref.current.addEventListener("ytstatechange", (e: any) => {
      setAppContext((prev: typeof appContext) => ({
        ...prev,
        playerState: e.detail,
      }));
      getTitle();
    });
  }, []);

  useEffect(() => {
    if (ytElement) {
      ytElement.command("loadVideoById", [
        appContext.loadedCard.songs[appContext.currentTrack].id,
      ]);
    }
  }, [appContext.currentTrack, appContext.loadedCard]);

  const prev_fn = () => {
    setAppContext((prev: any) => {
      const newIndex = Math.max(prev.currentTrack - 1, 0);
      return {
        ...prev,
        currentTrack: newIndex,
      };
    });
  };

  const next_fn = () => {
    setAppContext((prev: any) => {
      const maxIndex = prev.loadedCard.songs.length - 1;
      const newIndex = Math.min(prev.currentTrack + 1, maxIndex);
      return {
        ...prev,
        currentTrack: newIndex,
      };
    });
  };

  const [barValues, setBarValues] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  useEffect(() => {
    if (appContext.playerState === "PLAYING") {
      const interval = setInterval(() => {
        setBarValues((prevValues) => prevValues.map(() => Math.random()));
      }, 200);

      return () => clearInterval(interval);
    } else {
      setBarValues([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    console.log(appContext.playerState);
    if (appContext.playerState === "ENDED") {
      next_fn();
    }
  }, [appContext.playerState]);

  return (
    <>
      <YouTubePlayer yt_ref={yt_ref} />
      <div className="z-[1000] shadow-[inset_0px_-5px_50px_0px_rgba(0,0,0,0.8)] flex flex-col gap-4 h-139 bg-[#0f0f0f] rounded-[100px] border-[rgba(255,255,255,0.1)] border-[1px] p-10">
        <div className="flex justify-center gap-4 items-center">
          <button
            style={{
              background: "linear-gradient(145deg, #262626, #0e0e0e)",
              boxShadow:
                "20px 20px 60px #0b0b0b, -20px -20px 60px #131313, 0 0px 0px 1px rgba(255,255,255,0.2)",
            }}
            onClick={() => seekFn(timestamp.current - 10)}
            className="pr-4.5 pl-5.5 rounded-[100px_30px_30px_30px] h-[calc(100%)] relative inline-flex items-end justify-center shadow-[inset_1px_1px_50px_rgba(0,0,0,0.5),inset_-1px_-1px_50px_rgba(0,0,0,0.2),2px_2px_4px_#000] text-[rgba(210,210,210,0.9)] uppercase tracking-wider text-center transition-all duration-50 active:scale-[0.98] active:bg-neutral-800 active:shadow-[inset_0_0_50px_rgba(0,0,0,0.5),inset_1px_1px_1px_transparent,inset_-1px_-1px_1px_transparent,2px_2px_50px_transparent] active:brightness-[0.8]"
          >
            <LucideIcons.RotateCcw size={25} className="mb-9" />
          </button>
          <div
            ref={time_bar_ref}
            className="bg-black w-full gap-1 h-[7em] px-8 rounded-[calc(100px_-_2.5rem)] border-[1px] border-[rgba(255,255,255,0.1)] flex justify-evenly items-center"
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="flex items-end w-[0.4em] mx-3  h-[calc(100%_-_2em)] rounded-full bg-[rgba(255,255,255,0.1)]"
              >
                <div
                  style={{
                    height: `${Math.floor(barValues[i] * 100)}%`,
                    background: "rgba(255, 255, 255, 0.08)",
                    transition: "all 750ms",
                  }}
                  className="w-full rounded-full"
                ></div>
              </div>
            ))}
            <Slider
              minimum={0}
              maximum={timestamp.total}
              value={timestamp.current}
              onChangeFn={(e) => {
                seekFn(Number(e.target.value));
              }}
            />
          </div>
          <button
            style={{
              background: "linear-gradient(145deg, #262626, #0e0e0e)",
              boxShadow:
                "20px 20px 60px #0b0b0b, -20px -20px 60px #131313, 0 0px 0px 1px rgba(255,255,255,0.2)",
            }}
            onClick={() => seekFn(timestamp.current + 10)}
            className="pr-5.5 pl-4.5 rounded-[30px_100px_30px_30px] h-[calc(100%)] relative inline-flex items-end justify-center shadow-[inset_1px_1px_50px_rgba(0,0,0,0.5),inset_-1px_-1px_50px_rgba(0,0,0,0.2),2px_2px_4px_#000] text-[rgba(210,210,210,0.9)] uppercase tracking-wider text-center transition-all duration-50 active:scale-[0.98] active:bg-neutral-800 active:shadow-[inset_0_0_50px_rgba(0,0,0,0.5),inset_1px_1px_1px_transparent,inset_-1px_-1px_1px_transparent,2px_2px_50px_transparent] active:brightness-[0.8]"
          >
            <LucideIcons.RotateCw size={25} className="mb-9" />
          </button>
        </div>

        {/* display */}
        <div
          style={{
            fontFamily: "Pixelify Sans",
            background: "rgba(0,5,0,0.5)",
            boxShadow: "inset 0 -20px 100px 2px rgba(0,0,0,0.1)",
          }}
          className="w-full h-full  border-[1px_solid_black] mb-6 mt-1 rounded-[20px] grid grid-rows-2 grid-cols-[1fr_3em] justify-start items-center text-[27px] px-4 py-2 text-[rgba(200,255,200,0.3)]"
        >
          <p
            style={{ textShadow: "0 0 30px rgba(0,150,0,0.5)" }}
            className="[grid-area:_1_/_1_/_2_/_2]"
          >
            {formatTime(timestamp.current)}/{formatTime(timestamp.total)}
          </p>
          <p
            style={{ textShadow: "0 0 30px rgba(0,150,0,0.5)" }}
            className="[grid-area:_2_/_1_/_3_/_2]"
          >
            {formatText(
              appContext.loadedCard.songs[appContext.currentTrack].title,
              38,
            )}
          </p>
          <div className="[grid-area:_1_/_2_/_3_/_3]">
            <img src="./Vector.svg" width={"80%"} height={"80%"} />
            <div className="h-[2.3em] z-[-1] blur-[20px] transform-[translate(0%,-100%)] aspect-square bg-[rgba(0,100,0,0.5)] absolute"></div>
          </div>
        </div>

        {/* button container */}
        <div className="h-full grid grid-cols-3 gap-2 place-items-center justify-center items-center">
          <Button lucideString="SkipBack" clickAction={prev_fn} scale={2.3} />
          <Button
            lucideString={
              appContext.playerState === "PLAYING"
                ? "Pause"
                : appContext.playerState === "PAUSED"
                  ? "Music2"
                  : appContext.playerState === "BUFFERING"
                    ? "Loader"
                    : "Music2"
            }
            clickAction={() => {
              appContext.playerState === "PLAYING" ? pauseFn() : playFn();
            }}
            scale={3}
          />
          <Button
            lucideString="SkipForward"
            clickAction={next_fn}
            scale={2.3}
          />
        </div>
      </div>
    </>
  );
}

export default Player;

{
  /* button component */
  /* need to refactor this later */
}

export const Button = ({
  lucideString,
  clickAction,
  scale,
}: {
  lucideString: string;
  clickAction: () => void;
  scale?: number;
}) => {
  const Icon = (LucideIcons[lucideString as keyof typeof LucideIcons] ??
    LucideIcons.Ban) as React.ElementType;
  return (
    <button
      onClick={clickAction}
      className="relative inline-flex items-center justify-center w-24 aspect-square rounded-[35%] text-white uppercase tracking-wider text-center transition-all duration-50 active:scale-[0.98] active:bg-neutral-800 active:shadow-[inset_0_0_50px_rgba(0,0,0,0.5),inset_1px_1px_1px_transparent,inset_-1px_-1px_1px_transparent,2px_2px_50px_transparent] px-3 py-2 active:brightness-[0.8]"
      style={{
        width: `calc(${scale ?? 1} * 4em )`,
        background: "radial-gradient(#242424, #0e0e0e)",
        boxShadow:
          "0 0 0px 2px rgba(255,255,255,0.1), 20px 20px 60px #0b0b0b, -20px -20px 60px #131313",
      }}
    >
      <Icon
        className="text-[rgba(210,210,210,0.9)] w-full aspect-square"
        size={(scale ?? 1) * 20}
      />
    </button>
  );
};
