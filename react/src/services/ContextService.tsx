import { useState, createContext } from "react";

// @ts-ignore
export const LoadedCard = createContext({
  appContext: {},
  setAppContext: {},
});

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [appContext, setAppContext]: any = useState({
    playerState: "CUED",
    currentTrack: 0,
    loadedCard: {
      title: "Default Card",
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
