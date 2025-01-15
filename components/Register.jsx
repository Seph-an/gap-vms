"use client";
import Form from "./Form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Processing from "./Processing";
import HandleResponse from "./HandleResponse";

const Register = ({ setCurrentDiv }) => {
  const [formData, setFormData] = useState({
    formID: "reg",
    name: "",
    phone: "",
    email: "",
    purpose: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    phone: false,
    email: false,
    purpose: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isError, setIsError] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post("/api/sharepoint", formData);
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    return phone.length === 10 && /^[0-9]+$/.test(phone);
  };

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Validate fields on change
    if (name === "email") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: !validateEmail(value),
      }));
    }
    if (name === "phone") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: !validatePhone(value),
      }));
    }
    if (name === "name") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: !validateName(value),
      }));
    }
    if (name === "purpose") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        purpose: value.trim() === "",
      }));
    }
  };

  const isFormValid =
    !formErrors.name &&
    !formErrors.phone &&
    !formErrors.email &&
    !formErrors.purpose &&
    formData.name &&
    formData.phone &&
    formData.email &&
    formData.purpose &&
    isPrivacyChecked;

  return (
    <div className=" w-[80%] pb-10 max-w-6xl mx-auto">
      {isSubmitting ? (
        <Processing process={"in"} />
      ) : isSuccess || isError ? (
        <HandleResponse
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
          setIsError={setIsError}
          process={"in"}
          setCurrentDiv={setCurrentDiv}
          visitType={"reg"}
          data={data}
          error={error}
        />
      ) : (
        <Form
          formData={formData}
          setCurrentDiv={setCurrentDiv}
          setFormData={setFormData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formErrors={formErrors}
          isPrivacyChecked={isPrivacyChecked}
          setIsPrivacyChecked={setIsPrivacyChecked}
          isFormValid={isFormValid}
        />
      )}
    </div>
  );
};

export default Register;
