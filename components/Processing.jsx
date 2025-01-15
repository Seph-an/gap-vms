import Spinner from "./Spinner";

const Processing = ({ process }) => {
  return (
    <div className="flex flex-col items-center gap-10 pt-24">
      <Spinner />
      <p className="text-white tracking-wide text-xl">
        Checking you {process}...
      </p>
    </div>
  );
};

export default Processing;
