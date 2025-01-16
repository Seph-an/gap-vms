import { Check } from "lucide-react";
import BackButton from "./BackButton";
import { sub, format } from "date-fns";
import calculateTimeDifference from "@utils/time_difference";
import getFirstName from "@utils/get_firstname";
import NoRecord from "./NoRecord";
import RightForm from "./RightForm";

const formatedTime = (timeString) => {
  if (!timeString || !timeString.includes("T")) {
    throw new Error("Invalid time string format.");
  }
  console.log("input time string:", timeString);
  const utcTime = new Date(timeString);

  const adjustedTime = sub(utcTime, { hours: 11 });

  const timeOnly = format(adjustedTime, "hh:mm a");

  return timeOnly;
};

const appointmentTime = (purpose, time, is = true) => {
  return (
    <p className="text-2xl">
      Your <span className="text-gap-bg font-medium">{purpose} </span>
      appointment {is ? "is" : "was"} at{" "}
      <span className="text-gap-bg font-medium">{formatedTime(time)}</span>
    </p>
  );
};
const proceed = (process) => {
  return (
    <p className="text-[#939498] text-xl font-light">
      {process === "in"
        ? "Proceed to front-desk for further direction."
        : "Thank you!"}
    </p>
  );
};
const baseSalutation = (name, process, already = false) => {
  const name_to_use = getFirstName(name);
  return (
    <p className="text-white text-xl">
      Hey <span className="text-gap-bg font-medium">{name_to_use}</span> you{" "}
      {already
        ? "already checked in!"
        : `have checked ${process} successfully!`}
    </p>
  );
};

const Success = ({
  setIsSuccess,
  isSuccess,
  data,
  process,
  visitType,
  setCurrentDiv,
  onComplete,
}) => {
  const A = data.data?.Appointment;
  const C = data.data?.Checkin;
  let difference;
  console.log("What is the visit type:", visitType);

  if (visitType === "appointment" && !data.data.Message) {
    console.log("Difference computation reached!");
    difference = calculateTimeDifference(A, C);
  }

  console.log("What is the difference:", difference);

  return (
    <div className="text-center flex flex-col gap-8 text-white items-center">
      {data.data.Message !== "DC" && (
        <Check
          color="#51D4D6"
          size={42}
          strokeWidth={2}
          className="transform translate-y-[15px]"
        />
      )}
      {data.data?.NoRecord && (
        <NoRecord
          setIsSuccess={setIsSuccess}
          isSuccess={isSuccess}
          setCurrentDiv={setCurrentDiv}
          Phone={data.data?.Phone}
          proceed={process}
          onComplete={onComplete}
        />
      )}
      {visitType === "appointment" && (
        <>
          {data.data?.Message === "D" && (
            <div className="flex flex-col gap-8">
              {baseSalutation(data.data.Name, process, true)}
              {data.data.Appointment &&
                appointmentTime(data.data.Purpose, data.data.Appointment, true)}
              {proceed(process)}
            </div>
          )}

          {!data.data.Message && (
            <div>
              {difference > 60 && (
                <div className="flex flex-col gap-8">
                  {console.log("more than 60 mins hit")}

                  {baseSalutation(data.data.Name, process, false)}
                  {data.data.Appointment &&
                    appointmentTime(
                      data.data.Purpose,
                      data.data.Appointment,
                      true
                    )}
                  {data.data.Purpose === "Interview" && (
                    <p className="text-green-400">
                      Your early timing is commendable 👍. All the best!
                    </p>
                  )}
                  {proceed(process)}
                </div>
              )}
              {difference >= 1 && difference <= 60 && (
                <div className="flex flex-col gap-8">
                  {console.log("between 1 to 60 mins hit")}
                  {baseSalutation(data.data.Name, process, false)}
                  {appointmentTime(
                    data.data.Purpose,
                    data.data.Appointment,
                    true
                  )}
                  {proceed(process)}
                </div>
              )}
              {difference < 1 && (
                <div className="flex flex-col gap-8">
                  {console.log("less than 1 mins hit")}

                  {baseSalutation(data.data.Name, process, false)}
                  {appointmentTime(
                    data.data.Purpose,
                    data.data.Appointment,
                    false
                  )}
                  {data.data.Purpose === "Interview" && (
                    <p className="text-red-500">
                      You are late for your interview. All the best!
                    </p>
                  )}
                  {proceed(process)}
                </div>
              )}
            </div>
          )}
        </>
      )}
      {visitType === "reg" && (
        <>
          {data.data.Message === "DC" && (
            <RightForm
              name={getFirstName(data.data.Name)}
              purpose={data.data.Purpose}
              time={formatedTime(data.data.Appointment)}
              onComplete={onComplete}
              setCurrentDiv={setCurrentDiv}
            />
          )}
          {!data.data.Message && (
            <div className="flex flex-col items-center gap-8 ">
              {baseSalutation(data.data.Name, process, false)}
              {proceed(process)}
            </div>
          )}
        </>
      )}
      {visitType === "checkout" && (
        <>
          {data.data?.Message === "D" && (
            <div className="flex flex-col gap-8">
              <p className="text-white text-2xl">
                You have already checked out!
              </p>
              {proceed(process)}
            </div>
          )}
          {data.data?.Message === "DC" && !data.data.NoRecord && (
            <div className="flex flex-col gap-8 mt-20">
              <p className="text-[#939498] text-2xl font-light">
                Hey{" "}
                <span className="text-gap-bg font-medium">
                  {getFirstName(data.data.Name)}
                </span>
              </p>
              <p className="text-red-400 text-2xl font-light">
                You can't Checkout before Checking in!
              </p>
              {proceed(process)}
            </div>
          )}
          {!data.data.Message && (
            <div className="flex flex-col gap-8 mt-5">
              <p className="text-white text-2xl">
                You have{" "}
                <span className="text-gap-bg font-medium">Checked out</span>{" "}
                successfully!
              </p>
              {proceed(process)}
            </div>
          )}
        </>
      )}
      {!data.data.NoRecord && !data.data.RegSpecial && (
        <BackButton
          setCurrentDiv={setCurrentDiv}
          label={"OK"}
          icon={false}
          position={"mx-auto font-bold px-24"}
        />
      )}
    </div>
  );
};

export default Success;
