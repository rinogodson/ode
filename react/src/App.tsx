import "./App.css";
import { useCallback, useContext, useEffect, useRef } from "react";
import Player from "./components/Player/Player";
import { useState } from "react";
import { FileDropPlate } from "./components/ui/FileDropPlate/FileDropPlate";
import Nav from "./components/Nav/Nav";
import ContextProvider, { LoadedCard } from "./services/ContextService";
import { CardPreview } from "./components/CardPreview/CardPreview";
import CardCrafter from "./components/CardPreview/CardCrafter/CardCrafter";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import type { cardContextType } from "./services/types";
import { useDropzone } from "react-dropzone";
import { pauseFn, playFn, seekFn } from "./services/serviceProvider";
import { AnimatePresence } from "framer-motion";
import { Pencil, Plus } from "lucide-react";
import SlipPopUp from "./components/SlipPopUp/SlipPopUp";

function App() {
  return (
    <ContextProvider>
      <AppWithContext />
    </ContextProvider>
  );
}

function AppWithContext() {
  const yt_ref = useRef(null);
  const [timestamp, setTimestamp] = useState({
    current: 0,
    total: 0,
  });

  const [showCrafter, setShowCrafter] = useState(false);
  const [initVal, setInitVal] = useState<cardContextType | null>(null);

  const { appContext, setAppContext }: any = useContext(LoadedCard);
  const [pulled, setPulled] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (showCrafter) {
      pauseFn();
    }
  }, [showCrafter]);

  const onDrop = useCallback(async (receivedCard: File[]) => {
    if (receivedCard.length > 1) return;
    const file = receivedCard[0];
    const readFileAsText = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onabort = () => reject(new Error("File reading was aborted"));
        reader.onerror = () => reject(new Error("File reading failed"));
        reader.onload = () => resolve(String(reader.result));
        reader.readAsText(file);
      });
    };

    try {
      const text = await readFileAsText(file);
      const parsedText: { loadedCard: cardContextType } = JSON.parse(text);
      console.log(parsedText.loadedCard);
      setInitVal(parsedText.loadedCard);
      setShowCrafter(true);
    } catch (err) {
      window.alert("Please upload a valid card file.");
      console.error("Error reading file:", err);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: false,
  });

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!showCrafter && !SlipPopUp) {
        if (event.key === " ") {
          event.preventDefault();
          if (appContext.playerState === "PLAYING") {
            pauseFn();
          }
          if (
            appContext.playerState === "PAUSED" ||
            appContext.playerState === "UNSTARTED"
          ) {
            playFn();
          }
        }
        if (event.key === "l") {
          setAppContext((prev: any) => {
            const maxIndex = prev.loadedCard.songs.length - 1;
            const newIndex = Math.min(prev.currentTrack + 1, maxIndex);
            return {
              ...prev,
              currentTrack: newIndex,
            };
          });
        }
        if (event.key === "h") {
          setAppContext((prev: any) => {
            const maxIndex = prev.loadedCard.songs.length - 1;
            const newIndex = Math.min(prev.currentTrack - 1, maxIndex);
            return {
              ...prev,
              currentTrack: newIndex < 0 ? 0 : newIndex,
            };
          });
        }
        if (event.key === "j") {
          seekFn(timestamp.current - 10);
        }
        if (event.key === "k") {
          seekFn(timestamp.current + 10);
        }
        if (event.key === "o") {
          setPulled((prev) => !prev);
        }
        if (event.key === "c") {
          setInitVal(null);
          setShowCrafter(true);
        }
      }
      if (event.key === "Escape") {
        setShowCrafter(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    appContext.playerState,
    pauseFn,
    playFn,
    seekFn,
    showCrafter,
    setAppContext,
  ]);

  if (isMobile) {
    return (
      <>
        <LoadingScreen>
          <p>USE A DESKTOP NO PHONES ALLOWED!</p>

          <button
            onClick={() => {
              window.open("https://youtu.be/trA2f3YDoRk", "_blank");
            }}
            className="absolute z-2000000 top-[2em] right-[2em] border-1 border-[rgba(255,255,255,0.5)] text-[#FFF] px-4 py-2 text-[1em] rounded-[10px] hover:scale-[1.2] active:scale-[0.95] transition-[all_300ms]"
          >
            Watch The DEMO Instead
          </button>
        </LoadingScreen>
      </>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showCrafter && (
          <CardCrafter setShowCrafter={setShowCrafter} initVal={initVal} />
        )}
      </AnimatePresence>
      <div className="select-none">
        <Nav />
        <div className="absolute bottom-[2em] left-[2em] gap-[2em] flex flex-row items-start">
          <button
            onClick={() => {
              setInitVal(null);
              setShowCrafter(true);
            }}
            className="flex justify-center items-center gap-2 px-3 pr-4 cursor-pointer bg-linear-to-b from-[white] to-[rgba(200,200,200)] border-[1px] border-[rgba(0,0,0,0.4)] text-[#010101] py-2 text-[1.2em] rounded-[10px] hover:scale-[1.2] active:scale-[0.95] transition-[all_300ms]"
          >
            <Plus />
            Create
          </button>
          <button
            {...getRootProps()}
            className="flex justify-center items-center gap-3 px-4 pr-4 cursor-pointer bg-linear-to-b from-[white] to-[rgba(200,200,200)] border-[1px] border-[rgba(0,0,0,0.4)]  text-[#010101] py-2 text-[1.2em] rounded-[10px] hover:scale-[1.2] active:scale-[0.95] transition-[all_300ms]"
          >
            <Pencil size={20} />
            Edit
            <input {...getInputProps()} />
          </button>
        </div>
        <button
          onClick={() => {
            window.open("https://youtu.be/trA2f3YDoRk", "_blank");
          }}
          className="absolute z-2000000 top-[2em] right-[2em] border-1 border-[rgba(255,255,255,1)] text-[#FFF] px-4 py-2 text-[1em] rounded-[10px] hover:scale-[1.2] active:scale-[0.95] transition-[all_300ms]"
        >
          DEMO / Don't know how to use it? click here!
        </button>
        <CardPreview />
        <div className="flex justify-center items-end flex-col">
          {appContext.playerState === "CUED" && (
            <LoadingScreen>
              <p>
                Loading... Pls wait... <br /> (maybe it's your internet speed,
                bruh...) <br /> TIP: Just reload 5-6 times...
              </p>
            </LoadingScreen>
          )}
          <FileDropPlate
            style="absolute cursor-grab"
            pulled={pulled}
            setPulled={setPulled}
          />
          <div className="self-start ml-[6em] flex flex-col items-center">
            <div
              style={{
                background:
                  appContext.playerState === "BUFFERING"
                    ? "orange"
                    : appContext.playerState === "PLAYING"
                      ? "#01E460"
                      : appContext.playerState === "CUED"
                        ? "#ff0000"
                        : "#2b2b2b",
                boxShadow: `0 0 40px 3px ${appContext.playerState === "BUFFERING" ? "orange" : appContext.playerState === "PLAYING" ? "#40FF32" : appContext.playerState === "CUED" ? "red" : "rgba(0,0,0,0)"}`,
                transition: "all 100ms ease",
              }}
              className="w-5  rounded-full transform-[translate(0,_1em)] aspect-square"
            ></div>
            <div className="transform-[translate(0,10px)] z-[-2] w-4 h-12 bg-gradient-to-r from-[#0e0e0e] via-[#1e1e1e] to-[#0e0e0e] rounded-t-[10px] shadow-[inset_0_5px_10px_0px_rgba(0,0,0,0.5)]"></div>
            {/* shadow-[0_0_20px_3px_green] */}
            <div className="transform-[translate(0,5px)] z-[-1] w-6 h-15 bg-gradient-to-r from-[#0e0e0e] via-[#1e1e1e] rounded-t-[10px] to-[#0e0e0e] shadow-[inset_0_5px_10px_0px_rgba(0,0,0,0.5)]"></div>
            <div className="w-8 h-10 bg-gradient-to-r from-[#0e0e0e] via-[#1e1e1e] rounded-t-[10px] to-[#0e0e0e] shadow-[inset_0_5px_10px_0px_rgba(0,0,0,0.5)]"></div>
          </div>
          <Player
            timestamp={timestamp}
            setTimestamp={setTimestamp}
            yt_ref={yt_ref}
          />
        </div>
      </div>
    </>
  );
}

export default App;
