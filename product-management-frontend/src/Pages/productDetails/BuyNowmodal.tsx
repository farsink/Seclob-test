import React, { useState } from "react";
import { X, CheckCircle, CreditCard, Truck } from "lucide-react";
import Button from "../../Components/ui/Button";
import type { Product } from "../../types";

interface BuyNowModalProps {
  product: Product;
  quantity: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const BuyNowModal: React.FC<BuyNowModalProps> = ({
  product,
  quantity,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [step, setStep] = useState<"review" | "payment" | "confirmation">(
    "review"
  );

  if (!isOpen) return null;

  const totalPrice = product.price * quantity;

  const handleBackClick = () => {
    if (step === "payment") {
      setStep("review");
    } else {
      onClose();
    }
  };

  const handleNextClick = () => {
    if (step === "review") {
      setStep("payment");
    } else if (step === "payment") {
      setStep("confirmation");
      // In a real app, we would process payment here
    } else {
      onConfirm();
      onClose();
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-md'>
        <div className='flex items-center justify-between px-6 py-4 border-b'>
          <h2 className='text-xl font-semibold text-gray-900'>
            {step === "confirmation"
              ? "Order Confirmed"
              : "Complete Your Purchase"}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-500 transition-colors'
          >
            <X size={24} />
          </button>
        </div>

        <div className='p-6'>
          {step === "review" && (
            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <div className='w-16 h-16 border border-gray-200 rounded-md overflow-hidden'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-full object-contain'
                  />
                </div>
                <div>
                  <h3 className='font-medium text-gray-900'>{product.name}</h3>
                  <p className='text-gray-500'></p>
                  <p className='text-gray-500'>Quantity: {quantity}</p>
                </div>
              </div>

              <div className='border-t border-gray-200 pt-4'>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Subtotal</span>
                  <span className='text-gray-900'>
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className='flex justify-between mt-2'>
                  <span className='text-gray-500'>Quantity</span>
                  <span className='text-gray-900'>x {quantity}</span>
                </div>
                <div className='flex justify-between mt-2'>
                  <span className='text-gray-500'>Shipping</span>
                  <span className='text-gray-900'>Free</span>
                </div>
                <div className='flex justify-between mt-4 pt-4 border-t border-gray-100'>
                  <span className='font-medium text-gray-900'>Total</span>
                  <span className='font-medium text-gray-900'>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className='space-y-6'>
              <div>
                <label
                  htmlFor='cardNumber'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Card Number
                </label>
                <div className='relative'>
                  <input
                    type='text'
                    id='cardNumber'
                    placeholder='1234 5678 9012 3456'
                    className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md'
                  />
                  <CreditCard
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    size={16}
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='expiryDate'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Expiry Date
                  </label>
                  <input
                    type='text'
                    id='expiryDate'
                    placeholder='MM/YY'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label
                    htmlFor='cvc'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    CVC
                  </label>
                  <input
                    type='text'
                    id='cvc'
                    placeholder='123'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Name on Card
                </label>
                <input
                  type='text'
                  id='name'
                  placeholder='John Doe'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md'
                />
              </div>

              <div className='pt-4 border-t border-gray-200'>
                <p className='text-gray-700 font-medium'>
                  Total: ${totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          )}

          {step === "confirmation" && (
            <div className='text-center py-6'>
              <div className='flex justify-center mb-4'>
                <CheckCircle size={48} className='text-green-500' />
              </div>
              <h3 className='text-xl font-medium text-gray-900 mb-2'>
                Thank You for Your Order!
              </h3>
              <p className='text-gray-500 mb-4'>
                Your order has been placed and will be processed soon.
              </p>
              <div className='bg-gray-50 p-4 rounded-md flex items-start space-x-3 text-left'>
                <Truck className='text-blue-500 mt-0.5' size={20} />
                <div>
                  <p className='font-medium text-gray-900'>
                    Shipping Information
                  </p>
                  <p className='text-gray-500'>
                    Your order will be delivered in 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='px-6 py-4 border-t border-gray-200 flex justify-between'>
          <Button variant='outline' onClick={handleBackClick}>
            {step === "confirmation" ? "Close" : "Back"}
          </Button>

          {step !== "confirmation" && (
            <Button onClick={handleNextClick}>
              {step === "review" ? "Proceed to Payment" : "Confirm Payment"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;
