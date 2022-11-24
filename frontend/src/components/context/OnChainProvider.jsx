import { createContext, useContext, useMemo, useState } from "react";
import { BrowserWalletRequestProvider } from "../context/on-chain/BrowserWalletRequestProvider";
import { HardcodedRequestProvider } from "../context/on-chain/HardcodedRequestProvider";
import { NodeRealRequestProvider } from "../context/on-chain/NodeRealRequestProvider";
import { StartonRequestProvider } from "../context/on-chain/StartonRequestProvider";

export const OnChainContext = createContext(null);

export const useOnChainContext = () => {
  return useContext(OnChainContext);
};

const defaultRequestMetadata = {
  name: "Title of the request",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the1500s, when an unknown printer took a galley of type and scrambled it tomake a type specimen book. It has survived not only five centuries, butalso the leap into electronic typesetting, remaining essentiallyunchanged. It was popularised in the 1960s with the release of Letrasetsheets containing Lorem Ipsum passages, and more recently with desktoppublishing software like Aldus PageMaker including versions of LoremIpsum."
};

export default function OnChainProvider({ children }) {
  const [sources] = useState([
    {
      name: "Wallet",
      requestProvider: <BrowserWalletRequestProvider />
    },
    {
      name: "Starton API",
      requestProvider: <StartonRequestProvider />
    },
    {
      name: "NodeReal API",
      requestProvider: <NodeRealRequestProvider />
    },
  ]);

  const [ipfsGateways] = useState([
    {
      name: "Ipfs.io",
      fetch: async (cid) =>
        await fetch("https://ipfs.io/ipfs/" + cid).then(async (file) =>
          file.json()
        )
    },
    {
      name: "Ipns.co",
      fetch: async (cid) =>
        await fetch("https://ipns.co/ipfs/" + cid).then(async (file) =>
          file.json()
        )
    },
    { name: "Starton API", fetch: async (cid) => defaultRequestMetadata },
    { name: "Censored Gateway", fetch: async (cid) => defaultRequestMetadata },
    { name: "Hardcoded Gateway", fetch: async (cid) => defaultRequestMetadata }
  ]);

  const [selectedSourceIndex, setSelectedSourceIndex] = useState(0);
  const [selectedGatewayIndex, setSelectedGatewayIndex] = useState(0);

  const source = useMemo(
    () => sources[selectedSourceIndex],
    [selectedSourceIndex]
  );
  const ipfsGateway = useMemo(
    () => ipfsGateways[selectedGatewayIndex],
    [selectedGatewayIndex]
  );

  return (
    <OnChainContext.Provider
      value={{
        source,
        sourceSelector: sources.map(({ name }, index) => (
          <button
            className={index !== selectedSourceIndex && "unselected"}
            key={index}
            onClick={() => setSelectedSourceIndex(index)}
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
