import { createContext, useContext, useEffect, useState } from "react";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";
import { RequestSourceContext } from "./RequestSourceContext";
import erc20Abi from "../../../contracts/abi/erc20.json";
import { useWeb3Context } from "../Web3Provider";
import { Contract } from "ethers";

export function BrowserWalletRequestProvider({ children, onlyId }) {
  const { address, instance, getAllRequestIds, getAllResponseIds, getRequestTxn } =
    useRequestBountyContract();
  const { provider } = useWeb3Context();

  const [requestIds, setRequestIds] = useState();
  const [requestCids, setRequestCids] = useState();
  const [requestChainData, setRequestChainData] = useState();

  const [responseIds, setResponseIds] = useState();
  const [responseChainData, setResponseChainData] = useState();

  useEffect(() => {
    if (onlyId) {
      setRequestIds([{ _hex: onlyId, _isBigNumber: true }]);
      setTimeout(async () => {
        try {
          const ids = await getAllResponseIds(onlyId);
          setResponseIds(ids);
        } catch (err) {
          console.log("Couldn't retrieve response ids", err);
          setResponseIds(null);
        }
      }, 1);
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
    const txn = await getRequestTxn(id._isBigNumber ? id._hex : id);
    const symbol = await new Contract(token, erc20Abi, provider).symbol();

    return {
      cid: content,
      owner,
      token,
      amount,
      origin: (await txn[0].getBlock()).timestamp,
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

  useEffect(() => {
    async function fetchAllResponseChainData() {
      setResponseChainData(
        await Promise.all(
          responseIds.map(async (responseId) => {
            const { sender, content: cid } = await instance.response(
              onlyId,
              responseId
            );
            const txn = await getRequestTxn(onlyId, responseId);


            return { sender, cid, id: responseId, origin: (await txn[0].getBlock()).timestamp,};
          })
        )
      );
    }

    onlyId && responseIds && fetchAllResponseChainData();
  }, [onlyId, responseIds]);

  async function getRequestChainData(requestId) {
    const loaded =
      requestChainData && requestChainData.find(({ id }) => id === requestId);

    if (!loaded) return await fetchRequestChainData(requestId);
    return loaded;
  }

  return (
    <RequestSourceContext.Provider
      value={{
        requestIds,
        requestCids,
        requestChainData,
        getRequestChainData,
        responseChainData
      }}
    >
      {children}
    </RequestSourceContext.Provider>
  );
}
