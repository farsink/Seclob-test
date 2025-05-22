import React, { useState } from "react";

interface ProductImageProps {
  mainImage: string;
  thumbnails?: string[];
  altText: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  mainImage,
  thumbnails = [],
  altText,
}) => {
  const [currentImage, setCurrentImage] = useState(mainImage);
  const allImages = [mainImage, ...(thumbnails || [])].filter(Boolean);

  return (
    <div className='space-y-4'>
      <div className='overflow-hidden border border-gray-200 rounded-lg bg-white flex items-center justify-center h-80 md:h-96'>
        <img
          src={currentImage}
          alt={altText}
          className='object-contain h-full w-full transition-all duration-300 hover:scale-105'
        />
      </div>

      {allImages.length > 1 && (
        <div className='flex space-x-2 overflow-x-auto pb-2'>
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(img)}
              className={`border rounded-md p-1 min-w-16 h-16 overflow-hidden ${
                currentImage === img ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <img
                src={img}
                alt={`${altText} thumbnail ${index + 1}`}
                className='object-contain h-full w-full'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImage;
