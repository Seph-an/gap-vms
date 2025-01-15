import { parse, format, sub, differenceInMinutes } from "date-fns";

export default function calculateTimeDifference(timeA, timeC) {
  if (timeA && timeC) {
    console.log("yes time A and time C");
    const newTimeC = timeC.substring(4); // Remove the first 4 characters (day part)

    const parsedDate = parse(newTimeC, "dd/MM/yyyy-hh:mm:ssa", new Date());
    const formattedTimeC = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");

    const newTimeA = new Date(timeA);
    const adjustedTimeA = sub(newTimeA, { hours: 8 });
    console.log("The adjuested time is:", adjustedTimeA);

    // Directly use the Date objects instead of parsing them
    const parsedTimeC = new Date(formattedTimeC); // Convert the formatted ISO string back to a Date
    console.log("The parsed Checkin time is:", parsedTimeC);

    return differenceInMinutes(adjustedTimeA, parsedTimeC);
  }

  return null;
}

console.log(
  "the response is:",
  calculateTimeDifference("2025-01-12T18:00:00Z", "Sun-12/01/2025-11:44:39AM")
);
