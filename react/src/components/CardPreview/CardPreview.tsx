import { LoadedCard } from "@/services/ContextService";
import { Ellipsis } from "lucide-react";
import { useContext, useState } from "react";
import { Tooltip } from "react-tooltip";

export const CardPreview = () => {
  const [rotation, setRotation] = useState(0);
  const { appContext, setAppContext }: any = useContext(LoadedCard);
  return (
    <>
      <Tooltip id="card-preview-tooltip" />
      <div
        className="cursor-pointer absolute right-8 grid grid-cols-1 grid-rows-[10em_1px_1fr]  w-[12em]"
        style={{
          bottom: rotation == 0 ? "2em" : "-8em",
          transition: "all 0.65s cubic-bezier(0.77, 0, 0.175, 1)",
        }}
      >
        <div
          onClick={() => {
            if (rotation != 180) {
              setRotation(180);
            } else {
              setRotation(0);
            }
          }}
          className="flex flex-col z-100 bg-[#050505] h-[10em] rounded-[2em_2em_1em_1em] overflow-hidden p-4 pb-0 border-[rgba(255,255,255,0.1)] border-[0.1em_0.1em_0px_0.1em]"
        >
          <div
            style={{
              background:
                appContext.loadedCard.properties.bgType === "color"
                  ? appContext.loadedCard.properties.color
                  : "black",
            }}
            className="overflow-hidden h-[80%] rounded-[1em_1em_0.25em_0.25em] block relative"
          >
            {appContext.loadedCard.properties.bgType === "blur" && (
              <img
                src={
                  appContext.loadedCard.properties.bgType === "color"
                    ? ""
                    : `https://img.youtube.com/vi/${appContext.loadedCard.songs[appContext.loadedCard.properties.blur - 1].id}/0.jpg`
                }
                alt="Song Thumbnail"
                className="w-full h-full object-cover blur-[1em] brightness-50 absolute top-0 left-0 z-0"
              />
            )}

            {appContext.loadedCard.properties.cdHero === "char" ? (
              <p
                className="flex w-full h-full justify-center items-center text-[2.3em] p-2 text-white absolute z-10"
                style={{
                  fontFamily: "Pixelify Sans",
                }}
              >
                {appContext.loadedCard.properties.char}
              </p>
            ) : (
              <p
                className="flex w-full h-fit justify-start items-end text-[1.2em] absolute bottom-0 left-0 p-2 text-white whitespace-nowrap overflow-hidden overflow-ellipsis"
                style={{
                  fontFamily: "Pixelify Sans",
                }}
              >
                {appContext.loadedCard.properties.title}
              </p>
            )}
          </div>
          <p
            className="flex w-full justify-center items-center m-[0.5em_0] text-[#828282]"
            style={{ fontFamily: "Instrument Serif" }}
          >
            {appContext.loadedCard.songs.length} Songs
          </p>
        </div>
        <div className="w-[calc(100%_-_2.1em)] h-[1px] bg-[#050505] border-dashed border-[#191919] border-[1px] place-self-center"></div>
        <div
          style={{
            transform: `rotateX(${rotation}deg)`,
            transformOrigin: "top",
            transition: "transform 0.65s cubic-bezier(0.77, 0, 0.175, 1)",
          }}
          className=" h-[11em] flex justify-center items-center flex-col bg-[#050505] p-2 pb-0 rounded-[1em_1em_2em_2em] border-[0_0.1em_0.1em_0.1em] border-[rgba(255,255,255,0.1)]"
        >
          <div className="w-full h-full px-2 py-1 bg-[#101010] rounded-[0.5em_0.5em_1.5em_1.5em] overflow-scroll">
            {appContext.loadedCard.songs.map(
              (song: { title: string; id: string }, index: number) => {
                return (
                  <div
                    data-tooltip-id="card-preview-tooltip"
                    data-tooltip-content={song.title}
                    data-tooltip-place="left"
                    key={index + "prev"}
                    onClick={() => {
                      setAppContext((prev: typeof appContext) => ({
                        ...prev,
                        currentTrack: index,
                      }));
                    }}
                    style={{
                      fontFamily: "Instrument Serif",
                      fontSize: "1.2em",
                      color:
                        appContext.currentTrack === index ? "#FFF" : "#888",
                      borderColor:
                        appContext.currentTrack == index ? "#FFF" : "#1E1E1E",
                    }}
                    className="border-b-[1px] whitespace-nowrap overflow-hidden overflow-ellipsis"
                  >
                    {String(index + 1) + " ~ " + song.title}
                  </div>
                );
              },
            )}
          </div>
          <Ellipsis
            onClick={() => {
              if (rotation != 180) {
                setRotation(180);
              } else {
                setRotation(0);
              }
            }}
            className="text-[#888] m-0 p-0 w-full"
            size={30}
          />
        </div>
      </div>
    </>
  );
};
