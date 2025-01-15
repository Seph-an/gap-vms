import { ShieldAlert, LogIn } from "lucide-react";

const RightForm = ({ name, purpose, time, onComplete, setCurrentDiv }) => {
  const btnStyle =
    "cursor-pointer px-16 py-3 shadow-lg bg-gap-bg text-[#1e2529] font-medium gap-3 rounded-md flex justify-center items-center";
  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      <ShieldAlert color="#dc2626" size={52} strokeWidth={2} />
      <p className="text-white text-lg">
        Hey <span className="text-gap-bg font-medium">{name}</span> you have
        attempted to check in for your{" "}
        <span className="text-gap-bg font-medium">{purpose}</span> appointment
        slated for <span className="text-gap-bg font-medium">{time}</span> using
        the wrong form.
      </p>
      <p className="text-red-500 text-lg font-medium ">
        All scheduled{" "}
        <span className="text-gap-bg font-regular">{purpose}s</span> are
        appointments!
      </p>
      {/* text-[#939498] */}
      <span className="text-white opacity-80  text-lg ">
        Click the button below to Check in correctly in a few seconds.
      </span>
      <button
        onClick={() => {
          setCurrentDiv(2);
        }}
        className={`${btnStyle}`}
      >
        <span className="font-medium text-lg">Check in</span>
        <LogIn color="#1e2529" size={20} strokeWidth={2} />
      </button>
    </div>
  );
};

export default RightForm;
