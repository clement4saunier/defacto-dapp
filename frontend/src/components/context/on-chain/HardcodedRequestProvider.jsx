import { createContext, useContext, useEffect, useState } from "react";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";
import { RequestSourceContext } from "./RequestSourceContext";

export function HardcodedRequestProvider({ children }) {
  return (
    <RequestSourceContext.Provider value={{requestIds: [0, 1, 2]}}>
      {children}
    </RequestSourceContext.Provider>
  );
}
