import { createContext, useContext, useEffect, useState } from "react";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";
import { RequestSourceContext } from "./RequestSourceContext";

export function NodeRealRequestProvider({ children }) {
  return (
    <RequestSourceContext.Provider value={{requestIds: null}}>
      {children}
    </RequestSourceContext.Provider>
  );
}
