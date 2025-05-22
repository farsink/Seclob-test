import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  onQuantityChange,
  min = 1,
  max = 99,
}) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value);
    }
  };

  return (
    <div className='flex items-center'>
      <button
        type='button'
        className='w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors'
        onClick={onDecrement}
        disabled={quantity <= min}
        aria-label='Decrease quantity'
      >
        <Minus size={16} />
      </button>
      <input
        type='text'
        className='w-12 h-8 border-y border-gray-300 text-center focus:outline-none focus:ring-0 focus:border-blue-500'
        value={quantity}
        onChange={handleQuantityChange}
        min={min}
        max={max}
        aria-label='Quantity'
      />
      <button
        type='button'
        className='w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors'
        onClick={onIncrement}
        disabled={quantity >= max}
        aria-label='Increase quantity'
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantitySelector;
