import { ChevronLeftIcon, CirclePlus } from "lucide-react";

function AddSlipsSongs({
  toggleShow,
  songs,
  addSong,
}: {
  toggleShow: any;
  songs: any[];
  addSong: Function;
}) {
  return (
    <>
      <button onClick={toggleShow} className="my-1 w-full flex justify-start">
        <ChevronLeftIcon />
        Go Back
      </button>
      <ul className="bg-[rgba(255,255,255,0.03)] pb-6 h-full overflow-scroll rounded-t-xl">
        {songs.map((song) => {
          return (
            <li className="h-[2.5em] border-b-1 border-[rgba(255,255,255,0.3)] px-2 flex justify-between items-center hover:bg-[rgba(255,255,255,0.04)]">
              <p className="whitespace-nowrap overflow-hidden overflow-ellipsis w-[80%]">
                {song.title}
              </p>
              <CirclePlus
                onClick={() => {
                  addSong(song);
                }}
                className="hover:scale-110 active:scale-95 transition-all duration-75"
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default AddSlipsSongs;
