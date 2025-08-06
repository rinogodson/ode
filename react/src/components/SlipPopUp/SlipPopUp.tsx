import Fuse from "fuse.js";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Plus, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import SlipPreview from "./SlipPreview/SlipPreview";
import CheckMark from "./CheckMark/CheckMark";
import { LoadedCard } from "@/services/ContextService";
function SlipPopUp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [slips, setSlips] = useState<
    { name: string; songs: { title: string; id: string }[] }[]
  >(() => {
    return JSON.parse(localStorage.getItem("slips") || "[]");
  });
  useEffect(() => {
    localStorage.setItem("slips", JSON.stringify(slips));
    console.log(JSON.parse(localStorage.getItem("slips") || "[]"));
  }, [slips]);
  const [hoveringThing, setHoveringThing] = useState<number | null>(null);

  const { appContext } = useContext<any>(LoadedCard);

  const [previewPageOpts, setPreviewPageOpts] = useState<{
    show: boolean;
    index: number;
  }>({ show: false, index: 0 });

  useEffect(() => {
    console.log(previewPageOpts);
  }, [previewPageOpts]);

  const deleteSlip = (index: number) => {
    const updated = [...slips];
    updated.splice(index, 1);
    setSlips(updated);
  };

  const handleAddSlip = () => {
    if (slips.some((slip) => slip.name === searchQuery)) {
      alert("Slip with this name already exists");
      return;
    }
    const newSlip = { name: searchQuery, songs: [] };
    const updated = [...slips, newSlip];
    setSlips(updated);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (searchQuery) {
        if (event.key === "Enter") {
          handleAddSlip();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [slips, handleAddSlip, searchQuery]);

  const addSong = (song: { title: string; id: string }, index: number) => {
    const newSlips = [...slips];
    newSlips[index].songs.push(song);
    setSlips(newSlips);
  };

  const deleteSong = (song: { title: string; id: string }, index: number) => {
    const newSlips = [...slips];
    const songsCopy = [...newSlips[index].songs];
    const song_index = songsCopy.findIndex((s) => s.id === song.id);

    songsCopy.splice(song_index, 1);
    newSlips[index].songs = songsCopy;
    setSlips(newSlips);
  };

  const fuse = new Fuse(slips, {
    keys: ["name"],
    threshold: 0.3,
  });

  const filteredSlips = searchQuery.trim()
    ? fuse.search(searchQuery).map((result) => result.item)
    : slips;

  return (
    <motion.div
      initial={{
        opacity: 0,
        transform: "translate(-6.25rem,-100%) scale(0)",
      }}
      animate={{
        opacity: 1,
        transform: "translate(-6.25rem,-105%) scale(1)",
        transformOrigin: "bottom",
      }}
      exit={{ opacity: 0, transform: "translate(-6.25rem,-100%) scale(0)" }}
      transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
      className="w-90 h-90 p-3 border-1 border-[rgba(255,255,255,0.1)] bg-[rgba(28,28,28,0.5)] backdrop-blur-2xl rounded-[1em] shadow-lg flex flex-col items-center justify-center absolute z-1000"
    >
      <div
        className={
          "flex flex-col w-full h-full items-center justify-start overflow-y-scroll bg-[rgba(0,0,0,0.2)] rounded-[0.5em] " +
          (previewPageOpts.show ? "" : "pb-10")
        }
      >
        <AnimatePresence mode="wait">
          {previewPageOpts.show ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="h-full w-full"
            >
              <SlipPreview
                name={slips[previewPageOpts.index].name}
                songs={slips[previewPageOpts.index].songs}
                contain={slips[previewPageOpts.index].songs.some(
                  (song) =>
                    song.id ===
                    appContext.loadedCard.songs[appContext.currentTrack]?.id,
                )}
                deleteSong={deleteSong}
                goBackFn={() =>
                  setPreviewPageOpts((prev) => ({ ...prev, show: false }))
                }
                current_index={previewPageOpts.index}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, transform: "translate(-100px, 0px)" }}
              animate={{ opacity: 1, transform: "translate(0px, 0px)" }}
              exit={{ opacity: 0, transform: "translate(-10px, 0px)" }}
              transition={{ duration: 0.1 }}
              className="m-0 p-0 w-full"
            >
              {filteredSlips.map(
                (
                  slip: {
                    name: string;
                    songs: { title: string; id: string }[];
                  },
                  index: number,
                ) => (
                  <motion.div
                    onMouseEnter={() => setHoveringThing(index)}
                    onMouseLeave={() => setHoveringThing(null)}
                    layout
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1, transformOrigin: "top" }}
                    transition={{ duration: 0.1 }}
                    style={{
                      fontFamily: "IBM Plex Sans",
                    }}
                    key={slip.name}
                    className="grid grid-cols-[2em_auto_auto] grid-rows-[2em] w-full no-scrollbar items-center text-white border-b-1 border-[rgba(255,255,255,0.1)] text-[0.8em] hover:bg-[rgba(255,255,255,0.05)] cursor-pointer"
                  >
                    <CheckMark
                      checked={slip.songs.some(
                        (song) =>
                          song.id ===
                          appContext.loadedCard.songs[appContext.currentTrack]
                            ?.id,
                      )}
                      onCheckFn={() => {
                        const currentSong =
                          appContext.loadedCard.songs[appContext.currentTrack];
                        const isAlreadyInSlip = slip.songs.some(
                          (song) => song.id === currentSong?.id,
                        );

                        if (isAlreadyInSlip) {
                          deleteSong(currentSong, index);
                        } else {
                          addSong(currentSong, index);
                        }
                      }}
                    />
                    <div
                      onClick={() => {
                        setPreviewPageOpts(() => ({
                          show: true,
                          index: index,
                        }));
                      }}
                      className="flex justify-start items-center h-full my-2"
                    >
                      <div className="whitespace-nowrap overflow-hidden overflow-ellipsis w-53">
                        {slip.name}
                      </div>
                    </div>
                    <motion.div
                      key={slip.name + "list"}
                      className="flex justify-between items-center gap-1 h-full w-[3em]"
                    >
                      <p
                        style={{ fontFamily: "IBM Plex Sans" }}
                        className="text-[rgba(255,255,255,0.5)] w-[1em] border-l-1 border-[rgba(255,255,255,0.1)] h-full pl-5 flex justify-center items-center"
                      >
                        {slip.songs.length}
                      </p>
                      {!(hoveringThing === index) ? (
                        <ChevronRight className="w-[1em] transition-all duration-200 text-[rgba(255,255,255,0.3)] flex justify-center items-center" />
                      ) : (
                        <div className="w-[1em]">
                          <Trash2
                            size={20}
                            className="transition-all text-[#595E5F] duration-300 hover:scale-130 hover:text-red-400 active:scale-100 h-full aspect-square mr-3 flex justify-center items-center"
                            onClick={() => {
                              deleteSlip(index);
                            }}
                          />
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                ),
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {!previewPageOpts.show && (
          <motion.div
            initial={{ height: "0em" }}
            animate={{ height: "3em" }}
            exit={{ height: "0em", opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: "Instrument Serif" }}
            className="w-full text-white rounded-[0.5em] flex py-2 h-[3.75em]"
          >
            <input
              className="h-full w-full pl-3 pt-3"
              placeholder="Search or Add a new slip"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <AnimatePresence>
              {searchQuery && !previewPageOpts.show && (
                <motion.button
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "2.5em" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, type: "spring", bounce: 0.2 }}
                  className="bg-[rgba(255,255,255,0.5)] flex justify-center items-center text-black backdrop-blur-[10em] h-[calc(100%_+_0.5rem)] rounded-[0.5em] border-1 border-[rgba(255,255,255,0.1)]"
                  onClick={handleAddSlip}
                >
                  <Plus size={30} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default SlipPopUp;
