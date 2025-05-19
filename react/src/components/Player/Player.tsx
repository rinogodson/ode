import * as LucideIcons from "lucide-react";
function Player() {
  return (
    <div className="flex flex-col gap-8 bg-[#0b0b0b] w-180 h-120 rounded-[100px] border-[rgba(255,255,255,0.1)] border-[1px] p-10">
      <div className="bg-black w-full h-[10em] rounded-[calc(100px_-_2.5rem)] border-[1px] border-[rgba(255,255,255,0.1)]"></div>
      {/* button container */}
      <div className="h-full grid grid-cols-3 gap-2 place-items-center justify-center items-center">
        <Button lucideString="SkipBack" clickAction={() => {}} scale={3}/>
        <Button lucideString="Play" clickAction={() => {}} scale={3}/>
        <Button lucideString="SkipForward" clickAction={() => {}} scale={3}/>
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
      className={`w-[${scale ?? "1"}em] aspect-square w-full flex items-center justify-center bg-[rgba(255,255,255,0.1)] rounded-full hover:bg-[rgba(255,255,255,0.2)]`}
    >
      <Icon className="text-white w-full aspect-square" size={(scale??1)*20} />
    </button>
  );
};
