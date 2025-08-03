import { Tooltip } from "react-tooltip";
import ColorChangeOption from "@/components/ColorChangeOption/ColorChangeOption";
import { closestCorners, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  download,
  fetchYouTubeTitle,
  formatText,
} from "@/services/serviceProvider";
import type { cardContextType } from "@/services/types";
import { motion } from "framer-motion";
import { AArrowDown, BadgeX, Copy, Ellipsis, Plus } from "lucide-react";
import { useState } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface CrafterContextType {
  link: string;
  title: string;
  inputCard: cardContextType;
}

function CardCrafter({
  setShowCrafter,
  initVal,
}: {
  setShowCrafter: Function;
  initVal: cardContextType | null;
}) {
  const style = {
    buttonStyle:
      "bg-[#1b1b1b] border-1 border-[#2b2b2b] rounded-full flex justify-center items-center transition-[all_100ms] active:scale-[0.9] hover:bg-[#2b2b2b] hover:scale-[0.99] cursor-pointer",
  };
  const [crafterContext, setCrafterContext] = useState<CrafterContextType>({
    link: "",
    title: "",
    inputCard: initVal || {
      properties: {
        title: "",
        color: "#11262A",
        blur: "1",
        bgType: "color",
        cdHero: "char",
        char: "📻",
      },
      title: "",
      songs: [],
    },
  });

  const getID = (url: string | null) => {
    if (typeof url !== "string") {
      return null;
    }
    url = url.trim();
    let match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (match) {
      return match[1];
    }
    match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (match) {
      return match[1];
    }
    match = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    if (match) {
      return match[1];
    }
    match = url.match(/m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
    if (match) {
      return match[1];
    }
    match = url.match(/music\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
    if (match) {
      return match[1];
    }
    return null;
  };

  function valid(url: string | null) {
    if (!url || typeof url !== "string") {
      return false;
    }

    url = url.trim();

    const patterns = [
      /youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}/,
      /youtu\.be\/[a-zA-Z0-9_-]{11}/,
      /youtube\.com\/embed\/[a-zA-Z0-9_-]{11}/,
      /m\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}/,
      /music\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}/,
    ];

    return patterns.some((pattern) => pattern.test(url));
  }
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setCrafterContext((ctx) => {
      const oldIndex = ctx.inputCard.songs.findIndex((s) => s.id === active.id);
      const newIndex = ctx.inputCard.songs.findIndex((s) => s.id === over.id);
      const newSongs = [...ctx.inputCard.songs];
      newSongs.splice(oldIndex, 1);
      newSongs.splice(newIndex, 0, ctx.inputCard.songs[oldIndex]);
      return {
        ...ctx,
        inputCard: { ...ctx.inputCard, songs: newSongs },
      };
    });
  };
  const sectionStyles =
    "bg-[#131313] border-[0.1px] border-[rgba(255,255,255,0.08)] rounded-[0.75em]";
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(10px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      exit={{ opacity: 0, transform: "translateY(-10px)" }}
      transition={{ duration: 0.3 }}
      className="flex justify-center items-center w-screen h-screen absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10000 backdrop-blur-[20px]"
    >
      <div className="w-[60em] h-[45em] bg-[#0b0b0b] border-[1px] rounded-[2em] border-[rgba(255,255,255,0.1)] grid grid-cols-[25em_1fr]  grid-rows-[1fr_7fr] p-5 gap-5">
        <div
          id="titlesection"
          className={`w-full h-full flex justify-center items-center [grid-area:1/1/2/2] ${sectionStyles}`}
        >
          <input
            type="text"
            placeholder="Enter Title"
            className="w-full h-full p-5 text-[3em] outline-none"
            value={crafterContext.inputCard.properties.title}
            onChange={(e) => {
              setCrafterContext({
                ...crafterContext,
                inputCard: {
                  ...crafterContext.inputCard,
                  properties: {
                    ...crafterContext.inputCard.properties,
                    title: e.target.value,
                  },
                },
              });
            }}
          />
        </div>
        <div
          id="currentcard"
          className={`w-full h-full flex flex-col justify-between items-center [grid-area:2/1/3/2] ${sectionStyles.replace("bg-[#131313]", "")} bg-[radial-gradient(ellipse_at_center,_#0B0B0B,_#131313)]`}
        >
          <ColorChangeOption
            setCrafterContext={setCrafterContext}
            crafterContext={crafterContext}
          />
          <CardPreviewCardCrafter crafterContext={crafterContext} />
          <div
            id="btncont"
            className="h-[5em] p-3 gap-3 w-full flex items-center justify-center"
          >
            <button
              onClick={() => {
                setShowCrafter(false);
              }}
              className={`${style.buttonStyle} w-full h-full text-white font-bold`}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (
                  !crafterContext.inputCard.properties.title ||
                  crafterContext.inputCard.songs.length === 0
                ) {
                  window.alert(
                    "Please enter a title and add at least one song",
                  );
                  return;
                }
                const jsonstring = `
                {
                  "loadedCard": {
                  "properties": {
                    "title": "${crafterContext.inputCard.properties.title}",
                    "color": "${crafterContext.inputCard.properties.color}",
                    "blur": "${crafterContext.inputCard.properties.blur}",
                    "bgType": "${crafterContext.inputCard.properties.bgType}",
                    "cdHero": "${crafterContext.inputCard.properties.cdHero}",
                    "char": "${crafterContext.inputCard.properties.char}"
                  },
                  "title": "${crafterContext.inputCard.title}",  
                  "songs": ${JSON.stringify(crafterContext.inputCard.songs)}    }
                }
                `;
                download(
                  `${crafterContext.inputCard.properties.title}.card`,
                  jsonstring,
                );

                setShowCrafter(false);
              }}
              className={`${style.buttonStyle} w-full h-full text-white font-bold`}
            >
              Download
            </button>
          </div>
        </div>
        <div
          id="songcreationsection"
          className={`grid grid-cols-1 p-5 gap-3 grid-rows-[1fr_10em] w-full h-full [grid-area:1/2/3/3] ${sectionStyles}`}
        >
          <div
            id="list"
            className="pb-[3em] border-b-1 border-b-[rgba(255,255,255,0.1)] flex flex-col gap-3 overflow-x-hidden overflow-y-scroll"
          >
            <DndContext
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={crafterContext.inputCard.songs.map((song) => song.id)}
                strategy={verticalListSortingStrategy}
              >
                <Tooltip id={"crafter-tip"} />
                <Tooltip id={"card-tip"} className="z-10000 scale-80" />
                {crafterContext.inputCard.songs.map(
                  (song: { title: string; id: string }, index: number) => {
                    return (
                      <ListComponent
                        key_name={song.id}
                        id={song.id}
                        name={song.title}
                        setFn={setCrafterContext}
                        crafterContext={crafterContext}
                        index={index}
                      />
                    );
                  },
                )}
              </SortableContext>
            </DndContext>
          </div>
          <div
            id="input"
            className="grid gap-3 grid-rows-[1fr_1fr] grid-cols-[1fr_5em]"
          >
            <input
              placeholder="Enter the link here"
              type="text"
              className="border-3 border-[#3b3b3b] rounded-2xl focus:border-[#515151] outline-none px-5 text-[1.7em] w-full h-full [grid-area:1/1/2/2]"
              value={String(crafterContext.link)}
              onChange={(e) => {
                setCrafterContext({
                  ...crafterContext,
                  link: e.target.value,
                });
              }}
            />
            <input
              placeholder="Title... you can fetch it >>>"
              type="text"
              className="border-3 border-[#3b3b3b] rounded-2xl focus:border-[#515151] outline-none px-5 text-[1.7em] w-full h-full [grid-area:2/1/3/2]"
              value={crafterContext.title}
              onChange={(e) => {
                setCrafterContext({
                  ...crafterContext,
                  title: e.target.value,
                });
              }}
            />
            <button
              onClick={() => {
                if (!valid(crafterContext.link) || !crafterContext.title) {
                  window.alert("Invalid Link / No Title");
                  return;
                }
                const existingSongIndex =
                  crafterContext.inputCard.songs.findIndex(
                    (song) => song.id === getID(crafterContext.link),
                  );
                if (existingSongIndex !== -1) {
                  const updatedSongs = [...crafterContext.inputCard.songs];
                  updatedSongs[existingSongIndex] = {
                    title: crafterContext.title,
                    id: getID(crafterContext.link) || "",
                  };
                  setCrafterContext({
                    ...crafterContext,
                    link: "",
                    title: "",
                    inputCard: {
                      ...crafterContext.inputCard,
                      songs: updatedSongs,
                    },
                  });
                  return;
                }
                setCrafterContext({
                  ...crafterContext,
                  link: "",
                  title: "",
                  inputCard: {
                    ...crafterContext.inputCard,
                    songs: [
                      ...crafterContext.inputCard.songs,
                      {
                        title: crafterContext.title,
                        id: getID(crafterContext.link) || "",
                      },
                    ],
                  },
                });
              }}
              className="bg-[#1b1b1b] border-1 border-[#2b2b2b] rounded-full flex justify-center items-center hover:border-6 active:scale-[0.9] active:border-10 transition-[all_100ms]"
            >
              <Plus size={35} />
            </button>
            <button
              onClick={async () => {
                const title = await fetchYouTubeTitle(
                  String(getID(crafterContext.link)),
                );
                if (title) {
                  setCrafterContext({
                    ...crafterContext,
                    title: title,
                  });
                }
              }}
              className="bg-[#1b1b1b] border-1 border-[#2b2b2b] rounded-full flex justify-center items-center hover:border-6 active:scale-[0.9] active:border-10 transition-[all_100ms]"
            >
              <AArrowDown size={35} />{" "}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CardCrafter;

