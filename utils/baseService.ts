import axios, { AxiosRequestConfig } from "axios";
import { clearCookie, getValueFromCookie } from "./cookie";
import { ROUTES } from "@/constants/routes";
import { TOKEN_KEY } from "@/constants/common";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  withAuthToken?: boolean;
}

const Axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
});

Axios.interceptors.request.use((config: any) => {
  const useToken = config?.withAuthToken ?? true;
  const token = getValueFromCookie(TOKEN_KEY) || config?.tokenValue;
  const headers = config.headers;
  return {
    ...config,
    headers: {
      ...headers,
      Authorization: useToken && token && `Bearer ${token}`,
    },
  };
});

Axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error?.request?.message === "Unauthorized") {
      clearCookie();
      if (window) window.location.href = ROUTES.LOGIN;
    }
    // eslint-disable-next-line no-undef
    return Promise.reject(error);
  }
);

export default Axios;
