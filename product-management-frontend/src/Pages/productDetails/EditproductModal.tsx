import { Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { Product, Category } from "../../types";
import { deleteProduct, updateproduct } from "../../api/Productapi";
import { useNavigate } from "react-router-dom";

interface EditproductModalProps {
  product: Product;
  categories: Category[];
  onEdit: () => void;
  onClose: () => void;
}

const EditproductModal: React.FC<EditproductModalProps> = ({
  product,
  categories,
  onEdit,
  onClose,
}) => {
  const navigate = useNavigate();
  // Find parent category id for the current product
  const initialParentId =
    categories.find((cat) => cat.subcategory?.includes(product.subcategory))
      ?._id || "";

  const [selectedParentId, setSelectedParentId] = useState(initialParentId);

  // Brands/subcategories for the selected parent category
  const availableBrands =
    categories.find((cat) => cat._id === selectedParentId)?.subcategory || [];

  const [newProduct, setNewProduct] = useState({
    title: product.name || "",
    subcategory: product.subcategory || "",
    description: product.description || "",
    variants: product.variants
      ? product.variants.map((v) => ({
          ram: v.ram || "",
          price: v.price?.toString() || "",
          qty: v.stockQuantity || 1,
        }))
      : [{ ram: "", price: "", qty: 1 }],
    images: product.images ? [...product.images] : [],
    rating: product.rating || 5,
  });

  // If product changes (shouldn't happen, but for safety)
  useEffect(() => {
    setNewProduct({
      title: product.name || "",
      subcategory: product.subcategory || "",
      description: product.description || "",
      variants: product.variants
        ? product.variants.map((v) => ({
            ram: v.ram || "",
            price: v.price?.toString() || "",
            qty: v.stockQuantity || 1,
          }))
        : [{ ram: "", price: "", qty: 1 }],
      images: product.images ? [...product.images] : [],
      rating: product.rating || 5,
    });
    setSelectedParentId(
      categories.find((cat) => cat.subcategory?.includes(product.subcategory))
        ?._id || ""
    );
    // eslint-disable-next-line
  }, [product]);

  // Remove image handler
  const handleRemoveImage = (idx: number) => {
    setNewProduct({
      ...newProduct,
      images: newProduct.images.filter((_, i) => i !== idx),
    });
  };

  // Save handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // Compose updated product object

    // Compose FormData for updated product
    const formData = new FormData();
    const productid = product._id;
    formData.append("name", newProduct.title);
    formData.append("description", newProduct.description);
    formData.append("category", product.category);
    formData.append(
      "price",
      product.variants && product.variants.length > 0
        ? product.variants[0].price?.toString() || "0"
        : "0"
    );
    formData.append("subcategory", newProduct.subcategory);
    formData.append("rating", newProduct.rating.toString());

    // Images (handle both File and string URLs)
    newProduct.images.forEach((img) => {
      if (img instanceof File) {
        formData.append("images", img);
      } else if (typeof img === "string") {
        formData.append("existingImages", img); // Use a different key for existing URLs
      }
    });

    // Variants
    newProduct.variants.forEach((v, idx) => {
      formData.append(`variants[${idx}][ram]`, v.ram);
      formData.append(`variants[${idx}][price]`, v.price.toString());
      formData.append(`variants[${idx}][stockQuantity]`, v.qty.toString());
    });

    for (const entry of formData.entries()) {
      console.log(entry);
    }
    // Append product ID to update the existing product
    try {
      const response = await updateproduct(formData, productid as string);
      console.log("Product updated successfully:", response);
      // <-- API call with FormData
      onEdit();
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Filter top-level categories for parent selection
  const parentCategories = categories.filter(
    (c) => c._id !== "all" && c.category !== null
  );

  // Delete product handler
  const handleDelete = async () => {
    try {
      const response = await deleteProduct(product._id as string);
      console.log("Product deleted successfully:", response);
      navigate("/home");
      onEdit();
      onClose();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <form onSubmit={handleSave}>
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
                    updatedVariants[index].price = e.target.value;
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
                    updatedVariants[index].qty = parseInt(e.target.value) || 0;
                    setNewProduct({
                      ...newProduct,
                      variants: updatedVariants,
                    });
                  }}
                  className='w-16 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1'
                  min='0'
                />
              </div>
              {newProduct.variants.length > 1 && (
                <button
                  type='button'
                  className='ml-2 text-red-500 hover:text-red-700'
                  onClick={() => {
                    setNewProduct({
                      ...newProduct,
                      variants: newProduct.variants.filter(
                        (_, i) => i !== index
                      ),
                    });
                  }}
                  title='Remove variant'
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
          <button
            type='button'
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

        {/* Category & Subcategory */}
        <div className='space-y-4 mt-2'>
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
                setSelectedParentId(e.target.value);
                setNewProduct({
                  ...newProduct,
                  subcategory: "",
                });
              }}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border'
            >
              <option value=''>Select category</option>
              {parentCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>
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
        <div className='mt-2'>
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

        {/* Upload image */}
        <div className='mt-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Upload image:
          </label>
          <div className='mt-1 flex items-center space-x-4 flex-wrap'>
            {newProduct.images.length > 0 &&
              newProduct.images.map((image, index) => (
                <div
                  key={index}
                  className='relative h-20 w-20 border rounded-md flex items-center justify-center overflow-hidden'
                >
                  <img
                    src={image ? (image as string) : ""}
                    alt={`Product image ${index + 1}`}
                    crossOrigin='anonymous'
                    className='object-cover h-full w-full'
                  />
                  <button
                    type='button'
                    className='absolute top-0 right-0 bg-white bg-opacity-80 rounded-bl px-1 py-0.5 text-xs text-red-600'
                    onClick={() => handleRemoveImage(index)}
                    title='Remove image'
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
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
            type='button'
            onClick={onClose}
            className='px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50'
          >
            Discard
          </button>
          <button
            type='button'
            onClick={handleDelete}
            className='px-4 py-2 border rounded-md text-red-700 hover:bg-red-50'
          >
            Delete
          </button>

          <button
            type='submit'
            disabled={
              !newProduct.title ||
              !newProduct.subcategory ||
              newProduct.variants.some(
                (v) => !v.ram || !v.price || v.qty <= 0
              ) ||
              newProduct.images.length === 0
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
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditproductModal;
