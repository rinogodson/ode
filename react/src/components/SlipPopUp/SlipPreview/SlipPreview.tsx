import { Asterisk, ChevronLeft, CircleMinus, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, type MouseEventHandler } from "react";
import { LoadedCard } from "@/services/ContextService";
import type { cardContextType } from "@/services/types";

function SlipPreview({
  goBackFn,
  name,
  songs,
  contain,
  deleteSong,
  current_index,
}: {
  goBackFn: any;
  name: string;
  songs: { title: string; id: string }[];
  contain: boolean;
  deleteSong: Function;
  current_index: number;
}) {
  const { setAppContext }: any = useContext(LoadedCard);

  return (
    <div
      style={{ fontFamily: "IBM Plex Sans" }}
      className="w-full h-full place-items-center grid grid-cols-[1fr] grid-rows-[1.5em_1fr] justify-start items-center flex-col overflow-hidden"
    >
      <div className="bg-linear-to-b from-[rgba(0,0,0,0.3)] w-full h-full flex justify-between items-center text-[0.7em] text-[rgba(255,255,255,0.9)] px-1">
        <button
          onClick={goBackFn}
          className="flex justify-center items-center rounded-[0.5rem] hover:translate-x-[-0.2em] transition-all duration-300"
        >
          <ChevronLeft />
          Go Back
        </button>
        <div className="w-[2px] h-5 bg-[rgba(255,255,255,0.3)]"></div>
        <h1 className="whitespace-nowrap overflow-hidden overflow-ellipsis w-50">
          {name}
        </h1>
      </div>
      <div className="px-1 h-full w-full">
        <motion.div
          initial={{ height: "0" }}
          animate={{ height: "10.7em" }}
          className="overflow-hidden grid grid-rows-[1fr_2.25rem] w-full rounded-t-[0.4em] rounded-b-[0.4em] border-1 border-[rgba(255,255,255,0.1)]"
        >
          <div className="overflow-scroll h-full pb-5">
            <AnimatePresence>
              {songs.map((song, index) => {
                return (
                  <SongListItem
                    key={song.id}
                    deleteSong={() => {
                      deleteSong(songs[index], current_index);
                    }}
                    name={song.title}
                  />
                );
              })}
            </AnimatePresence>
          </div>
          <p
            style={{ fontFamily: "Instrument Serif" }}
            className="text-[rgba(255,255,255,0.4)] text-[0.7em] flex w-full justify-between px-2 items-center h-full border-t-1 border-[rgba(255,255,255,0.2)]"
          >
            <Play
              onClick={() => {
                setAppContext((prev: { loadedCard: cardContextType }) => ({
                  ...prev,
                  currentTrack: 0,
                  loadedCard: {
                    properties: {
                      title: name,
                      color: "#101010",
                      blur: "1",
                      bgType: "color",
                      cdHero: "char",
                      char: "🔖 slip",
                    },
                    songs: [...songs],
                  },
                }));
              }}
              size={20}
              className="text-white hover:scale-110 active:scale-100 transition-all duration-200"
            />
            {songs.length} Songs
            {contain ? (
              <Asterisk
                className={
                  "text-[rgba(255,255,255,1)] w-6 aspect-square rounded-[6px] flex justify-center items-center transition-all duration-200"
                }
              />
            ) : (
              <div className="w-6"></div>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

const SongListItem = ({
  name,
  deleteSong,
}: {
  name: string;
  deleteSong: MouseEventHandler<SVGSVGElement> | undefined;
}) => {
  return (
    <motion.div
      layout
      initial={false}
      animate={{ scaleY: "1" }}
      exit={{ scaleY: "0" }}
      transition={{ duration: 0.2 }}
      className="w-full h-12 bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] border-b-1 border-[rgba(255,255,255,0.1)] text-[0.8em] flex items-center justify-between px-2 text-white"
    >
      <p className="whitespace-nowrap overflow-hidden overflow-ellipsis w-65">
        {name}
      </p>
      <CircleMinus
        className="hover:scale-110 active:scale-95 hover:text-red-400 transition-all duration-200 mr-1"
        onClick={deleteSong}
      />
    </motion.div>
  );
};

export default SlipPreview;
