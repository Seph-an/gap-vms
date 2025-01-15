import formatContact from "@utils/format_contact";

const NoRecord = ({
  setIsSuccess,
  isSuccess,
  setCurrentDiv,
  Phone,
  proceed,
}) => {
  const handleOnClick1 = () => {
    setIsSuccess(null);
    setCurrentDiv(proceed === "in" ? 2 : 4);
  };
  const handleOnClick2 = () => setCurrentDiv(1);
  const btnStyle =
    "cursor-pointer px-16 py-3 shadow-lg bg-gap-bg text-[#1e2529] rounded-md flex justify-center items-center";
  return (
    <div className="flex flex-col gap-8 mt-5">
      <p className="text-red-600 text-lg">OOPS!</p>
      <p className="text-red-300 text-lg font-light">
        No matching records found matching the contact{" "}
        <span className="underline font-medium text-red-600">
          {formatContact(Phone)}
        </span>{" "}
        entered!
      </p>

      <p className="text-[#939498] text-lg font-light">
        If error persists proceed to front-desk for help.
      </p>

      <div className="flex justify-center gap-10 ">
        <div className="flex flex-col items-center gap-8 ">
          <p className="text-red-300 text-lg font-light max-w-[250px]">
            To try a <span className="text-red-600">different number</span>{" "}
            click here 👇:
          </p>
          <button onClick={handleOnClick1} className={`${btnStyle}`}>
            {`Check ${proceed}`}
          </button>
        </div>

        <div className="flex flex-col items-center gap-8">
          <p className="text-red-300 text-lg font-light max-w-[260px]">
            To <span className="text-red-600">proceed to front-desk,</span>{" "}
            click here 👇 <span className="text-red-600">then</span> proceed :
          </p>
          <button onClick={handleOnClick2} className={`${btnStyle}`}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoRecord;
