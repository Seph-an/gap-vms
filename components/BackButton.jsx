import { ArrowLeft } from "lucide-react";

const BackButton = ({ setCurrentDiv, label, icon, position }) => {
  const handleClick = () => setCurrentDiv(1);
  return (
    <button
      type="button"
      onClick={handleClick}
      // onClick={refresh ? () => location.reload() : () => setCurrentDiv(1)}
      className={`${position} cursor-pointer py-2 px-5 shadow-lg bg-gap-bg text-[#1e2529] rounded-md flex items-center gap-2`}
    >
      {icon && <ArrowLeft color="#1e2529" size={20} strokeWidth={2} />}
      <span className="font-regular text-lg">{label}</span>
    </button>
  );
};

export default BackButton;
