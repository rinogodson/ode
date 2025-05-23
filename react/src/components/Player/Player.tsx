import * as LucideIcons from "lucide-react";
import { useEffect, useRef, useState } from "react";
import YouTubePlayer from "../YoutubePlayer/YoutubePlayer";
function Player({
  playpause_fn,
  next_fn,
  prev_fn,
  volume,
  setVolume,
  currentSong,
}: {
  playpause_fn: () => void;
  next_fn: () => void;
  prev_fn: () => void;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  currentSong: string;
}) {
  const [playing, setPlaying] = useState(false);
  const volume_bar_ref = useRef(null);

  return (
    <div className="flex flex-col gap-8 bg-[#0b0b0b] w-180 h-120 rounded-[100px] border-[rgba(255,255,255,0.1)] border-[1px] p-10">
      <div
        ref={volume_bar_ref}
        className="bg-black w-full h-[10em] rounded-[calc(100px_-_2.5rem)] border-[1px] border-[rgba(255,255,255,0.1)] flex justify-evenly items-center"
      >
        <YouTubePlayer/>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="w-[0.4em] bg-[rgba(255,255,255,0.1)] h-[calc(100%_-_2em)] rounded-full"
          ></div>
        ))}

        <VolumeBall
          parentRef={volume_bar_ref}
          volume={volume}
          setVolume={setVolume}
        />
      </div>
      {/* button container */}
      <div className="h-full grid grid-cols-3 gap-2 place-items-center justify-center items-center">
        <Button lucideString="SkipBack" clickAction={prev_fn} scale={2} />
        <Button
          lucideString={playing ? "Pause" : "Play"}
          clickAction={() => {
            setPlaying(!playing);
            playpause_fn();
          }}
          scale={3}
        />
        <Button lucideString="SkipForward" clickAction={next_fn} scale={2} />
      </div>
    </div>
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
      className="relative inline-flex items-center justify-center w-24 aspect-square border-2 border-transparent rounded-full bg-neutral-700 shadow-[inset_1px_1px_50px_rgba(0,0,0,0.5),inset_-1px_-1px_50px_rgba(0,0,0,0.2),2px_2px_4px_#000] text-white uppercase tracking-wider text-center transition-all duration-50 active:scale-[0.98] active:bg-neutral-800 active:shadow-[inset_0_0_50px_rgba(0,0,0,0.5),inset_1px_1px_1px_transparent,inset_-1px_-1px_1px_transparent,2px_2px_50px_transparent] px-3 py-2 active:brightness-[0.8]"
      style={{
        width: `calc(${scale ?? 1} * 4em )`,
      }}
    >
      <Icon
        className="text-[rgba(210,210,210,0.9)] w-full aspect-square"
        size={(scale ?? 1) * 20}
      />
    </button>
  );
};

export const VolumeBall = ({
  volume,
  setVolume,
  parentRef,
}: {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  parentRef: React.RefObject<HTMLDivElement>;
}) => {
  const [state, setState] = useState({
    x: 0,
    mx: 0,
    percent: 0,
  });

  const [initialState, setInitialState] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    console.log(state);
    setVolume(state.percent);
    console.log(volume);
  }, [state]);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!dragging) return;
      setState({
        x: e.clientX,
        mx: e.clientX - 22.5,
        percent:
          (e.clientX * 100) /
            (parentRef.current as HTMLElement).getClientRects()[0].width -
          22.5,
      });
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", () => setDragging(false));
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });
  return (
    <div
      className="w-8 aspect-square rounded-full bg-white absolute shadow-[inset_0_0_10px_5px_rgba(0,0,0,0.5)]"
      onMouseDown={(e) => {
        e.preventDefault();
        setInitialState(e.clientX - 22.5);
        setDragging(true);
      }}
      style={{
        left: `${state.x}px`,
      }}
    ></div>
  );
};
