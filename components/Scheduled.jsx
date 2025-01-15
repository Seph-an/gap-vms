import SignInForm from "./In-Out-Form";
import { LogIn } from "lucide-react";

const Scheduled = ({ setCurrentDiv }) => {
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
    </div>
  );
};

export default Scheduled;
