import { LoadedCard } from "@/services/ContextService";
import { useCallback, useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
export const FileDropPlate = ({
  style,
  pulled,
  setPulled,
}: {
  style?: string;
  pulled: any;
  setPulled: any;
}) => {
  const { appContext, setAppContext }: any = useContext(LoadedCard);

  const onDrop = useCallback((receivedCard: File[]) => {
    if (receivedCard.length > 1) return;
    receivedCard.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const text: string = String(reader.result);
        const parsedText: typeof appContext.loadedCard = JSON.parse(text);
        setAppContext((prev: typeof appContext) => ({
          ...prev,
          currentTrack: 0,
          ...parsedText,
        }));
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  useEffect(() => {
    if (isDragActive) {
      setPulled(true);
    } else {
      setPulled(false);
    }
  }, [isDragActive]);

  useEffect(() => {
    if (pulled) {
      open();
      setPulled(false);
    }
  }, [pulled, open]);

  return (
    <div
      {...getRootProps()}
      onClick={() => setPulled(!pulled)}
      style={{
        transform: `translateY(${pulled ? "-12em" : "-4em"})`, // 7.4
        transition: "transform 0.3s ease-in-out",
      }}
      className={
        "shadow-[inset_0_0_10px_10px_rgba(0,0,0,0.3)] flex flex-col justify-start items-center text-[rgba(255,255,255,0.3)]  bg-[#0f0f0f] p-[2em] pt-0 w-[30em] mr-[6em] h-[20em] rounded-[4em] " +
        (style ?? "")
      }
    >
      <div className="mb-[1em] h-[1em]">___</div>
      <input {...getInputProps()} />
      <div
        style={{ fontFamily: `"Instrument Serif", serif` }}
        className="flex flex-col gap-2 items-center border-[0.1em] border-dashed border-[rgba(255,255,255,0.1)] shadow-[inset_0_0_100px_10px_#000,_0_0_7px_10px_rgba(0,0,0,0.3)] w-full h-full rounded-[2em] pt-[2.5em] "
      >
        {isDragActive
          ? "Feed the card here!!!"
          : "Drop the cards here, or click to browse"}
        <button
          onClick={open}
          className="px-2 py-1 rounded-[10px] bg-gray-700 w-fit cursor-pointer"
        >
          Browse
        </button>
      </div>{" "}
    </div>
  );
};
