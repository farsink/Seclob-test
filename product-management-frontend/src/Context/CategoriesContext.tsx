import React, { createContext, useContext, useState, useEffect } from "react";
import { getCategories } from "../api/categoryapi";
import type { Category } from "../types";



type CategoriesContextType = {
  data: Category[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setdata] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your API call
      const response = await getCategories();
  
      if (response.status !== 200) {
        throw new Error("Failed to fetch categories");
      }
      const data = response.data.Category; // Adjust based on your API response structure

      setdata(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{ data, loading, error, refresh: fetchCategories }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
