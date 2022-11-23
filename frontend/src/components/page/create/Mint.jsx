import { useEffect, useMemo, useState } from "react";
import Icon from "../../content/Icon";
import { useWeb3Context } from "../../context/Web3Provider";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";
import { useCreationContext } from "../Create";
import { create } from "ipfs-http-client";
import {Buffer} from 'buffer';

export default function Mint() {
  const {
    body,
    setBody,
    bounty,
    setBounty,
    title,
    setTitle,
    token,
    setToken,
    timer,
    setTimer,
    nbDelegates,
    setNbDelegates,
    delegates,
    setDelegates,
    setConfirmed
  } = useCreationContext();
  const { account } = useWeb3Context();
  const { instance } = useRequestBountyContract();
  const [cid, setCid] = useState(null);
  const file = useMemo(
    () => JSON.stringify({ name: title, description: body }),
    [title, body]
  );

  const [selectedGatewayIndex, setSelectedGatewayIndex] = useState(0);
  const [ipfsUploadGateways] = useState([
    {
      name: "Starton API",
      upload: async (cid) =>
        "1"
    },
    {
      name: "Infura",
      upload: async (file) => {

        console.log("GEE");
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
  const gateway = useMemo(
    () => ipfsUploadGateways[selectedGatewayIndex],
    [selectedGatewayIndex]
  );

  function onMintButton() {
    const args = [cid, token, "0", 1903123123];
    console.log(`publishRequest(${[...args]})`);
    instance.publishRequest(...args);
  }

  function onUploadButton() {
    async function fetchCid() {
        setCid(undefined);
      setCid(await gateway.upload(file));
    }

    file && fetchCid();
  }

  useEffect(() => console.log("cid", cid), [cid]);

  return (
    <>
      <h1>Mint your request</h1>
      <p>Lorem ipsum</p>
      <div className="divider" />
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="divider" />
      <h3>IPFS Upload gateway</h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {ipfsUploadGateways.map(({ name }, index) => (
            <button
              className={index !== selectedGatewayIndex && "unselected"}
              key={index}
              onClick={() => setSelectedGatewayIndex(index)}
            >
              {name}
            </button>
          ))}
        </div>
        <button onClick={onUploadButton}>
          {cid === null ? "Upload" : cid === undefined ? "Loading..." : cid}{" "}
          <Icon crypto="send-in" />
        </button>
      </div>
      <p>
        Will be subimitted by <a>{account.substring(0, 7)}</a> for {bounty} of{" "}
        {token}
      </p>
      <p>The request will end in {timer}</p>
      <button onClick={() => setConfirmed(false)}>Back</button>
      <button disabled={!cid} onClick={onMintButton}>
        Mint
      </button>
    </>
  );
}
