import { ShieldAlert } from "lucide-react";

const Error = ({ setIsError, error, setCurrentDiv, visitType }) => {
  const handleClick = () => {
    setIsError(null);
    setCurrentDiv(
      visitType === "appointment" ? 2 : visitType === "checkout" ? 4 : 3
    );
  };
  const btnStyle =
    "cursor-pointer px-16 py-3 shadow-lg bg-gap-bg text-[#1e2529] font-bold rounded-md flex justify-center items-center";
  return (
    <div className="flex flex-col items-center gap-8 mt-8">
      <ShieldAlert color="#dc2626" size={52} strokeWidth={2} />
      <p className="text-lg text-red-600">
        Error: <span className="text-red-300">{error?.message}</span>
      </p>
      <p className="text-[#939498] text-lg font-light">
        <span className=" text-red-600">Please Try Again!</span> If error
        persists, proceed to front-desk for help.
      </p>
      <button onClick={handleClick} className={`${btnStyle}`}>
        Try Again
      </button>
    </div>
  );
};

export default Error;
