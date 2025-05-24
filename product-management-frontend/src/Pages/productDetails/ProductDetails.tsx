/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Header from "../../Pages/Home/Header";
import Breadcrumb from "../../Components/BreadCrums";
import ProductImage from "./ProductImage";
import QuantitySelector from "./QuantitySelector";
import RamSelector from "./Ramselector";
import Badge from "../../Components/ui/Badge";
import Button from "../../Components/ui/Button";
import BuyNowModal from "./BuyNowmodal";
import type { BreadcrumbItem, Product } from "../../types";
import { useProduct } from "../../Context/productContext";
import { useParams } from "react-router-dom";
import Modal from "../Home/Modal";

import EditproductModal from "./EditproductModal";
import { useCategories } from "../../Context/CategoriesContext";

const ProductDetails: React.FC = () => {
  const { productData, refresh } = useProduct();
  const { data } = useCategories();
  const { id } = useParams<{ id: string }>();

  const filteredProduct = productData.filter(
    (product: Product) => product._id === id
  )[0];

  const [product, setProduct] = useState<Product | null>(filteredProduct);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [selectedRam, setSelectedRam] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isopen, setisopen] = useState(false);

  const [cartItems, setCartItems] = useState<number>(0);

  useEffect(() => {
    if (filteredProduct) {
      setProduct(filteredProduct);
    }
  }, [filteredProduct]);

  // The empty dependency array [] ensures this effect runs only once after the initial render

  if (!product) {
    return <div className='p-8 text-center'>Loading product details...</div>;
  }

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleRamChange = (option: string) => {
    setSelectedRam(option);
    // setProduct((prev) => (prev ? { ...prev, selectedRam: option } : null));
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleBuyConfirm = () => {
    // In a real app, this would process the order
    console.log("Purchase confirmed", { product, quantity, selectedRam });
  };
  // Placeholder function for search
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    setSearchQuery(query);
    // In a real app, this would trigger a search
  };

  const handleEditProduct = () => {
    setisopen(false);
    refresh(); // Refresh the product list after editing
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    { id: "home", name: "Home", href: "/home" },
    { id: "product", name: "Product Details", href: "#" },
    { id: product._id ? product._id : "", name: product.category, href: "#" }, // Current page, href="#" or the actual product URL
  ];

  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <Header
        onSearch={handleSearch}
        searchQuery={searchQuery}
        cartItems={cartItems}
      />

      <main className='flex-grow container mx-auto px-4 py-8'>
        <div className='mb-6'>
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className='bg-white rounded-lg shadow-sm p-6 md:p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <ProductImage
              mainImage={product.images ? (product.images[0] as string) : ""}
              thumbnails={
                product.images ? (product.images.slice(1) as string[]) : []
              }
              altText={product.name}
            />

            <div className='space-y-6'>
              <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
                {product.name}
              </h1>

              <div className='flex items-center'>
                <span className='text-2xl font-bold text-gray-900'>
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className='flex items-center space-x-2'>
                <span className='text-gray-700 font-medium'>Availability:</span>
                {product ? (
                  <Badge variant='success' className='flex items-center'>
                    <span className='inline-block w-2 h-2 rounded-full bg-green-500 mr-1'></span>
                    In stock
                  </Badge>
                ) : (
                  <Badge variant='error'>Out of stock</Badge>
                )}
              </div>

              <p className='text-amber-600 text-sm'>
                {product.stockQuantity && product.stockQuantity > 0 ? (
                  <>
                    Hurry up! Only {product.stockQuantity} product
                    {product.stockQuantity > 1 ? "s" : ""} left in stock!
                  </>
                ) : (
                  "  Hurry up! only less product left in stock!"
                )}
              </p>

              <div>
                <h3 className='text-gray-700 font-medium mb-2'>RAM:</h3>
                <RamSelector
                  options={
                    product.variants?.map((variant) => variant.ram) || []
                  }
                  selected={selectedRam}
                  onChange={handleRamChange}
                />
              </div>

              <div className='flex items-center space-x-4'>
                <div>
                  <h3 className='text-gray-700 font-medium mb-2'>Quantity:</h3>
                  <QuantitySelector
                    quantity={quantity}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onQuantityChange={handleQuantityChange}
                  />
                </div>
              </div>

              <div className='flex flex-wrap gap-3'>
                <Button onClick={() => setIsBuyModalOpen(true)}>
                  Buy it now
                </Button>

                <Button
                  className='bg-yellow-600 hover:bg-yellow-700'
                  onClick={() => setisopen(true)}
                >
                  Edit product
                </Button>

                <button
                  onClick={toggleFavorite}
                  className={`p-2 rounded-md border transition-colors ${
                    isFavorite
                      ? "border-red-300 bg-red-50 text-red-500"
                      : "border-gray-300 bg-white text-gray-400 hover:text-gray-500"
                  }`}
                  aria-label='Add to favorites'
                >
                  <Heart
                    size={24}
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <div className='border-t border-gray-200 pt-4'>
                <h3 className='text-gray-700 font-medium mb-2'>Description:</h3>
                <p className='text-gray-600'>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BuyNowModal
        product={product}
        quantity={quantity}
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        onConfirm={handleBuyConfirm}
      />
      <Modal
        isOpen={isopen}
        onClose={() => setisopen(false)}
        title={`Edit ${product.name}`}
      >
        <EditproductModal
          product={product}
          categories={data} // Pass your categories array here
          onEdit={handleEditProduct} // Implement this to update the product
          onClose={() => setisopen(false)}
        />
      </Modal>
    </div>
  );
};

export default ProductDetails;
