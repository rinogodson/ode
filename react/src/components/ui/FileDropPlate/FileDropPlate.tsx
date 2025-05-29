import React from "react";
export const FileDropPlate = ({ style }: { style?: string }) => {
  const [open, setOpen] = React.useState(true);
  return (
    <button
      onClick={() => setOpen(!open)}
      style={{
        transform: `translateY(${open ? "-12em" : "-4em"})`, // 7.4
        transition: "transform 0.3s ease-in-out",
      }}
      className={
        "flex justify-center items-start pt-16 text-[rgba(255,255,255,0.3)] shadow-[0_0_0px_1px_#1e1e1e,_inset_0_0_0px_1px_#1d1d1d,_inset_0_0_100px_10px_#000] bg-[#0f0f0f] border-[2em] border-[#0e0e0e] w-[30em] mr-[5em] h-[20em] rounded-[4em] " +
        (style ?? "")
      }
    >Drop The Card Here... </button>
  );
};
