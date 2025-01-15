import React from "react";

const Button = ({
  submit = false,
  label,
  icon: Icon,
  className = "",
  ...props
}) => {
  // Determine button type based on the submit prop
  const buttonType = submit ? "submit" : "button";

  return (
    <button
      type={buttonType}
      className={`cursor-pointer px-16 py-3 shadow-lg bg-gap-bg text-[#1e2529] rounded-md flex justify-center items-center gap-5  ${className}`}
      {...props}
    >
      <span className="font-bold text-xl">{label}</span>
      {Icon && <Icon color="#1e2529" size={18} strokeWidth={2} />}
    </button>
  );
};

export default Button;
