import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Icon from "../content/Icon";
import Request from "../content/Request";
import styles from "./List.module.css";

const defaultRequestMetadata = {
  name: "Title of the request",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the1500s, when an unknown printer took a galley of type and scrambled it tomake a type specimen book. It has survived not only five centuries, butalso the leap into electronic typesetting, remaining essentiallyunchanged. It was popularised in the 1960s with the release of Letrasetsheets containing Lorem Ipsum passages, and more recently with desktoppublishing software like Aldus PageMaker including versions of LoremIpsum."
};

export default function List() {
  const [sources] = useState([
    {
      name: "Wallet",
      fetch: async () => {
        throw undefined;
      }
    },
    {
      name: "Starton API",
      fetch: async () => {
        throw undefined;
      }
    },
    {
      name: "NodeReal API",
      fetch: async () => {
        throw undefined;
      }
    },
    { name: "Hardcoded Set", fetch: async () => [0, 1, 2, 3] }
  ]);
  const [ipfsGateways] = useState([
    { name: "Ipfs.io", fetch: async (cid) => await fetch("https://ipfs.io/ipfs/" + cid).then(async (file) => file.json())},
    { name: "Ipns.co", fetch: async (cid) => await fetch("https://ipns.co/ipfs/" + cid).then(async (file) => file.json()) },
    { name: "Starton API", fetch: async (cid) => defaultRequestMetadata }
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

  console.log("IPFS", ipfsGateway);
  const [requestIds, setRequestIds] = useState();

  useEffect(() => {
    async function fetchRequestIds() {
      setRequestIds(undefined);
      setTimeout(async () => {
        try {
          const ids = await source.fetch();
          console.log("IDS", ids);
          setRequestIds(ids);
        } catch (err) {
          console.log("Couldn't retrieve requests ids", err);
          setRequestIds(null);
        }
      }, 150);
    }

    fetchRequestIds();
  }, [source]);

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
      <div className={styles.grid}>
        {requestIds === null && <span className="error"><Icon crypto="denied"/> Could not load requests from this provider"</span>}
        {requestIds !== null &&
          (requestIds === undefined
            ? "Loading..."
            : requestIds.map((id, idx) => (
                <Request
                  address={""}
                  requestId={id}
                  fetchCid={ipfsGateway.fetch}
                  key={idx}
                />
              )))}
      </div>
    </>
  );
}
