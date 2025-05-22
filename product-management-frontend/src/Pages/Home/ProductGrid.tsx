import React from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import type { Product } from "../../types";

interface ProductGridProps {
  products: Product[];
  onToggleFavorite: (productId: string) => void;
  onAddToCart: () => void;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onToggleFavorite,
  onAddToCart,
  totalItems,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onToggleFavorite={onToggleFavorite}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className='text-center py-8'>
          <p className='text-gray-500'>No products found</p>
        </div>
      )}

      {totalItems > 0 && (
        <Pagination
          totalItems={totalItems}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      )}
    </div>
  );
};

export default ProductGrid;
