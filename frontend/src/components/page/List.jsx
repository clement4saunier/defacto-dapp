import React, { useMemo } from "react";
import { useState } from "react";
import RequestList from "../content/RequestList";
import { BrowserWalletRequestProvider } from "../context/on-chain/BrowserWalletRequestProvider";
import { HardcodedRequestProvider } from "../context/on-chain/HardcodedRequestProvider";
import { NodeRealRequestProvider } from "../context/on-chain/NodeRealRequestProvider";
import { StartonRequestProvider } from "../context/on-chain/StartonRequestProvider";
import useRequestBountyContract from "../hooks/useRequestBountyContract";

const defaultRequestMetadata = {
  name: "Title of the request",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the1500s, when an unknown printer took a galley of type and scrambled it tomake a type specimen book. It has survived not only five centuries, butalso the leap into electronic typesetting, remaining essentiallyunchanged. It was popularised in the 1960s with the release of Letrasetsheets containing Lorem Ipsum passages, and more recently with desktoppublishing software like Aldus PageMaker including versions of LoremIpsum."
};

export default function List() {
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
    {
      name: "Hardcoded Set",
      requestProvider: <HardcodedRequestProvider />
    }
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
    <>
      <h1>A là une</h1>
      <p>The most recent open bounties</p>
      <h4>On-chain source</h4>
      {sources.map(({ name }, index) => (
        <button
          className={index !== selectedSourceIndex && "unselected"}
          key={index}
          onClick={() => setSelectedSourceIndex(index)}
        >
          {name}
        </button>
      ))}
      <h4>IPFS gateway</h4>
      {ipfsGateways.map(({ name }, index) => (
        <button
          className={index !== selectedGatewayIndex && "unselected"}
          key={index}
          onClick={() => setSelectedGatewayIndex(index)}
        >
          {name}
        </button>
      ))}
      <br />
      <br />
      {React.cloneElement(source.requestProvider, {
        children: <RequestList fetchCid={ipfsGateway.fetch} />
      })}
    </>
  );
}
