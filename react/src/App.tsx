import "./App.css";
import Player from "./components/Player/Player";
import { useState } from "react";
function App() {
  const [volume, setVolume] = useState(0)
  const [currentSong, setCurrentSong] = useState("9SqWBe5aK5s")
  return <>
    <Player setVolume={setVolume} playpause_fn={() => {}} next_fn={() => {}} prev_fn={() => {}} volume={volume} currentSong={currentSong}/>
  </>;
}

export default App;
