import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import SlipPreview from "./SlipPreview/SlipPreview";
function SlipPopUp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [slips, setSlips] = useState<
    { name: string; songs: { title: string; id: string }[] }[]
  >(() => {
    return JSON.parse(localStorage.getItem("slips") || "[]");
  });

  const [hoveringThing, setHoveringThing] = useState<number | null>(null);

  const [previewPageOpts, setPreviewPageOpts] = useState<{
    show: boolean;
    index: number;
  }>({ show: false, index: 0 });

  const deleteSlip = (index: number) => {
    const updated = [...slips];
    updated.splice(index, 1);
    setSlips(updated);
    localStorage.setItem("slips", JSON.stringify(updated));
  };

  const handleAddSlip = () => {
    if (slips.some((slip) => slip.name === searchQuery)) {
      alert("Slip with this name already exists");
      return;
    }
    const newSlip = { name: searchQuery, songs: [] };
    const updated = [...slips, newSlip];
    setSlips(updated);
    localStorage.setItem("slips", JSON.stringify(updated));
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
      className="w-90 h-90 gap-2 p-3 border-1 border-[rgba(255,255,255,0.1)] bg-[rgba(28,28,28,0.5)] backdrop-blur-2xl rounded-[1em] shadow-lg flex flex-col items-center justify-center absolute z-1000"
    >
      <div className="flex flex-col w-full h-full items-center pb-10 justify-start overflow-y-scroll bg-[rgba(0,0,0,0.2)] rounded-[0.5em]">
        <AnimatePresence mode="wait">
          {previewPageOpts.show ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <SlipPreview
                goBackFn={() =>
                  setPreviewPageOpts((prev) => ({ ...prev, show: false }))
                }
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
              {slips.map((slip: { name: string }, index: number) => (
                <motion.div
                  layout
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1, transformOrigin: "top" }}
                  transition={{ duration: 0.1 }}
                  style={{
                    fontFamily: "IBM Plex Sans",
                  }}
                  key={slip.name}
                  className="flex justify-between no-scrollbar items-center text-white border-b-1 border-[rgba(255,255,255,0.1)] w-full text-[0.8em] hover:bg-[rgba(255,255,255,0.07)] cursor-pointer"
                >
                  <div className="flex h-full justify-center items-center">
                    <div className="flex justify-center items-center h-full w-10">
                      <input
                        type="checkbox"
                        className="mr-1 flex justify-center items-center"
                      />
                    </div>
                    <div
                      onMouseEnter={() => setHoveringThing(index)}
                      onMouseLeave={() => setHoveringThing(null)}
                      onClick={() => {
                        setPreviewPageOpts((prev) => ({ ...prev, show: true }));
                      }}
                      className="flex justify-center items-center h-full my-2"
                    >
                      <div className="whitespace-nowrap overflow-hidden overflow-ellipsis w-58">
                        {slip.name}
                      </div>
                      <ChevronRight
                        className="transition-all duration-200 text-[rgba(255,255,255,0.3)]"
                        style={{
                          transform:
                            hoveringThing === index
                              ? "translate(10px, 0px)"
                              : "translate(0,0)",
                        }}
                      />
                    </div>
                  </div>
                  <Trash2
                    size={20}
                    className="transition-all duration-300 hover:scale-130 hover:text-red-200 active:scale-100 h-full aspect-square mr-3"
                    onClick={() => {
                      deleteSlip(index);
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        style={{ fontFamily: "Instrument Serif" }}
        className="w-full text-white h-[3em] rounded-[0.5em] flex"
      >
        <input
          className="h-full w-full pl-3"
          placeholder="Search or Add a new slip"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "3em" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2, type: "spring", bounce: 0.2 }}
              className="bg-[rgba(255,255,255,0.5)] flex justify-center items-center text-black backdrop-blur-[10em] h-full rounded-[0.5em] border-1 border-[rgba(255,255,255,0.1)]"
              onClick={handleAddSlip}
            >
              <Plus size={30} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default SlipPopUp;
