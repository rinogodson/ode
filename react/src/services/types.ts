interface cardContextType {
  properties: {
    title: string;
    color: string;
    blur: string;
    bgType: string;
    cdHero: string;
    char: string;
  };
  title: string;
  songs: { title: string; id: string }[];
}

export type { cardContextType };
