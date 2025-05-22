import React from "react";

interface RamSelectorProps {
  options: string[];
  selected: string;
  onChange: (option: string) => void;
}

const RamSelector: React.FC<RamSelectorProps> = ({
  options,
  selected,
  onChange,
}) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {options.map((option) => (
        <button
          key={option}
          type='button'
          onClick={() => onChange(option)}
          className={`px-4 py-2 rounded-md border transition-all ${
            selected === option
              ? "bg-blue-900 text-white border-blue-900"
              : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default RamSelector;
