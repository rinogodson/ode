import { Droplet, Laugh, Palette, Type } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ColorChangeOption({
  setCrafterContext,
  crafterContext,
}: {
  setCrafterContext: any;
  crafterContext: {
    link: string;
    title: string;
    inputCard: {
      properties: {
        bgType: string;
        color: string;
        blur: string;
        char: string;
        cdHero: string;
      };
      songs: any[];
    };
  };
}) {
  const [inputValue, setInputValue] = useState({
    color: "#3E3F76",
    blur: "1",
    char: "❤️",
  });

  const style = {
    pillStyle:
      "w-[10em] h-[3em] bg-black border-[1px_1px_2px_1px] border-[#262626] rounded-full flex items-center cursor-pointer justify-start mt-5 px-3.5",
  };

  useEffect(() => {
    console.log("Crafter Context Updated:", crafterContext);
  }, []);

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
                value={inputValue.color}
                onChange={(e) => {
                  setInputValue({ ...inputValue, color: e.target.value });
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
                style={{ backgroundColor: inputValue.color }}
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
              className="text-[#FFF] text-[1.2em] font-semibold flex items-center gap-3"
            >
              <p>Blur</p>
              <input
                value={inputValue.blur}
                onChange={(e) =>
                  setInputValue({ ...inputValue, blur: e.target.value })
                }
                type="number"
                className="aspect-square w-[1.8em] bg-[rgba(255,255,255,0.08)] rounded-[0.7em] border-[0.08em] border-[rgba(255,255,255,0.1)] text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
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
                value={inputValue.char}
                onChange={(e) =>
                  setInputValue({ ...inputValue, char: e.target.value })
                }
                type="text"
                maxLength={3}
                className="aspect-square w-[1.8em] bg-[rgba(255,255,255,0.08)] rounded-[0.7em] border-[0.08em] border-[rgba(255,255,255,0.1)] text-center"
              />
              <p>Char</p>
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
