import React from "react";
import { LogOut } from "lucide-react";

const SignOutButton = ({ clicked }) => {
  return (
    <button
      onClick={() => clicked(4)}
      className={`absolute right-[70px] cursor-pointer top-[-8rem] px-5 py-2 shadow-lg bg-[#939498] text-[#1e2529] rounded-md flex items-center gap-3`}
    >
      <span className="font-medium text-lg">Check out</span>
      <LogOut color="#1e2529" size={18} strokeWidth={2} />
    </button>
  );
};

export default SignOutButton;
