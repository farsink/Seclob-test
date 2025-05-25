import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ProductGrid from "./ProductGrid";
import ActionButtons from "../../Components/ActionButtons";
import Breadcrumb from "../../Components/BreadCrums";
import type { Product, Category } from "../../types";

import { useCategories } from "../../Context/CategoriesContext";
import { addcategory, updateCategory } from "../../api/categoryapi";
import { useProduct } from "../../Context/productContext";
import { addProduct } from "../../api/Productapi";
import Drawer from "../../Components/ui/Drawer";
import { addToWishlist, getwishlist } from "../../api/wishlist";

function Home() {
  const { data } = useCategories();
  const { productData } = useProduct();
  const [products, setProducts] = useState<Product[]>(productData || []);
  const [categories, setCategories] = useState<Category[]>(data || []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<number>(0);
  const [wishlistItems, setWishlistItems] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const fetchWishlist = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in session storage.");
      return;
    }
    try {
      const response = await getwishlist(userId);

      if (response.status === 200 || response.status === 201) {
        const count = response.data.wishlist.products.length;
        setWishlistItems(count);
      } else {
        console.error("Failed to fetch wishlist:", response);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };
  useEffect(() => {
    if (data) {
      setCategories(data);
    }
    if (productData) {
      setProducts(productData);
    }
    fetchWishlist();
  }, [data, productData]);

  // Filter products based on selected categories and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category) ||
      selectedCategories.includes(product.subcategory);

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
      setSelectedCategories([categoryId]);
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

    // Update the parent category's subcategories array
    const updatedCategories = categories.map((cat) => {
      if (cat._id === parentId) {
        return {
          ...cat,
          subcategory: cat.subcategory ? [...cat.subcategory, name] : [name],
        };
      }
      return cat;
    });

    // Add the new subcategory to the list
    setCategories(updatedCategories);
  };

  // Handle adding a new product
  const handleAddProduct = async (product: Omit<Product, "id">) => {
    const UploadData = new FormData();
    UploadData.append("name", product.name);
    UploadData.append("description", product.description);
    UploadData.append("price", product.price.toString());
    UploadData.append("category", product.category);
    UploadData.append("subcategory", product.subcategory);
    UploadData.append("stockQuantity", product.stockQuantity?.toString() || "");
    if (product.images && product.images.length > 0) {
      product.images.forEach((file) => {
        UploadData.append("images", file); // Use the same key for multiple files
      });
    }
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach((variant, idx) => {
        if (variant.ram)
          UploadData.append(`variants[${idx}][ram]`, variant.ram);
        if (variant.price !== undefined)
          UploadData.append(
            `variants[${idx}][price]`,
            variant.price.toString()
          );
        if (variant.stockQuantity !== undefined)
          UploadData.append(
            `variants[${idx}][stockQuantity]`,
            variant.stockQuantity.toString()
          );
      });
    }

    try {
      const response = await addProduct(UploadData);
      console.log("Product added successfully:", response);
    } catch (error) {
      console.error("Error adding product:", error);
    }

    const newProduct: Product = {
      ...product,
      _id: `prod-${Date.now()}`,
      isFavorite: false,
    };
    setProducts([...products, newProduct]);
  };

  // Handle toggling product favorite status
  const handleToggleFavorite = async (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (!product) {
      console.error(`Product with ID ${productId} not found.`);
      return;
    }
    const userID = sessionStorage.getItem("userId");
    if (!userID) {
      console.error("User ID not found in session storage.");
      return;
    }
    console.log(userID);
    try {
      const response = await addToWishlist(
        userID,
        productId,
        product.name,
        product.price,
        (product.images?.[0] as string) || ""
      );

      console.log("Wishlist updated successfully:", response);
      if (
        (response as { status: number }).status === 200 ||
        (response as { status: number }).status === 201
      ) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? { ...product, isFavorite: !product.isFavorite }
              : product
          )
        );
        setWishlistItems((prevCount) => prevCount + 1);
      } else if ((response as { status: number }).status === 403) {
        alert("allready added to wishlist");
      } else {
        console.error("Failed to update wishlist:", response);
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <Header
        onSearch={handleSearch}
        searchQuery={searchQuery}
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        onopenDrawer={() => setIsDrawerOpen(true)}
      />

      <div className='flex-1 flex flex-col md:flex-row bg-gray-100'>
        <Sidebar
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategory={handleCategorySelect}
        />

        <main className='flex-1 p-4 max-h-screen overflow-y-auto'>
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

          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          />
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
