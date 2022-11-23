import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Currency from "../content/Currency";
import Icon from "../content/Icon";
import Response from "../content/Response";
import { useIPFSGatewayContext } from "../context/IPFSGatewayProvider";
import { BrowserWalletRequestProvider } from "../context/on-chain/BrowserWalletRequestProvider";
import { useRequestSourceContext } from "../context/on-chain/RequestSourceContext";
import { useOnChainContext } from "../context/OnChainProvider";
import { useWeb3Context } from "../context/Web3Provider";
import styles from "./List.module.css";

export default function Request() {
  const [publishing, setPublishing] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const { account } = useWeb3Context();
  let { requestId } = useParams();
  const { sourceSelector } = useOnChainContext();
  const { ipfsGateway, ipfsGatewaySelector } = useIPFSGatewayContext();

  const Content = () => {
    const { requestChainData } = useRequestSourceContext();
    const [cid, setCid] = useState();
    const [{ name, description }, setContent] = useState({});

    useEffect(() => {
      requestChainData && setCid(requestChainData[0].cid);
    }, [requestChainData]);

    useEffect(() => {
      async function fetchContent() {
        try {
          setContent(await ipfsGateway.fetch(cid));
        } catch (err) {
          setContent({ name: null, description: null });
        }
      }

      cid && fetchContent();
    }, [cid]);

    return (
      <div>
        <h1>
          {name === null ? (
            <span className="error">
              <Icon crypto="denied" /> Could not load content from this provider
            </span>
          ) : (
            name
          )}
        </h1>

        <div className="divider" />
        <p>{description}</p>
      </div>
    );
  };

  const ChainData = () => {
    const { requestChainData } = useRequestSourceContext();
    const [{ address, amount, owner, deadline, symbol, token }, setData] =
      useState({});
    const displayDate = useMemo(
      () => (deadline ? new Date(deadline * 1000).toLocaleDateString() : "..."),
      [deadline]
    );

    useEffect(() => {
      requestChainData && setData(requestChainData[0]);
    }, [requestChainData]);

    return (
      <>
        <p>
          Submitted by <a>{owner && owner.substring(0, 7)}</a> for{" "}
          {amount && amount.toNumber()} <Currency symbol={symbol} />
          <br />
          Available until {displayDate}
        </p>
      </>
    );
  };

  return (
    <>
      use {sourceSelector} and {ipfsGatewaySelector}
      <br />
      <br />
      <BrowserWalletRequestProvider onlyId={requestId}>
        <Content />
        <ChainData />
        {publishing ? (
          <button onClick={() => setPublishing(false)}>
            Show responses <Icon crypto="list" />
          </button>
        ) : (
          <button onClick={() => setPublishing(true)}>
            Publish a response <Icon crypto="receive" />
          </button>
        )}
        {!publishing ? (
          <>
            {" "}
            <h2>3 Responses</h2>
            <div className={styles.grid}>{Array(3).fill(<Response />)}</div>
          </>
        ) : (
          <>
            <h2>Respond {account && "as " + account.substring(0, 7)}</h2>
            <textarea
              style={{ minHeight: "10em" }}
              onChange={() => setUploaded(false)}
            />
            {uploaded ? (
              <button>Publish</button>
            ) : (
              <button onClick={() => setUploaded(true)}>Confirm</button>
            )}
          </>
        )}
      </BrowserWalletRequestProvider>
    </>
  );
}
