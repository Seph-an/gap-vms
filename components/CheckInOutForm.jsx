import Button from "./Button";
import BackButton from "./BackButton";

const CheckInOutForm = ({
  instruction,
  label,
  icon,
  setCurrentDiv,
  phoneNumber,
  handleSubmit,
  handleInputChange,
  isButtonDisabled,
}) => {
  return (
    <>
      <BackButton
        setCurrentDiv={setCurrentDiv}
        label={"Back"}
        icon={true}
        position={"mr-auto absolute left-[11.3rem] top-[12rem]"}
      />
      <div
        className={` w-full py-6 transform translate-y-[30px] border-[1px] border-gray-400 rounded-xl flex flex-col items-center`}
      >
        <p className="text-3xl font-bold text-white">{instruction}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-8">
          <input
            placeholder="e.g 0712345678"
            type="tel"
            id="input-03"
            name="phone"
            value={phoneNumber}
            onChange={handleInputChange}
            className={`rounded-md ${
              !isButtonDisabled
                ? "border-gap-bg outline-none"
                : "outline-red-600"
            } border-[1px] tracking-wider bg-transparent text-2xl text-white text-center py-3 px-8`}
          />

          {isButtonDisabled && (
            <span className="text-red-500">
              Phone number must be ten digits and starting with '0'
            </span>
          )}
          <Button
            disabled={isButtonDisabled}
            submit={true}
            icon={icon}
            label={label}
            className={`${
              !isButtonDisabled ? "bg-gap-bg" : "bg-gray-300"
            } text-[#1e2529] rounded`}
          />
        </form>
      </div>
    </>
  );
};
export default CheckInOutForm;
