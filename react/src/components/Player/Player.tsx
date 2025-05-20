import * as LucideIcons from "lucide-react";
import { useState } from "react";
function Player({
  playpause_fn,
  next_fn,
  prev_fn,
  time_stamp,
}: {
  playpause_fn: () => void;
  next_fn: () => void;
  prev_fn: () => void;
  time_stamp: number;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="flex flex-col gap-8 bg-[#0b0b0b] w-180 h-120 rounded-[100px] border-[rgba(255,255,255,0.1)] border-[1px] p-10">
      <div className="bg-black w-full h-[10em] rounded-[calc(100px_-_2.5rem)] border-[1px] border-[rgba(255,255,255,0.1)]"></div>
      {/* button container */}
      <div className="h-full grid grid-cols-3 gap-2 place-items-center justify-center items-center">
        <Button lucideString="SkipBack" clickAction={() => { }} scale={2} />
        <Button
          lucideString={playing ? "Pause" : "Play"}
          clickAction={() => setPlaying(!playing)}
          scale={3}
        />
        <Button lucideString="SkipForward" clickAction={() => { }} scale={2} />
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
      //className={`aspect-square flex items-center justify-center bg-[rgba(255,255,255,0.1)] rounded-full hover:bg-[rgba(255,255,255,0.2)]`}

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
