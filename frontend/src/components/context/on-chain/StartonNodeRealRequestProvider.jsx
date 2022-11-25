import { createContext, useContext, useEffect, useState } from "react";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";
import { RequestSourceContext } from "./RequestSourceContext";
import { useWeb3Context } from "../Web3Provider";


export function StartonNodeRealRequestProvider({ children, onlyId }) { 
  const { provider, chainId } = useWeb3Context();
  const [requestIds, setRequestIds] = useState(); // hook pour recuperer les request Ids
  const [requestCids, setRequestCids] = useState(); // hook pour recuperer les cid
  const [requestChainData, setRequestChainData] = useState(); // ?

  const [responseIds, setResponseIds] = useState();
  const [responseChainData, setResponseChainData] = useState();

  return (
    <RequestSourceContext.Provider value={{
      requestIds: null,
      requestCids: null,
      requestChainData: null
    }}>
      {children}
    </RequestSourceContext.Provider>
  );
}