const ListComponent = ({
  name,
  key_name,
  id,
  setFn,
  crafterContext,
  index,
}: {
  name: string;
  key_name: string;
  id: string;
  setFn: Function;
  crafterContext: any;
  index: number;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition: transition,
        transform: CSS.Transform.toString(transform),
      }}
      id={id}
      key={key_name}
      data-tooltip-id={"crafter-tip"}
      data-tooltip-content={name}
      data-tooltip-place="top"
    >
      <div className="w-full flex justify-between items-center bg-[rgba(0,0,0,0.6)] px-6 rounded-[3em] border-3 border-[rgba(255,255,255,0.1)]">
        <p
          {...listeners}
          className="text-[#888] py-5 text-[1.5em] w-full overflow-scroll"
        >
          {formatText(name, 28)}
        </p>
        <div className="flex gap-5">
          <button
            className="text-[#888] hover:text-[#FFF] hover:scale-120 active:scale-[0.9] transition-[all_100ms]"
            onClick={() => {
              navigator.clipboard.writeText(
                "https://www.youtube.com/watch?v=" + id,
              );
              window.alert("Copied to clipboard!");
            }}
          >
            <Copy />
          </button>
          <button
            onClick={() => {
              setFn({
                ...crafterContext,
                inputCard: {
                  ...crafterContext.inputCard,
                  songs: [
                    ...crafterContext.inputCard.songs.slice(0, index),
                    ...crafterContext.inputCard.songs.slice(index + 1),
                  ],
                },
              });
            }}
            className="text-[#AA7070] hover:text-[#EBA1A0] hover:rotate-90 active:rotate-0 hover:scale-120 transition-[all_100ms] active:scale-[0.9]"
          >
            <BadgeX />
          </button>
        </div>
      </div>
    </div>
  );
};

