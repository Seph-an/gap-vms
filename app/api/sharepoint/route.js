import { generateAccessToken } from "@utils/auth";
import axios from "axios";
import { NextResponse } from "next/server";
import { format } from "date-fns";

const SITE_ID = process.env.SITE_ID;
const LIST_ID = process.env.LIST_ID;
const GRAPH_URL = `https://graph.microsoft.com/v1.0/sites/${SITE_ID}/lists/${LIST_ID}/items`;

const inProgressRequests = new Set();

const retryWithExponentialBackoff = async (
  operation,
  maxRetries = 3,
  initialDelay = 500
) => {
  let delay = initialDelay;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (error.response?.status === 409 && attempt < maxRetries) {
        console.log(
          `Conflict detected. Retrying in ${delay}ms... (Attempt ${attempt}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
};

const manageSharePointItem = async (fields, headers, itemId = null) => {
  const url = itemId ? `${GRAPH_URL}/${itemId}` : GRAPH_URL;

  const method = itemId ? axios.patch : axios.post;
  return await method(url, { fields }, { headers });
};

const getFormattedDate = () => {
  const now = new Date();
  return format(now, "EEE-dd/MM/yyyy-hh:mm:ssa");
};
console.log("formated date:", getFormattedDate());
const fetchExistingItems = async (phone, headers) => {
  const FETCH_ID_URL = `${GRAPH_URL}?$expand=fields&$select=id,fields&$filter=fields/Phone eq '${phone}'`;
  const response = await axios.get(FETCH_ID_URL, { headers });
  return response.data.value;
};

const createOrUpdateItem = async (fields, headers, itemId = null) => {
  return await retryWithExponentialBackoff(
    () => manageSharePointItem(fields, headers, itemId),
    3,
    500
  );
};
const handleRegistration = async (name, email, phone, purpose, headers) => {
  //implementing a Mutex/Lock Mechanism

  const formattedDate = getFormattedDate();

  // Check for ongoing requests for the same phone number
  if (inProgressRequests.has(phone)) {
    console.log("Duplicate request detected for phone:", phone);
    return;
  }
  inProgressRequests.add(phone);

  try {
    const items = await fetchExistingItems(phone, headers);

    // Check for existing item
    const targetItem = items.find(
      (item) => !item.fields.Checkin || !item.fields.Checkout
    );

    if (targetItem) {
      console.log("From reg: Item exists, skip creation");
      const { Name, Appointment, Purpose } = targetItem.fields;
      return { Name, Appointment, Purpose, RegSpecial: true };
    }

    const fields = {
      Name: name,
      Email: email,
      Phone: phone,
      Purpose: purpose,
      VisitType: "Walk-in",
      Checkin: formattedDate,
    };
    const response = await createOrUpdateItem(fields, headers);
    return { Name: response.data.fields.Name };
  } finally {
    inProgressRequests.delete(phone);
  }
};

const handleUpdate = async (formID, phone, formattedDate, headers) => {
  const items = await fetchExistingItems(phone, headers);

  if (!items.length) {
    return { Phone: phone, Message: "DC", NoRecord: "No record" };
  }

  const targetItem = items.find(
    (item) => !item.fields.Checkin || !item.fields.Checkout
  );
  if (!targetItem) {
    return { Phone: phone, Message: "DC", NoRecord: "No record" };
  }

  const itemId = targetItem.id;
  const { Checkin, Checkout, Name, Appointment, Purpose } = targetItem.fields;

  if (formID === "appointment" && !Checkin) {
    const fields = { Checkin: formattedDate };
    const response = await createOrUpdateItem(fields, headers, itemId);
    const updatedFields = response.data.fields;

    return {
      Name: updatedFields.Name,
      Phone: updatedFields.Phone,
      Appointment: updatedFields.Appointment,
      Purpose: updatedFields.Purpose,
      Checkin: updatedFields.Checkin,
    };
  }

  if (formID === "appointment" && Checkin) {
    return { Name, Appointment, Checkin, Purpose, Message: "D" };
  }

  if (formID === "checkout") {
    if (!Checkin) {
      return { Message: "DC", Name };
    }
    if (Checkout) {
      return { Message: "D" };
    }
    const fields = { Checkout: formattedDate };
    const response = await createOrUpdateItem(fields, headers, itemId);
    return {
      Name: response.data.fields.Name,
      Phone: response.data.fields.Phone,
    };
  }
};

export async function POST(req) {
  try {
    const accessToken = await generateAccessToken();

    const { formID, phone, name, email, purpose } = await req.json();

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const formattedDate = getFormattedDate();
    console.log("The formatted date is:", formattedDate);
    let dataForFE;
    if (formID === "reg") {
      dataForFE = await handleRegistration(
        name,
        email,
        phone,
        purpose,
        headers
      );
    } else {
      dataForFE = await handleUpdate(formID, phone, formattedDate, headers);
    }
    console.log("Data for FE:", dataForFE);
    return NextResponse.json({ success: true, data: dataForFE });
  } catch (error) {
    console.error("Error processing request:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: error.response?.data?.error?.message || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}

// import { generateAccessToken } from "@utils/auth";
// import axios from "axios";
// import { NextResponse } from "next/server";
// import { format } from "date-fns";

// const SITE_ID = process.env.SITE_ID;
// const LIST_ID = process.env.LIST_ID;
// const GRAPH_URL = `https://graph.microsoft.com/v1.0/sites/${SITE_ID}/lists/${LIST_ID}/items`;

// const retryWithExponentialBackoff = async (
//   operation,
//   maxRetries = 3,
//   initialDelay = 500
// ) => {
//   let delay = initialDelay;

//   for (let attempt = 1; attempt <= maxRetries; attempt++) {
//     try {
//       return await operation();
//     } catch (error) {
//       if (error.response?.status === 409 && attempt < maxRetries) {
//         console.log(
//           `Conflict detected. Retrying in ${delay}ms... (Attempt ${attempt}/${maxRetries})`
//         );
//         await new Promise((resolve) => setTimeout(resolve, delay));
//         delay *= 2;
//       } else {
//         throw error;
//       }
//     }
//   }
// };

// const manageSharePointItem = async (fields, headers, itemId = null) => {
//   const url = itemId ? `${GRAPH_URL}/${itemId}` : GRAPH_URL;
//   const method = itemId ? axios.patch : axios.post;
//   return await method(url, { fields }, { headers });
//   // return await axios.patch(url, { fields }, { headers });
// };

// export async function POST(req) {
//   try {
//     const accessToken = await generateAccessToken();
//     const { formID, phone, name, email, purpose } = await req.json();
//     const FETCH_ID_URL = `${GRAPH_URL}?$expand=fields&$select=id,fields&$filter=fields/Phone eq '${phone}'`;

//     console.log("Form identification is:", formID);
//     console.log("Phone is:", phone);

//     const headers = {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//     };

//     let response;
//     let dataForFE = null;
//     let fields = {};
//     const now = new Date();
//     const formattedDate = format(now, "EEE-dd/MM/yyyy-hh:mm:ssa");

//     if (formID === "reg") {
//       //first check if record exists in the list
//       const getItemResponse = await axios.get(FETCH_ID_URL, { headers });

//       const items = getItemResponse.data.value;

//       if (!items.length) {
//         console.log("No matching records found.");

//         //add the record
//         fields = {
//           Name: name,
//           Email: email,
//           Phone: phone,
//           Purpose: purpose,
//           VisitType: "Walk-in",
//           Checkin: formattedDate, // Assuming formattedDate is defined
//         };
//         response = await retryWithExponentialBackoff(
//           () => manageSharePointItem(fields, headers),
//           3,
//           500
//         );
//         const updatedFields = response.data.fields;
//         dataForFE = {
//           Name: updatedFields.Name,
//         };
//       } else {
//         console.log("The item exists from reg");
//         const targetItem = items.find(
//           (item) => !item.fields.Checkin || !item.fields.Checkout
//         );
//         const { Name, Appointment, Purpose } = targetItem.fields;
//         // item exists but does it have provision for checkin and out?
//         if (targetItem) {
//           console.log("record exists ready for checkin/out dont add");
//           dataForFE = {
//             Name,
//             Appointment,
//             Purpose,
//             Message: "DC",
//             RegSpecial: true,
//           };
//         } else {
//           // add the record here too
//           console.log("add the record here too");
//           //add the record
//           fields = {
//             Name: name,
//             Email: email,
//             Phone: phone,
//             Purpose: purpose,
//             VisitType: "Walk-in",
//             Checkin: formattedDate, // Assuming formattedDate is defined
//           };
//           response = await retryWithExponentialBackoff(
//             () => manageSharePointItem(fields, headers),
//             3,
//             500
//           );
//           const updatedFields = response.data.fields;
//           dataForFE = {
//             Name: updatedFields.Name,
//           };
//         }
//       }
//     } else {
//       // Handle item lookup for update

//       const getItemResponse = await axios.get(FETCH_ID_URL, { headers });

//       const items = getItemResponse.data.value;

//       if (!items.length) {
//         console.log("No matching records found.");
//         dataForFE = {
//           Phone: phone,
//           Message: "DC",
//           NoRecord: "No record",
//         };
//       }

//       const targetItem = items.find(
//         (item) => !item.fields.Checkin || !item.fields.Checkout
//       );

//       if (targetItem) {
//         const itemId = targetItem.id;
//         const { Checkin, Checkout, Name, Appointment, Phone, Purpose } =
//           targetItem.fields;
//         if (formID === "appointment" && !Checkin) {
//           // Handle check-in
//           fields.Checkin = formattedDate;
//           // response = await retryWithExponentialBackoff(
//           //   () => updateSharePointItem(itemId, fields, headers),
//           //   3,
//           //   500
//           // );
//           response = await retryWithExponentialBackoff(
//             () => manageSharePointItem(fields, headers, itemId),
//             3,
//             500
//           );

//           const updatedFields = response.data.fields;
//           dataForFE = {
//             Name: updatedFields.Name,
//             Phone: updatedFields.Phone,
//             Appointment: updatedFields.Appointment,
//             Purpose: updatedFields.Purpose,
//             Checkin: updatedFields.Checkin,
//           };
//           console.log("Checking in:", dataForFE);
//         } else if (formID === "appointment" && Checkin) {
//           // Already checked in
//           dataForFE = {
//             Name,
//             Appointment,
//             Checkin,
//             Purpose,
//             Message: "D",
//           };
//           console.log("Already checked in:", dataForFE);
//         } else if (formID === "checkout") {
//           if (!Checkin) {
//             dataForFE = {
//               Message: "DC",
//               Name,
//             };
//           } else if (Checkout) {
//             dataForFE = {
//               Message: "D",
//             };
//           } else {
//             fields.Checkout = formattedDate;
//             // response = await updateSharePointItem(itemId, fields, headers);
//             // response = await retryWithExponentialBackoff(
//             //   () => updateSharePointItem(itemId, fields, headers),
//             //   3,
//             //   500
//             // );
//             response = await retryWithExponentialBackoff(
//               () => manageSharePointItem(fields, headers, itemId),
//               3,
//               500
//             );
//             const updatedFields = response.data.fields;
//             dataForFE = {
//               Name: updatedFields.Name,
//               Phone: updatedFields.Phone,
//             };
//           }
//         }
//       } else {
//         // No matching item found
//         dataForFE = {
//           Phone: phone,
//           Message: "DC",
//           NoRecord: "No record",
//         };
//         // throw new Error("No matching records found for update.");
//       }
//     }
//     // Return the response to the frontend
//     return NextResponse.json({ success: true, data: dataForFE });
//   } catch (error) {
//     console.error("Error only:", error);
//     console.error("Error processing request:", error.message);
//     return NextResponse.json(
//       {
//         success: false,
//         message: error.response?.data?.error?.message || error.message,
//       },
//       { status: error.response?.status || 500 }
//     );
//   }
// }

// // // Helper function to update SharePoint item
// // // const updateSharePointItem = async (itemId, fields, headers) => {
// // //   return await axios.patch(`${GRAPH_URL}/${itemId}`, { fields }, { headers });
// // // };
