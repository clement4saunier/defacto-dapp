import { useMemo } from "react";
import { useState } from "react";
import Icon from "../../content/Icon";
import Transaction from "../../content/Transaction";
import { useIPFSGatewayContext } from "../../context/IPFSGatewayProvider";
import { useWeb3Context } from "../../context/Web3Provider";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";

export default function Respond({ requestId }) {
  const { ipfsUploadGateway, ipfsUploadGatewaySelector } =
    useIPFSGatewayContext();
  const { account } = useWeb3Context();
  const { instance } = useRequestBountyContract();

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

  async function onMintButton() {
    await instance.publishResponse(
      { _hex: requestId, _isBigNumber: true },
      cid
    );
  }

  return (
    <>
      <h2>Respond {account && "as " + account.substring(0, 7)}</h2>
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
          <Transaction
            disabled={!cid}
            instance={instance}
            functionName="publishResponse"
            args={[{ _hex: requestId, _isBigNumber: true }, cid]}
          >
            Mint
          </Transaction>
        </div>
      </div>
    </>
  );
}
