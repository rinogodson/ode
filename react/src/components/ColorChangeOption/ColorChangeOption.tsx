import {
  ChevronDown,
  ChevronUp,
  Droplet,
  Laugh,
  Palette,
  Type,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ColorChangeOption({
  setCrafterContext,
  crafterContext,
}: {
  setCrafterContext: any;
  crafterContext: any;
}) {
  const style = {
    pillStyle:
      "w-[10em] h-[3em] bg-black border-[1px_1px_2px_1px] border-[#262626] rounded-full flex items-center cursor-pointer justify-start mt-5 px-3.5",
  };

  return (
    <div className="flex flex-row self-start relative justify-self-start top-0 w-full justify-center gap-5">
      <div className={style.pillStyle}>
        <AnimatePresence mode="wait">
          {crafterContext.inputCard.properties.bgType === "color" ? (
            <motion.div
              key="color"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="text-[#FFF] text-[1.2em] font-semibold flex items-center gap-3 w-full"
            >
              <input
                value={crafterContext.inputCard.properties.color}
                onChange={(e) => {
                  setCrafterContext((prev: any) => {
                    return {
                      ...prev,
                      inputCard: {
                        ...prev.inputCard,
                        properties: {
                          ...prev.inputCard.properties,
                          color: e.target.value,
                        },
                      },
                    };
                  });
                }}
                type="color"
                style={{
                  backgroundColor: crafterContext.inputCard.properties.color,
                }}
                className="aspect-square w-[1.8em] rounded-[0.7em] border-[0.1em] border-[rgba(255,255,255,0.1)] text-center cursor-pointer"
              />
              <p>Color</p>
            </motion.div>
          ) : (
            <motion.div
              key="palette"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Palette
                className="hover:scale-125 transition-all duration-200 cursor-pointer active:scale-95"
                onClick={() => {
                  setCrafterContext((prev: any) => {
                    return {
                      ...prev,
                      inputCard: {
                        ...prev.inputCard,
                        properties: {
                          ...prev.inputCard.properties,
                          bgType: "color",
                        },
                      },
                    };
                  });
                }}
              />
            </motion.div>
          )}
          <div className="w-[0.1em] h-[80%] bg-[rgba(255,255,255,0.1)] [margin-inline:5px]"></div>
          {crafterContext.inputCard.properties.bgType === "blur" ? (
            <motion.div
              key="blur"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="text-[#FFF] text-[1.2em] font-semibold flex items-center"
            >
              <p className="mr-2">Blur</p>
              <input
                value={crafterContext.inputCard.properties.blur}
                onChange={(e) => {
                  setCrafterContext((prev: any) => {
                    return {
                      ...prev,
                      inputCard: {
                        ...prev.inputCard,
                        properties: {
                          ...prev.inputCard.properties,
                          blur: e.target.value,
                        },
                      },
                    };
                  });
                }}
                readOnly
                type="text"
                className="mr-1 aspect-square w-[1.8em] bg-[rgba(255,255,255,0.08)] rounded-[0.7em] border-[0.08em] border-[rgba(255,255,255,0.1)] text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <div className="rounded-full h-fit bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.1)] flex flex-col items-center justify-center">
                <button
                  onClick={() => {
                    setCrafterContext((prev: any) => {
                      const newBlur = Math.min(
                        crafterContext.inputCard.songs.length,
                        parseInt(prev.inputCard.properties.blur) + 1,
                      );
                      return {
                        ...prev,
                        inputCard: {
                          ...prev.inputCard,
                          properties: {
                            ...prev.inputCard.properties,
                            blur: newBlur,
                          },
                        },
                      };
                    });
                  }}
                  className="p-0 transition-all duration-200 hover:scale-130 hover:bg-black hover:border-1 rounded-full active:translate-y-[-0.3em]"
                >
                  <ChevronUp size={20} />
                </button>
                <button
                  onClick={() => {
                    setCrafterContext((prev: any) => {
                      const newBlur = Math.max(
                        1,
                        parseInt(prev.inputCard.properties.blur) - 1,
                      );
                      return {
                        ...prev,
                        inputCard: {
                          ...prev.inputCard,
                          properties: {
                            ...prev.inputCard.properties,
                            blur: newBlur,
                          },
                        },
                      };
                    });
                  }}
                  className="p-0 transition-all duration-200 hover:scale-130 hover:bg-black hover:border-1 rounded-full active:translate-y-[0.3em]"
                >
                  <ChevronDown size={20} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="droplet"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Droplet
                className="hover:scale-125 transition-all duration-200 cursor-pointer active:scale-95"
                onClick={() => {
                  setCrafterContext((prev: any) => {
                    if (prev.inputCard.songs.length === 0) {
                      return {
                        ...prev,
                        inputCard: {
                          ...prev.inputCard,
                          properties: {
                            ...prev.inputCard.properties,
                            bgType: "color",
                          },
                        },
                      };
                    }
                    return {
                      ...prev,
                      inputCard: {
                        ...prev.inputCard,
                        properties: {
                          ...prev.inputCard.properties,
                          bgType: "blur",
                        },
                      },
                    };
                  });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={style.pillStyle}>
        <AnimatePresence mode="wait">
          {crafterContext.inputCard.properties.cdHero === "char" ? (
            <motion.div
              key="char"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="text-[#FFF] text-[1.2em] font-semibold flex items-center gap-3"
            >
              <input
                value={crafterContext.inputCard.properties.char}
                onChange={(e) =>
                  setCrafterContext((prev: any) => {
                    return {
                      ...prev,
                      inputCard: {
                        ...prev.inputCard,
                        properties: {
                          ...prev.inputCard.properties,
                          char: e.target.value,
                        },
                      },
                    };
                  })
                }
                type="text"
                maxLength={6}
                className=" w-[5em] bg-[rgba(255,255,255,0.08)] rounded-[0.7em] border-[0.08em] border-[rgba(255,255,255,0.1)] text-center"
              />
            </motion.div>
          ) : (
            <motion.div
              key="laughIcon"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Laugh
                className="hover:scale-125 transition-all duration-200 cursor-pointer active:scale-95"
                onClick={() => {
                  setCrafterContext((prev: any) => {
                    return {
                      ...prev,
                      inputCard: {
                        ...prev.inputCard,
                        properties: {
                          ...prev.inputCard.properties,
                          cdHero: "char",
                        },
                      },
                    };
                  });
                }}
              />
            </motion.div>
          )}
          <div className="w-[0.1em] h-[80%] bg-[rgba(255,255,255,0.1)] [margin-inline:5px]"></div>
          {crafterContext.inputCard.properties.cdHero === "title" ? (
            <motion.div
              key="title"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className=" text-[#FFF] text-[1.2em] font-semibold flex items-center gap-3 w-full justify-center"
            >
              <p>Title</p>
            </motion.div>
          ) : (
            <motion.div
              key="charIcon"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Type
                className="hover:scale-125 transition-all duration-200 cursor-pointer active:scale-95"
                onClick={() => {
                  setCrafterContext((prev: any) => {
                    return {
                      ...prev,
                      inputCard: {
                        ...prev.inputCard,
                        properties: {
                          ...prev.inputCard.properties,
                          cdHero: "title",
                        },
                      },
                    };
                  });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ColorChangeOption;
