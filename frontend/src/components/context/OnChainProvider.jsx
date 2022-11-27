import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BrowserWalletRequestProvider } from "../context/on-chain/BrowserWalletRequestProvider";
import { HardcodedRequestProvider } from "../context/on-chain/HardcodedRequestProvider";
// import { NodeRealRequestProvider } from "../context/on-chain/NodeRealRequestProvider";
import { StartonNodeRealRequestProvider } from "../context/on-chain/StartonNodeRealRequestProvider";

export const OnChainContext = createContext(null);

export const useOnChainContext = () => {
  return useContext(OnChainContext);
};

export default function OnChainProvider({ children }) {
  const [sources] = useState([
    {
      name: "Wallet RPC",
      requestProvider: <BrowserWalletRequestProvider />
    },
    {
      name: "Starton x NodeReal",
      requestProvider: <StartonNodeRealRequestProvider />
    }
  ]);

  const [selectedSourceIndex, setSelectedSourceIndex] = useState(0);

  const source = useMemo(
    () => sources[selectedSourceIndex],
    [selectedSourceIndex]
  );

  const localStorageKey = "onChainProvider";

  function applyStoredProvider() {
    const stored = window.localStorage.getItem(localStorageKey);

    if (!stored || stored === "") return;
    const provider = sources.find(({ name }) => stored === name);

    provider && setSelectedSourceIndex(sources.indexOf(provider));
  }

  function setAndStoreProvider(index) {
    const provider = sources[index];

    if (!provider) return;
    setSelectedSourceIndex(index);
    window.localStorage.setItem(localStorageKey, provider.name);
  }

  useEffect(() => {
    applyStoredProvider();
  }, []);

  return (
    <OnChainContext.Provider
      value={{
        source,
        sourceSelector: sources.map(({ name }, index) => (
          <button
            className={index !== selectedSourceIndex && "unselected"}
            key={index}
            onClick={() => setAndStoreProvider(index)}
          >
            {name}
          </button>
        ))
      }}
    >
      {children}
    </OnChainContext.Provider>
  );
}
