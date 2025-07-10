import ColorChangeOption from "@/components/ColorChangeOption/ColorChangeOption";
import { LoadedCard } from "@/services/ContextService";
import {
  download,
  fetchYouTubeTitle,
  formatText,
} from "@/services/serviceProvider";
import { motion } from "framer-motion";
import {
  AArrowDown,
  ArrowDown,
  ArrowUp,
  BadgeX,
  Ellipsis,
  Plus,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";

function CardCrafter({ setShowCrafter }: { setShowCrafter: Function }) {
  const style = {
    buttonStyle:
      "bg-[#1b1b1b] border-1 border-[#2b2b2b] rounded-full flex justify-center items-center transition-[all_100ms] active:scale-[0.9] hover:bg-[#2b2b2b] hover:scale-[0.99] cursor-pointer",
  };

  const [crafterContext, setCrafterContext]: [
    { link: string | null; title: string; inputCard: any },
    Function,
  ] = useState({
    link: "",
    title: "",
    inputCard: {
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

  useEffect(() => {
    console.log(crafterContext);
  }, [crafterContext]);

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

  const sectionStyles =
    "bg-[#131313] border-[0.1px] border-[rgba(255,255,255,0.08)] rounded-[0.75em]";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
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
          className={`w-full h-full flex flex-col justify-between items-center [grid-area:2/1/3/2] ${sectionStyles}`}
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
            className="border-b-1 border-b-[rgba(255,255,255,0.1)] flex flex-col gap-3 overflow-y-scroll"
          >
            {crafterContext.inputCard.songs.map((song: any, index: any) => {
              return (
                <ListComponent
                  index={index}
                  key={index}
                  name={song.title}
                  setFn={setCrafterContext}
                  crafterContext={crafterContext}
                />
              );
            })}
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
                        id: getID(crafterContext.link),
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
  setFn,
  crafterContext,
  index,
}: {
  name: string;
  setFn: Function;
  crafterContext: any;
  index: number;
}) => {
  return (
    <motion.div
      layout
      key={index + "Motin"}
      initial={{ opacity: 0, transform: "translateY(-10px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      exit={{ opacity: 0, transform: "translateY(-10px)" }}
      transition={{ duration: 0.3 }}
      className="w-full h-[5em] flex justify-between items-center bg-[rgba(0,0,0,0.3)] p-6 rounded-2xl border-b-3 border-b-[rgba(255,255,255,0.1)]"
    >
      <p className="text-[#888] text-[1.5em] w-full overflow-scroll">
        {formatText(name, 27)}
      </p>

      <div className="flex gap-5">
        <div className="flex flex-col gap-1">
          <button
            onClick={() => {
              let temp = crafterContext.inputCard.songs;
              if (index - 1 < 0) return;
              [temp[index], temp[index - 1]] = [temp[index - 1], temp[index]];
              setFn({
                ...crafterContext,
                inputCard: {
                  ...crafterContext.inputCard,
                  songs: temp,
                },
              });
            }}
            className="bg-[#1b1b1b] rounded-full flex justify-center items-center text-[#888]"
          >
            <ArrowUp size={27} />
          </button>
          <button
            onClick={() => {
              let temp = crafterContext.inputCard.songs;
              if (index + 1 >= temp.length) return;
              [temp[index], temp[index + 1]] = [temp[index + 1], temp[index]];
              setFn({
                ...crafterContext,
                inputCard: {
                  ...crafterContext.inputCard,
                  songs: temp,
                },
              });
            }}
            className="bg-[#1b1b1b] rounded-full flex justify-center items-center text-[#888]"
          >
            <ArrowDown size={27} />
          </button>
        </div>
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
          className="text-red-300"
        >
          <BadgeX />
        </button>
      </div>
    </motion.div>
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
          bottom: rotation == 0 ? "-1em" : "-7em",
          transition: "all 0.65s cubic-bezier(0.77, 0, 0.175, 1)",
        }}
      >
        <div
          style={{
            boxShadow: "0 0 100px 0px rgba(0,0,0,0.5)",
          }}
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
              <img
                src={
                  crafterContext.inputCard.properties.bgType === "color"
                    ? ""
                    : `https://img.youtube.com/vi/${crafterContext.inputCard.songs[crafterContext.inputCard.properties.blur - 1].id}/0.jpg`
                }
                alt="Song Thumbnail"
                className="w-full h-full object-cover blur-[1em] block brightness-50"
              />
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
                className="flex w-full h-fit justify-start items-end text-[1.2em] absolute bottom-0 left-0 p-2 text-white"
                style={{
                  fontFamily: "Pixelify Sans",
                }}
              >
                {formatText(crafterContext.inputCard.properties.title, 20)}
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
            boxShadow: `0 0 100px 0px rgba(0,0,0,${rotation === 0 ? "0.5" : "0"})`,
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
                    key={index}
                    style={{
                      fontFamily: "Instrument Serif",
                      fontSize: "1.2em",
                      color: "#FFF",
                      borderColor: "#888",
                    }}
                    className="border-b-[1px]"
                  >
                    {formatText(String(index + 1) + " ~ " + song.title, 20)}
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
