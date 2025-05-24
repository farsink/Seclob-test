import React from "react";
import { Heart } from "lucide-react";
import type { Product } from "../../types";
import StarRating from "../../Components/StarRatings";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onToggleFavorite: (productId: string) => void;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onToggleFavorite,
  onAddToCart,
}) => {
  const navigate = useNavigate();
  // Using a placeholder image since the actual images aren't available
  // console.log("ProductCard product:", product.images);

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg'>
      <div className='relative p-4'>
        <button
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
            product.isFavorite ? "text-red-500" : "text-gray-400"
          }`}
          onClick={() => product._id && onToggleFavorite(product._id)}
          aria-label={
            product.isFavorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          <Heart
            size={20}
            fill={product.isFavorite ? "currentColor" : "none"}
          />
        </button>

        <div
          className='flex justify-center mb-4'
          onClick={() => navigate("/productdetails/" + product._id)}
        >
          <img
            src={product.images && product.images[0] as string} 
            alt={product.name}
            crossOrigin='anonymous'
            className='h-40 object-contain transition-transform hover:scale-105'
          />
        </div>

        <div className='text-center'>
          <h3 className='text-lg font-medium mb-2'>{product.name}</h3>
          <p className='text-lg font-semibold text-gray-800 mb-2'>
            ${product.price.toFixed(2)}
          </p>
          <div className='flex justify-center mb-2'>
            <StarRating rating={product.rating} />
          </div>

          <button
            className='mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
