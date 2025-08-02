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
import { pauseFn } from "./services/serviceProvider";

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

  const { appContext }: any = useContext(LoadedCard);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.outerWidth < 600);
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

  if (isMobile) {
    return (
      <>
        <LoadingScreen>
          <p>USE A DESKTOP NO PHONES ALLOWED!</p>

          <button
            onClick={() => {
              window.open("https://youtu.be/pAlP9_FqU5M", "_blank");
            }}
            className="absolute z-2000000 top-[2em] right-[2em] border-1 border-[rgba(255,255,255,0.5)] text-[#FFF] px-4 py-2 text-[1em] rounded-[10px] hover:scale-[1.2] active:scale-[0.95] transition-[all_300ms]"
          >
            Watch The DEMO Instead
          </button>
        </LoadingScreen>
      </>
    );
  }
  const onDrop = useCallback((receivedCard: File[]) => {
    if (receivedCard.length > 1) return;
    receivedCard.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const text: string = String(reader.result);
        const parsedText: { loadedCard: cardContextType } = JSON.parse(text);
        console.log(parsedText.loadedCard);

        setInitVal(parsedText.loadedCard);
      };
      reader.readAsText(file);

      setShowCrafter(true);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: false,
  });

  return (
    <>
      {showCrafter && (
        <CardCrafter setShowCrafter={setShowCrafter} initVal={initVal} />
      )}
      <div className="select-none">
        <Nav />
        <div className="absolute bottom-[2em] left-[2em] gap-[2em] flex flex-row items-start">
          <button
            onClick={() => {
              setInitVal(null);
              setShowCrafter(true);
            }}
            className=" bg-[#f0f0f0] text-[#010101] px-4 py-2 text-[1.2em] rounded-[10px] hover:scale-[1.2] active:scale-[0.95] transition-[all_300ms]"
          >
            Create Card
          </button>
          <button
            {...getRootProps()}
            className="bg-[#f0f0f0] text-[#010101] px-4 py-2 text-[1.2em] rounded-[10px] hover:scale-[1.2] active:scale-[0.95] transition-[all_300ms]"
          >
            Edit Card
            <input {...getInputProps()} />
          </button>
        </div>
        <button
          onClick={() => {
            window.open("https://youtu.be/pAlP9_FqU5M", "_blank");
          }}
          className="absolute z-2000000 top-[2em] right-[2em] border-1 border-[rgba(255,255,255,0.5)] text-[#FFF] px-4 py-2 text-[1em] rounded-[10px] hover:scale-[1.2] active:scale-[0.95] transition-[all_300ms]"
        >
          Watch The DEMO Instead
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
          <FileDropPlate style="absolute cursor-grab" />
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
