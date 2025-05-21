import "./App.css";
import Player from "./components/Player/Player";
import { useState } from "react";
function App() {
  const [volume, setVolume] = useState(0)
  return <>
    <Player setVolume={setVolume} playpause_fn={() => {}} next_fn={() => {}} prev_fn={() => {}} volume={volume}/>
  </>;
}

export default App;
