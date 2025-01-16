"use client";
import { useState } from "react";
import CheckInOutForm from "./CheckInOutForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Processing from "./Processing";
import HandleResponse from "./HandleResponse";

export default function InOutForm({
  instruction,
  process,
  label,
  icon,
  setCurrentDiv,
  form_id,
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/\D/g, "");
    setPhoneNumber(sanitizedValue);
    const isValid =
      sanitizedValue.length === 10 && sanitizedValue.startsWith("0");
    setIsButtonDisabled(!isValid);
  };

  const formData = {
    formID: form_id,
    phone: phoneNumber,
    process: process,
  };

  const mutation = useMutation({
    mutationFn: async (form_data) => {
      const { data } = await axios.post("/api/sharepoint", form_data);
      return data;
    },
    onSuccess: (data) => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setData(data);
    },
    onError: (error) => {
      setIsSubmitting(false);
      setIsError(true);
      setError(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    mutation.mutate(formData);
  };

  return (
    <div className=" flex w-[80%] flex-col items-center mx-auto">
      {isSubmitting ? (
        <Processing process={process} />
      ) : isSuccess || isError ? (
        <HandleResponse
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
          setIsError={setIsError}
          process={process}
          setCurrentDiv={setCurrentDiv}
          visitType={form_id}
          data={data}
          error={error}
        />
      ) : (
        <CheckInOutForm
          instruction={instruction}
          label={label}
          icon={icon}
          setCurrentDiv={setCurrentDiv}
          phoneNumber={phoneNumber}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          isButtonDisabled={isButtonDisabled}
        />
      )}
    </div>
  );
}
