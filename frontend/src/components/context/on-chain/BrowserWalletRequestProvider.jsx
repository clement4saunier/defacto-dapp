import { createContext, useContext, useEffect, useState } from "react";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";
import { RequestSourceContext } from "./RequestSourceContext";
import erc20Abi from "../../../contracts/abi/erc20.json";
import { useWeb3Context } from "../Web3Provider";
import { Contract } from "ethers";

export function BrowserWalletRequestProvider({ children, onlyId }) {
  const { address, instance, getAllRequestIds } = useRequestBountyContract();
  const { provider } = useWeb3Context();
  const [requestIds, setRequestIds] = useState();
  const [requestCids, setRequestCids] = useState();
  const [requestChainData, setRequestChainData] = useState();

  useEffect(() => {
    if (onlyId) {
      setRequestIds([{_hex: onlyId, _isBigNumber: true}]);
      return;
    }
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
  }, [address, instance, onlyId]);

  const fetchRequestChainData = async (id) => {
    const { owner, token, amount, deadline, content } = await instance.request(
      id
    );
    const symbol = await new Contract(token, erc20Abi, provider).symbol();

    return {
      cid: content,
      owner,
      token,
      amount,
      deadline,
      id,
      symbol,
      address
    };
  };

  useEffect(() => {
    async function fetchAllRequestChainData() {
      setRequestChainData(
        await Promise.all(requestIds.map(fetchRequestChainData))
      );
    }
    requestIds && fetchAllRequestChainData();
    requestIds === null && setRequestChainData(null);
  }, [requestIds]);

  async function getRequestChainData(requestId) {
    const loaded =
      requestChainData && requestChainData.find(({ id }) => id === requestId);

    if (!loaded) return await fetchRequestChainData(requestId);
    return loaded;
  }

  return (
    <RequestSourceContext.Provider
      value={{ requestIds, requestCids, requestChainData, getRequestChainData }}
    >
      {children}
    </RequestSourceContext.Provider>
  );
}
