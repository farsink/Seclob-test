import axiosConfig, { baseUrl } from "./AxiosConfig";

export const getCategories = async () => {
  try {
    const response = await axiosConfig({
      method: "GET",
      url: baseUrl + "api/categories/all",
    });

    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const addcategory = async (category: string) => {
  try {
    const response = await axiosConfig({
      method: "POST",
      url: baseUrl + "api/categories/add",
      data: {
        category,
      },
    });

    return response;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const updateCategory = async (
  categoryId: string,
  subcategory: string
) => {
  try {
    const response = await axiosConfig({
      method: "PUT",
      url: baseUrl + `api/categories/update/${categoryId}`,
      data: {
        subcategory,
      },
    });

    return response;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};
