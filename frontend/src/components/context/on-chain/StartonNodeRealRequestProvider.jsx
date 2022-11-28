import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";
import { RequestSourceContext } from "./RequestSourceContext";
import { useWeb3Context } from "../Web3Provider";
import contracts from "../../../contracts/deployed.json";

export function StartonNodeRealRequestProvider({ children, onlyId }) {
  const { provider, chainId } = useWeb3Context();
  const [requestIds, setRequestIds] = useState(); // hook pour recuperer les request Ids
  const [requestCids, setRequestCids] = useState(); // hook pour recuperer les cid
  const [requestChainData, setRequestChainData] = useState(); // ?

  const [responseIds, setResponseIds] = useState();
  const [responseChainData, setResponseChainData] = useState();

  const chain = useMemo(() => (chainId === undefined ? 5 : chainId), [chainId]);
  const address = useMemo(
    () => (contracts.chain[chain] ? contracts.chain[chain].requests : null),
    [chain, contracts]
  );

  const endpoint = (ressource) =>
    `http://localhost:8080/${ressource}/starton-nodereal`;

  useEffect(() => {
    if (onlyId) {
      setRequestIds([onlyId]);
      setTimeout(async () => {
        try {
          const res = await fetch(
            `${endpoint("responses")}/${chain}/${address}/${onlyId}`
          ).then(async (r) => r.json());
          console.log("resr", res.responses);
          setResponseIds(res.responses);
        } catch (err) {
          console.log("Couldn't retrieve response ids", err);
          setResponseIds(null);
        }
      }, 1);
      return;
    }
    if (!address) return;

    setRequestIds(undefined);
    setTimeout(async () => {
      try {
        const res = await fetch(
          `${endpoint("requests")}/${chain}/${address}`
        ).then(async (r) => r.json());
        setRequestIds(res.requests);
      } catch (err) {
        console.log("Couldn't retrieve response ids", err);
        setRequestIds(null);
      }
    }, 100);
  }, [address, onlyId, chainId]);

  const fetchRequestChainData = async (id) => {
    const res = await fetch(
      `${endpoint("request")}/${chain}/${address}/${id}`
    ).then(async (r) => r.json());

    console.log(
      "request",
      `${endpoint("request")}/${chain}/${address}/${id}`,
      res
    );
    const { owner, token, amount, deadline, cid, delegate, symbol } =
      res.details;
    let origin;
    let hash;

    const fetchTxn = async () => {
      const txn = await fetch(
        `${endpoint("request-tx")}/${chain}/${address}/${id}`
      ).then(async (r) => r.json());
      const {
        txn: { txHash, timestamp }
      } = txn;
      hash = txHash;
      origin = timestamp;
    };

    try {
      await fetchTxn();
    } catch (err) {
      console.error("Could not load txn", err);
    }

    return {
      cid,
      owner,
      token,
      amount,
      origin,
      hash,
      deadline,
      id,
      symbol,
      address,
      delegate
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
            const { details } = await fetch(
              `${endpoint(
                "response"
              )}/${chain}/${address}/${onlyId}/${responseId}`
            ).then(async (r) => r.json());

            const { owner, cid } = details;

            return { sender: owner, cid, id: responseId, origin: 0 };
          })
        )
      );
    }

    onlyId && responseIds && fetchAllResponseChainData();
  }, [onlyId, responseIds]);

  return (
    <RequestSourceContext.Provider
      value={{
        requestIds: requestIds,
        requestCids: null,
        requestChainData: requestChainData,
        responseIds,
        responseChainData
      }}
    >
      {children}
    </RequestSourceContext.Provider>
  );
}
