import React, { type InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  darkMode?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  icon,
  darkMode = false,
  className = "",
  ...props
}) => {
  return (
    <div className='relative'>
      {icon && (
        <div
          className={`absolute inset-y-0 left-3 flex items-center ${
            darkMode ? "text-blue-200" : "text-gray-400"
          }`}
        >
          {icon}
        </div>
      )}
      <input
        className={`
          w-full rounded-md border ${
            icon ? "pl-10" : "pl-4"
          } py-3 pr-4 text-sm transition-colors focus:outline-none focus:ring-2
          ${
            darkMode
              ? "border-blue-600 bg-blue-800/50 text-white placeholder-blue-300 focus:border-blue-400 focus:ring-blue-500/50"
              : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-amber-400 focus:ring-amber-500/50"
          }
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default FormInput;
