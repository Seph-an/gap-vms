"use client";
import SignInForm from "./In-Out-Form";
import { LogIn } from "lucide-react";

const Scheduled = ({ setCurrentDiv }) => {
  const enterFullscreen = () => {
    const elem = document.documentElement; // The whole page
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      // Chrome, Safari, Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      // IE/Edge
      elem.msRequestFullscreen();
    }
  };
  return (
    <div className="">
      <SignInForm
        instruction={"Enter your phone number to check in:"}
        process={"in"}
        label={"Check in"}
        icon={LogIn}
        setCurrentDiv={setCurrentDiv}
        form_id={"appointment"}
      />
      <button
        onClick={enterFullscreen}
        className="text-white transform translate-x-[1060px] translate-y-[30px] rounded-[50%]  w-[50px] h-[50px] bg-transparent border-[0.5px] border-gray-900"
      ></button>
    </div>
  );
};

export default Scheduled;
