import Button from "./Button";
import SignOutButton from "./SignOutBtn";

const Primary = ({ setCurrentDiv }) => {
  // text-[#939498]
  const handleClick1 = () => setCurrentDiv(2);
  const handleClick2 = () => setCurrentDiv(3);
  return (
    <div className="text-white text-center pt-14 relative flex flex-col gap-12">
      <SignOutButton clicked={setCurrentDiv} />
      <h2 className=" text-5xl ">
        <span className="text-gap-bg font-semibold ">Hello! 🖐</span> Welcome 😊
      </h2>
      <p className="font-bold text-5xl ">
        Are you scheduled for an appointment today?
      </p>
      {/* <p className="font-semibold text-3xl ">
        Are you scheduled for an <span className="text-gap-bg">interview</span>{" "}
        today?
      </p> */}
      <p className="text-white font-bold text-xl">
        Note:
        <span className="text-[#939498] font-medium">
          {" "}
          You can always inquire at the front-desk when you aren't sure!
        </span>
      </p>
      <div className="flex justify-center gap-44 ">
        <Button submit={false} label="Yes I Do" onClick={handleClick1} />
        <Button submit={false} label="No I Don't" onClick={handleClick2} />
      </div>
    </div>
  );
};

export default Primary;
