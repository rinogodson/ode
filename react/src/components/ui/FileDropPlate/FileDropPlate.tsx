import React from "react";
export const FileDropPlate = ({ style }: { style?: string }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      style={{
        transform: `translateY(${open ? "-12em" : "-4em"})`, // 7.4
        transition: "transform 0.3s ease-in-out",
      }}
      className={
        "shadow-[inset_0_0_10px_10px_rgba(0,0,0,0.3)] flex flex-col justify-start items-center text-[rgba(255,255,255,0.3)]  bg-[#0f0f0f] p-[2em] pt-0 w-[30em] mr-[6em] h-[20em] rounded-[4em] " +
        (style ?? "")
      }
    >
      <div className="mb-[1em] h-[1em]">___</div>
      <div style={{fontFamily: `"Instrument Serif", serif`}} className="border-[0.1em] border-dashed border-[rgba(255,255,255,0.1)] shadow-[inset_0_0_100px_10px_#000,_0_0_7px_10px_rgba(0,0,0,0.3)] w-full h-full rounded-[2em] pt-[4em]">
        Drop The Card Here...
      </div>{" "}
    </button>
  );
};
