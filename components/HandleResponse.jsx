import Success from "./Success";
import Error from "./Error";

const HandleResponse = ({
  isSuccess,
  setIsSuccess,
  setIsError,
  process,
  setCurrentDiv,
  visitType,
  data,
  error,
}) => {
  return (
    <>
      {isSuccess ? (
        <Success
          setIsSuccess={setIsSuccess}
          isSuccess={isSuccess}
          data={data}
          process={process}
          setCurrentDiv={setCurrentDiv}
          visitType={visitType}
        />
      ) : (
        <Error
          setIsError={setIsError}
          error={error}
          setCurrentDiv={setCurrentDiv}
          visitType={visitType}
        />
      )}
    </>
  );
};
export default HandleResponse;
