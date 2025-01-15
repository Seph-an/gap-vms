"use client";
import { LogIn } from "lucide-react";
import CustomDropdown from "./CustomSelect";
import BackButton from "./BackButton";

export default function Form({
  formData,
  setCurrentDiv,
  setFormData,
  handleChange,
  handleSubmit,
  formErrors,
  isPrivacyChecked,
  setIsPrivacyChecked,
  isFormValid,
}) {
  return (
    // removed w-full as sole class below
    <div className="w-full">
      <BackButton
        setCurrentDiv={setCurrentDiv}
        label={"Back"}
        icon={true}
        position={"mr-auto"}
      />
      <div className="p-4 rounded-lg shadow-lg  border-slate-400 border mt-5">
        <h1 className="text-center text-xl font-medium  text-white mb-3">
          Check in Form
        </h1>
        {!isFormValid && (
          <p className="text-red-600 text-base text-center mb-3">
            Fill all fields!
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white opacity-70"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 text-gap-bg bg-transparent block w-full px-3 py-2 border ${
                formErrors.name ? "border-red-500" : "border-slate-400"
              } rounded-md shadow-sm focus:outline-none focus:ring-gap-bg focus:border-gap-bg`}
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                Name must be at least 2 letters.
              </p>
            )}
          </div>

          {/* Phone Input */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-white opacity-70"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`mt-1 text-gap-bg bg-transparent block w-full px-3 py-2 border ${
                formErrors.phone ? "border-red-500" : "border-slate-400"
              } rounded-md shadow-sm focus:outline-none focus:ring-gap-bg focus:border-gap-bg`}
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm mt-1">
                Phone must be exactly 10 digits.
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white opacity-70"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 text-gap-bg bg-transparent block w-full px-3 py-2 border ${
                formErrors.email ? "border-red-500" : "border-slate-400"
              } rounded-md shadow-sm focus:outline-none focus:ring-gap-bg focus:border-gap-bg`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                Enter a valid email address.
              </p>
            )}
          </div>

          {/* Purpose Select */}
          <div>
            <label
              htmlFor="purpose"
              className="block text-sm font-medium text-white opacity-70"
            >
              Select purpose of visit
            </label>
            <CustomDropdown
              value={formData.purpose}
              options={["Consultation", "Inquiry", "Meeting"]}
              onChange={(selectedOption) =>
                setFormData((prevData) => ({
                  ...prevData,
                  purpose: selectedOption,
                }))
              }
              error={formErrors.purpose}
            />

            {formErrors.purpose && (
              <p className="text-red-500 text-sm mt-1">Purpose is required.</p>
            )}
          </div>

          {/* Privacy Policy Checkbox */}
          <div className=" col-span-1 md:col-span-2 flex justify-center items-center">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              checked={isPrivacyChecked}
              onChange={(e) => setIsPrivacyChecked(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="privacy" className="text-sm font-medium text-white">
              I accept all{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gap-bg underline hover:text-gap-bg-dark"
              >
                Privacy Policy Terms
              </a>{" "}
              regarding my submitted data.
            </label>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`mx-auto flex items-center gap-3 px-16 py-3 text-[#1e2529] rounded ${
                isFormValid ? "bg-gap-bg" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              <span className="text-lg">Check in</span>
              <LogIn color="#1e2529" size={20} strokeWidth={2} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
