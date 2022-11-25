import { createContext, useContext, useMemo, useState } from "react";
import axios from "axios";

export const IPFSGatewayContext = createContext(null);

export const useIPFSGatewayContext = () => {
  return useContext(IPFSGatewayContext);
};

const defaultRequestMetadata = {
  name: "Title of the request",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the1500s, when an unknown printer took a galley of type and scrambled it tomake a type specimen book. It has survived not only five centuries, butalso the leap into electronic typesetting, remaining essentiallyunchanged. It was popularised in the 1960s with the release of Letrasetsheets containing Lorem Ipsum passages, and more recently with desktoppublishing software like Aldus PageMaker including versions of LoremIpsum."
};

export default function IPFSGatewayProvider({ children }) {
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
    {
      name: "Starton API",
      fetch: async (cid) =>
        await fetch("https://ipfs.eu.starton.io/ipfs/" + cid).then(
          async (file) => file.json()
        )
    }
  ]);
  const [ipfsUploadGateways] = useState([
    {
      name: "Starton API",
      upload: async (file) =>
        (await axios.post("http://localhost:8080/ipfs/starton", { file })).data.cid
    },
    {
      name: "Infura",
      upload: async (file) =>
        (await axios.post("http://localhost:8080/ipfs/infura", { file })).data.cid
    }
  ]);
  const [selectedGatewayIndex, setSelectedGatewayIndex] = useState(0);
  const [selectedUploadGatewayIndex, setSelectedUploadGatewayIndex] =
    useState(0);

  const ipfsGateway = useMemo(
    () => ipfsGateways[selectedGatewayIndex],
    [selectedGatewayIndex]
  );

  const ipfsUploadGateway = useMemo(
    () => ipfsUploadGateways[selectedUploadGatewayIndex],
    [selectedUploadGatewayIndex]
  );

  return (
    <IPFSGatewayContext.Provider
      value={{
        ipfsGateway,
        ipfsUploadGateway,
        ipfsGatewaySelector: ipfsGateways.map(({ name }, index) => (
          <button
            className={index !== selectedGatewayIndex && "unselected"}
            key={index}
            onClick={() => setSelectedGatewayIndex(index)}
          >
            {name}
          </button>
        )),
        ipfsUploadGatewaySelector: ipfsUploadGateways.map(({ name }, index) => (
          <button
            className={index !== selectedUploadGatewayIndex && "unselected"}
            key={index}
            onClick={() => setSelectedUploadGatewayIndex(index)}
          >
            {name}
          </button>
        ))
      }}
    >
      {children}
    </IPFSGatewayContext.Provider>
  );
}
