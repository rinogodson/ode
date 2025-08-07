import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AddSlipsSongs from "./AddSlipsSongs";

function AddSlips({ setCrafterContext }: { setCrafterContext: Function }) {
  const [showPreview, setShowPreview] = useState<{
    show: boolean;
    index: number;
  }>({ show: false, index: 0 });
  const [slips, _] = useState<any[]>(() => {
    return JSON.parse(localStorage.getItem("slips") || "[]");
  });

  const toggleShow = () => {
    setShowPreview((prev: typeof showPreview) => ({
      ...prev,
      show: !showPreview.show,
    }));
  };

  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1, transformOrigin: "bottom" }}
      exit={{ scaleY: 0, opacity: 0 }}
      transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
      className="flex justify-center items-center absolute w-60 h-60 bg-[rgba(0,0,0,0.4)] translate-y-[-9rem] rounded-[1.5em] border-1 border-[rgba(255,255,255,0.1)] backdrop-blur-[30px]"
    >
      <div className="flex flex-col w-[90%] h-[90%] bg-[rgba(255,255,255,0.01)] rounded-[0.8em] overflow-hidden border-1 border-[rgba(255,255,255,0.1)]">
        <AnimatePresence mode="wait">
          {showPreview.show ? (
            <motion.div
              key="preview"
              initial={{ x: "40px", opacity: 0 }}
              animate={{ x: "0", opacity: 1 }}
              exit={{ x: "40px", opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="h-full"
            >
              <AddSlipsSongs
                toggleShow={toggleShow}
                songs={slips[showPreview.index].songs}
                addSong={(song: { title: string; id: string }) => {
                  setCrafterContext((prev: any) => {
                    return {
                      ...prev,
                      inputCard: {
                        ...prev.inputCard,
                        songs: [...prev.inputCard.songs, song],
                      },
                    };
                  });
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ x: "-40px", opacity: 0 }}
              animate={{ x: "0", opacity: 1 }}
              exit={{ x: "-40px", opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="h-full overflow-scroll"
            >
              {slips.map((slip, index) => (
                <div
                  key={slip.name}
                  onClick={() => {
                    toggleShow();
                    setShowPreview((prev) => ({ ...prev, index }));
                  }}
                >
                  <SlipListItem name={slip.name} songs={slip.songs} />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const SlipListItem = ({ name, songs }: { name: string; songs: any[] }) => {
  return (
    <div className="w-full flex justify-between items-center text-[1.2em] py-2 pl-3 pr-1 border-b-1 border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)]">
      <div className="w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
        {name}
      </div>
      <div className="flex justify-end w-[3em] items-center text-[rgba(255,255,255,0.3)]">
        {songs.length}
        <ChevronRight />
      </div>
    </div>
  );
};

export default AddSlips;
