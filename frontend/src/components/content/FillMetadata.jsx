import { useMemo } from "react";
import { useState } from "react";
import Icon from "./Icon";
import Transaction from "./Transaction";
import { useIPFSGatewayContext } from "../context/IPFSGatewayProvider";
import { useWeb3Context } from "../context/Web3Provider";
import useRequestBountyContract from "../hooks/useRequestBountyContract";
import { useEffect } from "react";

export default function FillMetadata({ requestId, onCidSet }) {
  const { ipfsUploadGateway, ipfsUploadGatewaySelector } =
    useIPFSGatewayContext();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const file = useMemo(
    () => JSON.stringify({ name: title, description: body }),
    [title, body]
  );
  const [cid, setCid] = useState(null);

  function onUploadButton() {
    async function fetchCid() {
      setCid(undefined);
      setCid(await ipfsUploadGateway.upload(file));
    }

    file && fetchCid();
  }

  useEffect(() => {
    cid && onCidSet && onCidSet(cid);
  }, [cid]);

  return (
    <>
      <textarea
        style={{ minHeight: "2em" }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        style={{ minHeight: "10em" }}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <h2>Upload and publish</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{ipfsUploadGatewaySelector}</div>
        <div>
          <button onClick={onUploadButton}>
            {cid === null ? (
              <>
                Upload <Icon crypto="send-in" />
              </>
            ) : cid === undefined ? (
              "Loading..."
            ) : (
              <>
                {cid} <Icon crypto="receive" />
              </>
            )}{" "}
          </button>
        </div>
      </div>
    </>
  );
}
