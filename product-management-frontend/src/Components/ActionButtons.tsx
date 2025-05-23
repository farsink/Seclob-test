import React, { useState } from "react";
import { Plus } from "lucide-react";
import type { Category, Product } from "../types";
import Modal from "../Pages/Home/Modal";

interface ActionButtonsProps {
  onAddCategory: (name: string) => void;
  onAddSubCategory: (name: string, parentId: string) => void;
  onAddProduct: (product: Omit<Product, "id">) => void;
  categories: Category[];
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAddCategory,
  onAddSubCategory,
  onAddProduct,
  categories,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "category" | "subcategory" | "product"
  >("category");
  const [categoryName, setCategoryName] = useState("");
  const [selectedParentId, setSelectedParentId] = useState("");

  const [newProduct, setNewProduct] = useState({
    title: "",
    subcategory: "",
    description: "",
    variants: [{ ram: "", price: "", qty: 1 }],
    images: [] as File[],
    rating: 5,
  });

  const openModal = (type: "category" | "subcategory" | "product") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (modalType === "category" && categoryName) {
      onAddCategory(categoryName);
      setCategoryName("");
    } else if (
      modalType === "subcategory" &&
      categoryName &&
      selectedParentId
    ) {
      onAddSubCategory(categoryName, selectedParentId);
      setCategoryName("");
      setSelectedParentId("");
    } else if (modalType === "product") {
      onAddProduct({
        name: newProduct.title,
        price: parseFloat(newProduct.variants[0].price.toString()),
        category: newProduct.subcategory,
        brand: newProduct.subcategory,
        image: "/product-placeholder.png",
        rating: parseInt(newProduct.rating.toString()),
        isFavorite: false,
      });
      setNewProduct({
        title: "",
        subcategory: "",
        description: "",
        variants: [{ ram: "", price: "", qty: 1 }],
        images: [] as File[],
        rating: 5,
      });
    }
    setIsModalOpen(false);
  };

  // Filter top-level categories for parent selection
  const parentCategories = categories.filter(
    (c) => c._id !== "all" && c.category !== null
  );
  // Filter subcategories based on the selected product parent category
  const selectedParentCategory = categories.find(
    (cat) => cat._id === selectedParentId
  );

  // Brands for the selected parent category
  const availableBrands = selectedParentCategory?.subcategory || [];

  return (
    <>
      <button
        onClick={() => openModal("category")}
        className='bg-[#F5A623] hover:bg-[#e69914] text-white px-4 py-2 rounded-md transition-colors flex items-center'
      >
        <Plus size={16} className='mr-1' />
        Add category
      </button>

      <button
        onClick={() => openModal("subcategory")}
        className='bg-[#F5A623] hover:bg-[#e69914] text-white px-4 py-2 rounded-md transition-colors flex items-center'
      >
        <Plus size={16} className='mr-1' />
        Add sub category
      </button>

      <button
        onClick={() => openModal("product")}
        className='bg-[#F5A623] hover:bg-[#e69914] text-white px-4 py-2 rounded-md transition-colors flex items-center'
      >
        <Plus size={16} className='mr-1' />
        Add product
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Add ${modalType}`}
      >
        {modalType === "category" && (
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='categoryName'
                className='block text-sm font-medium text-gray-700'
              >
                Category Name
              </label>
              <input
                type='text'
                id='categoryName'
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border'
              />
            </div>

            <div className='flex justify-end space-x-2 pt-4'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50'
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!categoryName}
                className={`px-4 py-2 rounded-md text-white ${
                  categoryName
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-400 cursor-not-allowed"
                }`}
              >
                Add
              </button>
            </div>
          </div>
        )}

        {modalType === "subcategory" && (
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='parentCategory'
                className='block text-sm font-medium text-gray-700'
              >
                Parent Category
              </label>
              <select
                id='parentCategory'
                value={selectedParentId}
                onChange={(e) => setSelectedParentId(e.target.value)}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border'
              >
                <option value=''>Select parent category</option>
                {parentCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor='subcategoryName'
                className='block text-sm font-medium text-gray-700'
              >
                Subcategory Name
              </label>
              <input
                type='text'
                id='subcategoryName'
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border'
              />
            </div>

            <div className='flex justify-end space-x-2 pt-4'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50'
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!categoryName || !selectedParentId}
                className={`px-4 py-2 rounded-md text-white ${
                  categoryName && selectedParentId
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-400 cursor-not-allowed"
                }`}
              >
                Add
              </button>
            </div>
          </div>
        )}

        {modalType === "product" && (
          <div className='w-full'>
            {/* Title */}
            <div>
              <label
                htmlFor='productTitle'
                className='block text-sm font-medium text-gray-700'
              >
                Title :
              </label>
              <input
                type='text'
                id='productTitle'
                value={newProduct.title}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border'
              />
            </div>

            {/* Variants */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Variants :
              </label>
              {newProduct.variants.map((variant, index) => (
                <div key={index} className='flex items-center space-x-2 mt-2'>
                  <div className='flex items-center'>
                    <label className='text-sm text-gray-600 mr-1'>Ram:</label>
                    <input
                      type='text'
                      value={variant.ram}
                      onChange={(e) => {
                        const updatedVariants = [...newProduct.variants];
                        updatedVariants[index].ram = e.target.value;
                        setNewProduct({
                          ...newProduct,
                          variants: updatedVariants,
                        });
                      }}
                      className='w-20 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1'
                      placeholder='e.g. 8 GB'
                    />
                  </div>
                  <div className='flex items-center'>
                    <label className='text-sm text-gray-600 mr-1'>Price:</label>
                    <input
                      type='number'
                      value={variant.price}
                      onChange={(e) => {
                        const updatedVariants = [...newProduct.variants];
                        updatedVariants[index].price = e.target.value; // Keep as string for input
                        setNewProduct({
                          ...newProduct,
                          variants: updatedVariants,
                        });
                      }}
                      className='w-24 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1'
                      placeholder='$0.00'
                    />
                  </div>
                  <div className='flex items-center'>
                    <label className='text-sm text-gray-600 mr-1'>QTY:</label>
                    <input
                      title='Quantity'
                      type='number'
                      value={variant.qty}
                      onChange={(e) => {
                        const updatedVariants = [...newProduct.variants];
                        updatedVariants[index].qty =
                          parseInt(e.target.value) || 0;
                        setNewProduct({
                          ...newProduct,
                          variants: updatedVariants,
                        });
                      }}
                      className='w-16 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1'
                      min='0'
                    />
                  </div>
                </div>
              ))}
              {/* Add variants button - basic implementation */}
              <button
                onClick={() =>
                  setNewProduct({
                    ...newProduct,
                    variants: [
                      ...newProduct.variants,
                      { ram: "", price: "", qty: 1 },
                    ],
                  })
                }
                className='mt-2 px-3 py-1 bg-gray-700 text-white text-sm rounded-md hover:bg-gray-800 transition-colors'
              >
                Add variants
              </button>
            </div>

            {/* Sub category */}
            <div className='space-y-4'>
              {/* Parent Category Select */}
              <div>
                <label
                  htmlFor='productParentCategory'
                  className='block text-sm font-medium text-gray-700'
                >
                  Category :
                </label>
                <select
                  id='productParentCategory'
                  value={selectedParentId}
                  onChange={(e) => {
                    // Reset subcategory when parent category changes
                    setSelectedParentId(e.target.value);
                    setNewProduct({
                      ...newProduct,
                      subcategory: "",
                    });
                  }}
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border'
                >
                  <option value=''>Select category</option>
                  {/* Show only top-level categories */}
                  {parentCategories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Select (conditionally rendered) */}
              {selectedParentId && (
                <div>
                  <label
                    htmlFor='productSubCategory'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Sub category :
                  </label>
                  <select
                    id='productSubCategory'
                    value={newProduct.subcategory}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        subcategory: e.target.value,
                      })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border'
                  >
                    <option value=''>Select sub category</option>
                    {/* Show only subcategories of the selected parent */}
                    {availableBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand.charAt(0).toUpperCase() + brand.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor='productDescription'
                className='block text-sm font-medium text-gray-700'
              >
                Description :
              </label>
              <textarea
                id='productDescription'
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                rows={3}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border'
                placeholder='Enter product description...'
              ></textarea>
            </div>

            {/* Upload image - basic placeholder */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Upload image:
              </label>
              <div className='mt-1 flex items-center space-x-4'>
                {/* Display existing images or placeholders */}
                {newProduct.images.length > 0 ? (
                  newProduct.images.map((image, index) => (
                    <div
                      key={index}
                      className='h-20 w-20 border rounded-md flex items-center justify-center overflow-hidden'
                    >
                      {/* Replace with actual image preview */}
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Product image ${index + 1}`}
                        className='object-cover h-full w-full'
                      />
                    </div>
                  ))
                ) : (
                  <>
                    {/* Placeholder images from the screenshot */}
                    <div className='h-20 w-20 border rounded-md flex items-center justify-center overflow-hidden'>
                      <img
                        src='/product-placeholder.png'
                        alt='Placeholder 1'
                        className='object-cover h-full w-full'
                      />
                    </div>
                    <div className='h-20 w-20 border rounded-md flex items-center justify-center overflow-hidden'>
                      <img
                        src='/product-placeholder.png'
                        alt='Placeholder 2'
                        className='object-cover h-full w-full'
                      />
                    </div>
                  </>
                )}
                {/* Upload button/area */}
                <label
                  htmlFor='imageUpload'
                  className='cursor-pointer h-20 w-20 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors'
                >
                  <Plus size={24} />
                  <span className='text-xs mt-1'>Upload</span>
                  <input
                    id='imageUpload'
                    type='file'
                    className='sr-only'
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        // For simplicity, just add the first selected file
                        setNewProduct({
                          ...newProduct,
                          images: [...newProduct.images, e.target.files[0]],
                        });
                      }
                    }}
                    accept='image/*'
                  />
                </label>
              </div>
            </div>

            <div className='flex justify-end space-x-2 pt-4'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50'
              >
                Discard
              </button>
              <button
                onClick={handleSubmit}
                disabled={
                  !newProduct.title ||
                  !newProduct.subcategory ||
                  newProduct.variants.some(
                    (v) => !v.ram || !v.price || v.qty <= 0
                  ) ||
                  newProduct.images.length === 0 // Require at least one image
                }
                className={`px-4 py-2 rounded-md text-white ${
                  newProduct.title &&
                  newProduct.subcategory &&
                  !newProduct.variants.some(
                    (v) => !v.ram || !v.price || v.qty <= 0
                  ) &&
                  newProduct.images.length > 0
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-400 cursor-not-allowed"
                }`}
              >
                ADD
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ActionButtons;
