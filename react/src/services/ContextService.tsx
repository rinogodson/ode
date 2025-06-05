import { useState, createContext } from "react";

export const LoadedCard = createContext({
  appContext: {},
  setAppContext: (p0: (prev: {}) => { currentTrack: number; }) => {},
});
function ContextProvider({ children }: { children: React.ReactNode }) {
  const [appContext, setAppContext] = useState({
    playerState: "CUED",
    currentTrack: 0,
    loadedCard: {
      title: "Ride Music Going to moon",
      songs: [
        {
          title: "Line Without a Hook",
          id: "XSqx8Ibkzrk",
        },
        {
          title: "Cruise",
          id: "fmgmJLE-MqI",
        },
        {
          title: "Tidal Wave",
          id: "SPTX--TNTis",
        },
      ],
    },
  });

  return (
    <LoadedCard.Provider value={{ appContext, setAppContext }}>
      {children}
    </LoadedCard.Provider>
  );
}

export default ContextProvider;
