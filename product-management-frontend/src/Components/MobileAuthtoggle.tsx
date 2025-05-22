import React from "react";

interface MobileAuthToggleProps {
  activePanel: "login" | "signup";
  onToggle: () => void;
}

const MobileAuthToggle: React.FC<MobileAuthToggleProps> = ({
  activePanel,
  onToggle,
}) => {
  return (
    <div className='mb-6 flex rounded-lg border border-gray-200 p-1 md:hidden'>
      <button
        className={`w-1/2 rounded-md py-2 text-sm font-medium transition-colors ${
          activePanel === "login"
            ? "bg-blue-600 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        onClick={() => activePanel !== "login" && onToggle()}
      >
        Sign In
      </button>
      <button
        className={`w-1/2 rounded-md py-2 text-sm font-medium transition-colors ${
          activePanel === "signup"
            ? "bg-amber-500 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        onClick={() => activePanel !== "signup" && onToggle()}
      >
        Sign Up
      </button>
    </div>
  );
};

export default MobileAuthToggle;
