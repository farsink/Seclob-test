import axiosConfig, { baseUrl } from "./AxiosConfig";

export const getwishlist = async (userId: string) => {
  try {
    const response = await axiosConfig({
      method: "GET",
      url: `${baseUrl}api/wishlist/all/${userId}`,
    });
    return response;
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    throw err;
  }
};

export const addToWishlist = async (
  userId: string,
  productId: string,
  name: string,
  price: number,
  image: string
) => {
  try {
    const response = await axiosConfig({
      method: "POST",
      url: `${baseUrl}api/wishlist/add`,
      data: { userId, productId, name, price, image },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const removeFromWishlist = async (userId: string, productId: string) => {
  try {
    const response = await axiosConfig({
      method: "DELETE",
      url: `${baseUrl}api/wishlist/remove`,
      data: { userId, productId },
    });
    return response;
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    throw err;
  }
};
