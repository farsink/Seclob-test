import axiosConfig, { baseUrl } from "./AxiosConfig";

export const getProducts = async () => {
  try {
    const response = await axiosConfig({
      method: "GET",
      url: baseUrl + "api/products/all",
    });
    return response;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

export const addProduct = async (product: FormData) => {
  try {
    const response = await axiosConfig({
      method: "POST",
      url: baseUrl + "api/products/add",
      data: product,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (err) {
    console.error("Error adding product:", err);
    throw err;
  }
};

export const updateproduct = async (product: FormData, id: string) => {
  try {
    const response = await axiosConfig({
      method: "PUT",
      url: baseUrl + "api/products/update/" + id,
      data: product,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (err) {
    console.error("Error updating product:", err);
    throw err;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axiosConfig({
      method: "DELETE",
      url: baseUrl + "api/products/delete/" + id,
    });
    return response;
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
};