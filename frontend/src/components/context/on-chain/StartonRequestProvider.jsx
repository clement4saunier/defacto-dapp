import { createContext, useContext, useEffect, useState } from "react";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";
import { RequestSourceContext } from "./RequestSourceContext";

export function StartonRequestProvider({ children }) {
  return (
    <RequestSourceContext.Provider value={{requestIds: null, requestCids: null, requestChainData: null}}>
      {children}
    </RequestSourceContext.Provider>
  );
}
