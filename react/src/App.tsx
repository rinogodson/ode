import "./App.css";
import { useRef } from "react";
import Player from "./components/Player/Player";
import { useState } from "react";
import { FileDropPlate } from "./components/ui/FileDropPlate/FileDropPlate";
import { createContext } from "react";
import Nav from "./components/Nav/Nav";

const loadedCard = createContext();

function App() {
  const yt_ref = useRef(null);
  const [timestamp, setTimestamp] = useState({
    current: 0,
    total: 0,
  });
  const [currentSong, _] = useState("8JW6qzPCkE8");

  return (
    <>
      <ContextProvider>
        <Nav/>
        <div className="flex justify-center items-end flex-col">
          <FileDropPlate style="absolute" />
          <div className="self-start ml-[6em] flex flex-col items-center">
            <div className="w-5 shadow-[0_0_20px_3px_green] rounded-full transform-[translate(0,_1em)] aspect-square bg-green-500"></div>
            <div className="transform-[translate(0,10px)] z-[-2] w-4 h-12 bg-gradient-to-r from-[#0e0e0e] via-[#1e1e1e] to-[#0e0e0e] rounded-t-[10px] shadow-[inset_0_5px_10px_0px_rgba(0,0,0,0.5)]"></div>
            <div className="transform-[translate(0,5px)] z-[-1] w-6 h-15 bg-gradient-to-r from-[#0e0e0e] via-[#1e1e1e] rounded-t-[10px] to-[#0e0e0e] shadow-[inset_0_5px_10px_0px_rgba(0,0,0,0.5)]"></div>
            <div className="w-8 h-10 bg-gradient-to-r from-[#0e0e0e] via-[#1e1e1e] rounded-t-[10px] to-[#0e0e0e] shadow-[inset_0_5px_10px_0px_rgba(0,0,0,0.5)]"></div>
          </div>
          <Player
            timestamp={timestamp}
            setTimestamp={setTimestamp}
            next_fn={() => {}}
            prev_fn={() => {}}
            currentSong={currentSong}
            yt_ref={yt_ref}
          />
        </div>
      </ContextProvider>
    </>
  );
}

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [appContext, setAppContext] = useState({
    playerState: "NOTLOADED",
    currentTrack: "fmgmJLE-MqI",
    loadedCard: {
      title: "Ride Music",  
      songs: [
        {
          title: "Track 1",
          id: "fmgmJLE-MqI",
        },
        {
          title: "Track 2",
          id: "fmgmJLE-MqI",
        },
        {
          title: "Track 3",
          id: "fmgmJLE-MqI",
        },
      ],
    },
  });
  return (
    <loadedCard.Provider value={{ appContext, setAppContext }}>
      {children}
    </loadedCard.Provider>
  );
}
export default App;