const CardPreviewCardCrafter = ({
  crafterContext,
}: {
  crafterContext: any;
}) => {
  const [rotation, setRotation] = useState(0);
  return (
    <>
      <div
        className="cursor-pointer grid relative grid-cols-1 grid-rows-[10em_1px_1fr]  w-[12em]"
        style={{
          bottom: rotation == 0 ? "0em" : "-5em",
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
                crafterContext.inputCard.properties.bgType === "color"
                  ? crafterContext.inputCard.properties.color
                  : "black",
            }}
            className="overflow-hidden h-[80%] rounded-[1em_1em_0.25em_0.25em] flex relative justify-center items-center"
          >
            {crafterContext.inputCard.properties.bgType === "blur" && (
              <>
                {crafterContext.inputCard.songs[
                  crafterContext.inputCard.properties.blur - 1
                ] ? (
                  <img
                    src={`https://img.youtube.com/vi/${
                      crafterContext.inputCard.songs[
                        crafterContext.inputCard.properties.blur - 1
                      ].id
                    }/0.jpg`}
                    alt="Song Thumbnail"
                    className="w-full h-full object-cover blur-[1em] block brightness-50"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <p className="text-sm opacity-60">
                      No background available
                    </p>
                  </div>
                )}
              </>
            )}
            {crafterContext.inputCard.properties.cdHero === "char" ? (
              <p
                className="flex w-fit h-fit justify-start items-end text-[2.3em] absolute p-2 text-white"
                style={{
                  fontFamily: "Pixelify Sans",
                }}
              >
                {crafterContext.inputCard.properties.char}
              </p>
            ) : (
              <p
                className="whitespace-nowrap overflow-hidden overflow-ellipsis flex w-full h-fit justify-start items-end text-[1.2em] absolute bottom-0 left-0 p-2 text-white"
                style={{
                  fontFamily: "Pixelify Sans",
                }}
              >
                {crafterContext.inputCard.properties.title}
              </p>
            )}
          </div>
          <p
            className="flex w-full justify-center items-center m-[0.5em_0] text-[#828282]"
            style={{ fontFamily: "Instrument Serif" }}
          >
            {crafterContext.inputCard.songs.length} Songs
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
            {crafterContext.inputCard.songs.map(
              (song: { title: string; id: string }, index: number) => {
                return (
                  <div
                    data-tooltip-id={"card-tip"}
                    data-tooltip-content={song.title}
                    data-tooltip-place="left-end"
                    key={index}
                    style={{
                      fontFamily: "Instrument Serif",
                      fontSize: "1.2em",
                      color: "#FFF",
                      borderColor: "#888",
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
