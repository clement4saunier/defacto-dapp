import { createContext, useContext, useMemo, useState } from "react";
import { create } from "ipfs-http-client";
import {Buffer} from 'buffer';
import axios from 'axios'

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
    { name: "Starton API",
    fetch: async (cid) =>
        await fetch("https://ipfs.eu.starton.io/ipfs/" + cid).then(async (file) =>
          file.json()
        )
      },
    { name: "Censored Gateway", fetch: async (cid) => defaultRequestMetadata },
    { name: "Hardcoded Gateway", fetch: async (cid) => defaultRequestMetadata }
  ]);
  const [ipfsUploadGateways] = useState([
    {
      name: "Starton API",
      upload: async (file) => (await axios.post('http://localhost:8080/requests', { file })).data.cid
    },
    {
      name: "Infura",
      upload: async (file) => {
        // /!\ Trash api secrets, these won't go beyond free package
        const projectId = "2DKn2VvZwVq1UvT9fOSUIOatVXZ";
        const infura = "a870dea9a4a3c50b9dc7021b671fbaed";

        const client = create({
          host: "ipfs.infura.io",
          port: 5001,
          protocol: "https",
          headers: {
            authorization:
              "Basic " +
              Buffer.from(projectId + ":" + infura).toString("base64")
          }
        });

        if (!file) return undefined;

        try {
          const cid = await client.add(file);
          return cid.path;
        } catch (error) {
          console.log("Error uploading file: ", error);
          return undefined;
        }
      }
    }
  ]);
  const [selectedGatewayIndex, setSelectedGatewayIndex] = useState(0);
  const [selectedUploadGatewayIndex, setSelectedUploadGatewayIndex] = useState(0);

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
