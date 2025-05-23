/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, Method } from "axios";

export const baseUrl = "http://localhost:5000/";
interface ApiConfigParams {
  method: Method;
  url: string;
  headers?: Record<string, string>;
  data?: any; // Changed from body to data as it's the standard Axios property name
}

const axiosConfig = async ({
  method,
  url,
  headers,
  data,
}: ApiConfigParams): Promise<AxiosResponse<any>> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
    data,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error("API call error:", error);
    throw error; // Re-throw the error or handle it as needed
  }
};

export default axiosConfig;
