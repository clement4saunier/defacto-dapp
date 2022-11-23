import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Icon from "../content/Icon";
import Response from "../content/Response";
import { BrowserWalletRequestProvider } from "../context/on-chain/BrowserWalletRequestProvider";
import { useRequestSourceContext } from "../context/on-chain/RequestSourceContext";
import { useWeb3Context } from "../context/Web3Provider";
import styles from "./List.module.css";

export default function Request() {
  const [publishing, setPublishing] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const { account } = useWeb3Context();
  let { requestId } = useParams();

  const Content = () => {
    const { requestChainData } = useRequestSourceContext();
    const [cid, setCid] = useState();

    useEffect(() => {
      requestChainData && setCid(requestChainData[0].cid);
    }, [requestChainData]);

    return (
      <div>
        {cid}
        <h1>Title of the request</h1>
        <p>
          Submitted by <a>0x012389</a> for 1 BTC
        </p>
        <div className="divider" />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    );
  };

  return (
    <BrowserWalletRequestProvider onlyId={requestId}>
      <Content />
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
  );
}
