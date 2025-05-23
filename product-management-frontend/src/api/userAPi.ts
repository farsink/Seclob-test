/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosConfig, { baseUrl } from "./AxiosConfig";

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosConfig({
      method: "POST",
      url: baseUrl + "api/auth/login",
      data: {
        email,
        password,
      },
    });
    return response;
  } catch (error) {
    return (error as any).response;
  }
};

export const register = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const response = await axiosConfig({
      method: "POST",
      url: baseUrl + "api/auth/register",
      data: {
        email,
        password,
        name,
      },
    });
    return response;
  } catch (error) {
    return (error as any).response;
  }
};
