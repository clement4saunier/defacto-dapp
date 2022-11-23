import { createContext } from "react";
import { useContext } from "react";

export const RequestSourceContext = createContext(null);

export const useRequestSourceContext = () => {
  return useContext(RequestSourceContext);
};