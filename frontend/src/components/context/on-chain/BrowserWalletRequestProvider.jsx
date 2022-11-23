import { createContext, useContext, useEffect, useState } from "react";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";
import { RequestSourceContext } from "./RequestSourceContext";

export function BrowserWalletRequestProvider({ children }) {
  const { address, instance, getAllRequestIds } = useRequestBountyContract();
  const [requestIds, setRequestIds] = useState();
  const [requestCids, setRequestCids] = useState();

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

  useEffect(() => {
    async function fetchRequestCIDs() {
      setRequestCids(
        await Promise.all(
          requestIds.map(async (id) => {
            const uri = await instance.requestURI(id);
            console.log("uri", uri);
            return uri.substring("ipfs://".length);
          })
        )
      );
    }
    requestIds && fetchRequestCIDs();
    requestIds === null && setRequestCids(null);
  }, [requestIds]);

  return (
    <RequestSourceContext.Provider value={{ requestIds, requestCids }}>
      {children}
    </RequestSourceContext.Provider>
  );
}
