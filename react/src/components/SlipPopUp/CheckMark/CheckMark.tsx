import { Asterisk } from "lucide-react";

const CheckMark = ({
  onCheckFn,
  checked,
}: {
  onCheckFn: Function;
  checked: boolean;
}) => {
  return (
    <>
      <div
        style={{
          border: checked
            ? "solid 1px gray"
            : "solid 1px rgba(255,255,255,0.2)",
          background: checked ? "white" : "",
        }}
        className="hover:bg-[rgba(255,255,255,0.3)] w-6 aspect-square rounded-[6px] flex justify-center items-center transition-all duration-200"
        onClick={() => {
          onCheckFn();
        }}
      >
        <Asterisk
          className={checked ? "text-[rgba(0,0,0,1)]" : "text-[#404141]"}
        />
      </div>
    </>
  );
};

export default CheckMark;
