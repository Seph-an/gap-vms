export default function getFirstWord(input) {
  if (!input || typeof input !== "string") {
    throw new Error("Input must be a valid string.");
  }
  return input.split(" ")[0];
}

//   const text = "Hello world, this is a test string.";
//   console.log(getFirstWord(text)); // Output: "Hello"
