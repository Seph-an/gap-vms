const formatContact = (input) => {
  const str = input.toString();
  let result = "";
  let count = 0;
  let dashCount = 0;

  // Loop through the string from right to left
  for (let i = str.length - 1; i >= 0; i--) {
    result = str[i] + result; // Add the current character to the beginning of the result
    count++;

    // Add a dash every 3 digits from the right, if we haven't added 2 dashes already
    if (count === 3 && dashCount < 2 && i !== 0) {
      result = "-" + result;
      count = 0;
      dashCount++;
    }
  }

  return result;
};

export default formatContact;
// Example usage
//   console.log(formatString("1234567890")); // Output: "1234-567-890"
//   console.log(formatString("987654321"));  // Output: "987-654-321"
//   console.log(formatString("123456"));     // Output: "123-456"
//   console.log(formatString("12"));         // Output: "12"
