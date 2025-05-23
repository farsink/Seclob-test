import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ProductGrid from "./ProductGrid";
import ActionButtons from "../../Components/ActionButtons";
import Breadcrumb from "../../Components/BreadCrums";
import type { Product, Category } from "../../types";
import { initialProducts } from "./data";
import { useCategories } from "../../Context/CategoriesContext";
import { addcategory, updateCategory } from "../../api/categoryapi";

function Home() {
  const { data } = useCategories();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(data || []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  // Filter products based on selected categories and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category) ||
      selectedCategories.includes(product.brand);

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle category selection
  const handleCategorySelect = (categoryId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
    setCurrentPage(1); // Reset to first page when changing filters
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    setCartItems((prevCount) => prevCount + 1);
  };

  // Handle adding a new category
  const handleAddCategory = async (name: string) => {
    const newCategory: Category = {
      _id: `cat-${Date.now()}`,
      category: name,
      subcategory: null,
    };
    try {
      const response = await addcategory(newCategory.category);
      console.log("Category added successfully:", response);
    } catch (error) {
      console.error("Error adding category:", error);
    }

    setCategories([...categories, newCategory]);
  };

  // Handle adding a new subcategory
  const handleAddSubCategory = async (name: string, parentId: string) => {
    const parentCategory = categories.find((cat) => cat._id === parentId);
    if (!parentCategory) {
      console.error(`Parent category with ID ${parentId} not found.`);
      return;
    }

    try {
      const response = await updateCategory(parentId, name);
      console.log("Subcategory added successfully:", response);
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }

    const newCategory: Category = {
      _id: `subcat-${Date.now()}`,
      category: name,
      subcategory: [], // Generate a unique ID for the new subcategory, // Subcategories don't have brands in this structure
    };

    // Update the parent category's subcategories array
    const updatedCategories = categories.map((cat) => {
      if (cat._id === parentId) {
        // Add the new subcategory's name to the parent's brands array
        return {
          ...cat,
          subcategory: cat.subcategory
            ? [...cat.subcategory, newCategory.category]
            : [newCategory.category],
        };
      }
      return cat;
    });

    // Add the new subcategory to the list
    setCategories([...updatedCategories, newCategory]);
  };

  // Handle adding a new product
  const handleAddProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      ...product,
      isFavorite: false,
    };
    setProducts([...products, newProduct]);
  };

  // Handle toggling product favorite status
  const handleToggleFavorite = (productId: string) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <Header
        onSearch={handleSearch}
        searchQuery={searchQuery}
        cartItems={cartItems}
      />

      <div className='flex-1 flex flex-col md:flex-row bg-gray-100'>
        <Sidebar
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategory={handleCategorySelect}
        />

        <main className='flex-1 p-4'>
          <div className='mb-4'>
            <Breadcrumb />
          </div>

          <div className='mb-4 flex justify-end space-x-2'>
            <ActionButtons
              onAddCategory={handleAddCategory}
              onAddSubCategory={handleAddSubCategory}
              onAddProduct={handleAddProduct}
              categories={categories}
            />
          </div>

          <ProductGrid
            products={displayedProducts}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            totalItems={totalItems}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </main>
      </div>
    </div>
  );
}

export default Home;
