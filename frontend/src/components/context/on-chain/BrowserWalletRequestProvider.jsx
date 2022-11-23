import { createContext, useContext, useEffect, useState } from "react";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";
import { RequestSourceContext } from "./RequestSourceContext";

export function BrowserWalletRequestProvider({ children }) {
  const { address, instance, getAllRequestIds } = useRequestBountyContract();
  const [requestIds, setRequestIds] = useState();

  useEffect(() => {
    if (!address || !instance) return;

    setRequestIds(undefined);
    setTimeout(async () => {
      try {
        const ids = await getAllRequestIds();
        setRequestIds(ids);
      } catch (err) {
        console.log("Couldn't retrieve requests ids", err);
        setRequestIds(null);
      }
    }, 100);
  }, [address, instance]);

  return (
    <RequestSourceContext.Provider value={{requestIds}}>
      {children}
    </RequestSourceContext.Provider>
  );
}
