import SignOutForm from "./In-Out-Form";
import { LogOut } from "lucide-react";

const SignOut = ({ setCurrentDiv }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <SignOutForm
        instruction={"Enter the phone number used when checking in:"}
        process={"out"}
        label={"Check out"}
        icon={LogOut}
        setCurrentDiv={setCurrentDiv}
        form_id={"checkout"}
      />
    </div>
  );
};

export default SignOut;
