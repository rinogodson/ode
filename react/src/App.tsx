import "./App.css";
import { useRef } from "react";
import Player from "./components/Player/Player";
import { useState } from "react";
import { FileDropPlate } from "./components/ui/FileDropPlate/FileDropPlate";
function App() {
  const yt_ref = useRef(null);
  const [timestamp, setTimestamp] = useState({
    current: 0,
    total: 0,
  });
  const [currentSong, _] = useState("fmgmJLE-MqI");

  return (
    <>
      <div className="flex justify-center items-end flex-col">
        <FileDropPlate style="absolute" />
        <div className="self-start ml-[6em] flex flex-col items-center">
          <div className="w-5 shadow-[inset_0_0_10px_0px_rgba(0,0,0,0.9)] rounded-full transform-[translate(0,_1em)] aspect-square bg-green-500"></div>
          <div className="w-4 h-12 bg-gradient-to-r from-[#0e0e0e] via-[#1e1e1e] to-[#0e0e0e] "></div>
          <div className="w-6 h-15 bg-gradient-to-r from-[#0e0e0e] via-[#1e1e1e] to-[#0e0e0e] "></div>
          <div className="w-8 h-10 bg-gradient-to-r from-[#0e0e0e] via-[#1e1e1e] to-[#0e0e0e] "></div>
        </div>
        <Player
          timestamp={timestamp}
          setTimestamp={setTimestamp}
          next_fn={() => { }}
          prev_fn={() => { }}
          currentSong={currentSong}
          yt_ref={yt_ref}
        />
      </div>
    </>
  );
}

export default App;
