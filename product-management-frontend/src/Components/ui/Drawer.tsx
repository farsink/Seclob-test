import React, { useEffect, useState } from "react";
import { getwishlist, removeFromWishlist } from "../../api/wishlist";
import { Trash2Icon } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface wishlistItems {
  productId: string;
  name: string;
  price: number;
  image: string;
  _id: string;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const [wishlist, setwishlist] = useState<wishlistItems[]>([]);

  useEffect(() => {
    // Simulate fetching wishlist items from an API
    const fetchWishlist = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in session storage.");
        return;
      }
      try {
        const response = await getwishlist(userId);

        if (response.status === 200 || response.status === 201) {
          setwishlist(response.data.wishlist.products);
        } else {
          console.error("Failed to fetch wishlist:", response);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const handleremove = async (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in session storage.");
      return;
    }
    try {
      const response = await removeFromWishlist(userId, itemId);
      if (response.status === 200 || response.status === 201) {
        // Update the wishlist state to remove the item
        setwishlist((prevWishlist) =>
          prevWishlist.filter((item) => item.productId !== itemId)
        );
      } else {
        console.error("Failed to remove item from wishlist:", response);
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  return (
    <div className={`relative pointer-events-none`}>
      {/* Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-opacity-10 z-40 transition-opacity duration-300 pointer-events-auto'
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } pointer-events-auto`}
      >
        {/* Drawer header */}
        <div className='p-4 border-b flex justify-between items-center'>
          <h2 className='text-xl font-semibold'>Wishlists</h2>
          <button
            onClick={onClose}
            className='text-gray-600 hover:text-gray-900'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        {/* Drawer content */}
        <div className='p-4'>
          {wishlist.length === 0 ? (
            <div className='text-gray-500'>No items in wishlist.</div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item._id}
                className='relative flex items-center mb-2 border-b p-4 cursor-pointer rounded-b-sm hover:bg-gray-100 transition-colors hover:shadow-sm'
              >
                <div className='absolute top-2 right-2'>
                  <button
                    className='text-red-500 hover:text-red-700 hover:cursor-pointer'
                    onClick={(e) => handleremove(e, item.productId)}
                  >
                    <Trash2Icon size={13} />
                  </button>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  crossOrigin='anonymous'
                  className='w-12 h-12 object-cover rounded mr-4 border'
                />
                <div className='flex flex-col'>
                  <span className='font-medium'>{item.name}</span>
                  <p className='text-gray-600 text-sm mt-1'>
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
