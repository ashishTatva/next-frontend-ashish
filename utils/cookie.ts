import { TOKEN_KEY } from "@/constants/common";
import Cookies from "js-cookie";

export const getValueFromCookie = (key: string) => {
  return Cookies.get(key);
};

export const setValueInCookie = (key: string, value: string) => {
  return Cookies.set(key, value);
};

export const clearCookie = () => {
  Cookies.remove(TOKEN_KEY);
};
