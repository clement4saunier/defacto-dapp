import { createContext, useContext, useEffect, useMemo, useState } from "react";
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
      name: "Starton",
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

  const localStorageGatewayKey = "ipfsGatewayProvider";
  const localStorageUploadKey = "ipfsUploadGatewayProvider";

  function applyStoredGatewayProvider() {
    const stored = window.localStorage.getItem(localStorageGatewayKey);

    if (!stored || stored === "") return;
    const provider = ipfsGateways.find(({ name }) => stored === name);

    provider && setSelectedGatewayIndex(ipfsGateways.indexOf(provider));
  }

  function applyStoredUploadProvider() {
    const stored = window.localStorage.getItem(localStorageUploadKey);

    if (!stored || stored === "") return;
    const provider = ipfsUploadGateways.find(({ name }) => stored === name);

    provider && setSelectedUploadGatewayIndex(ipfsUploadGateways.indexOf(provider));
  }

  function setAndStoreGatewayProvider(index) {
    const provider = ipfsGateways[index];

    if (!provider) return;
    setSelectedGatewayIndex(index);
    window.localStorage.setItem(localStorageGatewayKey, provider.name);
  }

  function setAndStoreUploadProvider(index) {
    const provider = ipfsUploadGateways[index];

    console.log("setAndStore", provider);
    if (!provider) return;
    setSelectedUploadGatewayIndex(index);
    window.localStorage.setItem(localStorageUploadKey, provider.name);
  }

  useEffect(() => {
    applyStoredGatewayProvider();
    applyStoredUploadProvider();
  }, []);

  return (
    <IPFSGatewayContext.Provider
      value={{
        ipfsGateway,
        ipfsUploadGateway,
        ipfsGatewaySelector: ipfsGateways.map(({ name }, index) => (
          <button
            className={index !== selectedGatewayIndex && "unselected"}
            key={index}
            onClick={() => setAndStoreGatewayProvider(index)}
          >
            {name}
          </button>
        )),
        ipfsUploadGatewaySelector: ipfsUploadGateways.map(({ name }, index) => (
          <button
            className={index !== selectedUploadGatewayIndex && "unselected"}
            key={index}
            onClick={() => setAndStoreUploadProvider(index)}
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
