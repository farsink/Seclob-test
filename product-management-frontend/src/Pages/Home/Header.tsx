import React, { useState } from "react";
import { HeartPlus, Search, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";


interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  cartItems: number;
  wishlistItems: number;
  onopenDrawer: () => void; // Added openDrawer prop
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  searchQuery,
  cartItems,
  wishlistItems,
  onopenDrawer: openDrawer, // Destructure openDrawer prop
}) => {
  
  const [query, setQuery] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <header className='bg-[#003A5D] text-white p-4 shadow-md'>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between'>
        <div className='flex items-center w-full md:w-auto mb-4 md:mb-0 justify-center '>
          <form
            onSubmit={handleSubmit}
            className='flex-1 md:ml-8 md:mr-8 max-w-lg w-lg bg-white rounded-full'
          >
            <div className='relative'>
              <input
                type='text'
                placeholder='Search any things'
                className='w-full py-2 px-4 rounded-l-md text-gray-800 focus:outline-none'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type='submit'
                className='absolute right-0 top-0 h-full bg-[#F5A623] text-white px-4 rounded-r-full flex items-center justify-center hover:bg-[#e69914] transition-colors'
              >
                <Search size={18} />
                <span className='ml-1'>Search</span>
              </button>
            </div>
          </form>
        </div>

        <div className='flex items-center space-x-6'>
          <div
            className='flex items-center cursor-pointer hover:text-gray-200 transition-colors'
            onClick={() => {
              openDrawer();
            }}
          >
            <HeartPlus size={20} />
            {wishlistItems > 0 && (
              <span className='relative -top-3 right-1 bg-[#F5A623] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                {wishlistItems}
              </span>
            )}
          </div>
          <div
            className='flex items-center cursor-pointer hover:text-gray-200 transition-colors'
            onClick={() => {
              sessionStorage.removeItem("user");
              sessionStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            <User size={20} />
            <span className='ml-2'>Sign out</span>
          </div>

          <div className='flex items-center cursor-pointer hover:text-gray-200 transition-colors'>
            <div className='relative'>
              <ShoppingCart size={20} />
              {cartItems > 0 && (
                <span className='absolute -top-2 -right-2 bg-[#F5A623] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                  {cartItems}
                </span>
              )}
            </div>
            <span className='ml-2'>Cart</span>
          </div>
        </div>
      </div>
      
    </header>
  );
};

export default Header;
