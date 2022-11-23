import { createContext, useContext, useEffect, useState } from "react";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";
import { RequestSourceContext } from "./RequestSourceContext";
import erc20Abi from "../../../contracts/abi/erc20.json";
import { useWeb3Context } from "../Web3Provider";
import { Contract } from "ethers";

export function BrowserWalletRequestProvider({ children }) {
  const { address, instance, getAllRequestIds } = useRequestBountyContract();
  const {provider} = useWeb3Context();
  const [requestIds, setRequestIds] = useState();
  const [requestCids, setRequestCids] = useState();
  const [requestChainData, setRequestChainData] = useState();

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
    async function fetchRequestChainData() {
        setRequestChainData(
        await Promise.all(
          requestIds.map(async (id) => {
            const {owner, token, amount, deadline, content } = await instance.request(id);
            const symbol = await new Contract(token, erc20Abi, provider).symbol();

            return {cid: content, owner, token, amount, deadline, id, symbol, address};
          })
        )
      );
    }
    requestIds && fetchRequestChainData();
    requestIds === null && setRequestChainData(null);
  }, [requestIds]);

  return (
    <RequestSourceContext.Provider value={{ requestIds, requestCids, requestChainData }}>
      {children}
    </RequestSourceContext.Provider>
  );
}
