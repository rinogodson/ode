import "./App.css";
import { useRef } from "react";
import Player from "./components/Player/Player";
import { useState } from "react";
function App() {
  const yt_ref = useRef(null);
  const [timestamp, setTimestamp] = useState({
    current: 0,
    total: 0,
  });
  const [currentSong, setCurrentSong] = useState("fmgmJLE-MqI");
  return (
    <>
      <Player
        timestamp={timestamp}
        setTimestamp={setTimestamp}
        next_fn={() => {}}
        prev_fn={() => {}}
        currentSong={currentSong}
        yt_ref={yt_ref}
      />
    </>
  );
}

export default App;
