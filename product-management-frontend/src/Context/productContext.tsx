import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../types";
import { getProducts } from "../api/Productapi";

type productContexttype = {
  productData: Product[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
};
const productContext = createContext<productContexttype | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [productData, setproductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your API call
      const response = await getProducts();
     
      if (response.status !== 200) {
        throw new Error("Failed to fetch products");
      }
      const data = response.data.products;
      setproductData(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <productContext.Provider
      value={{ productData, loading, error, refresh: fetchProducts }}
    >
      {children}
    </productContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(productContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
