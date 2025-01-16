import Spinner from "./Spinner";

const Processing = ({ process }) => {
  return (
    <div className="flex flex-col items-center gap-10 pt-18">
      <Spinner />
      <p className="text-white tracking-wide text-4xl">
        Checking you {process}...
      </p>
    </div>
  );
};

export default Processing;
