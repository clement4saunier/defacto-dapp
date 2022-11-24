import { useEffect, useMemo } from "react";
import { createContext, useContext, useState } from "react";
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
import Content from "./request/Content";
import ChainData from "./request/ChainData";
import Respond from "./request/Respond";
import Responses from "./request/Responses";
import Choose from "./request/Choose";
import Settle from "./request/Settle";

export default function Request() {
  const { account } = useWeb3Context();
  let { requestId } = useParams();
  const { sourceSelector } = useOnChainContext();
  const { ipfsGateway, ipfsGatewaySelector, ipfsUploadGatewaySelector } =
    useIPFSGatewayContext();

  const [publishing, setPublishing] = useState(false);
  const [settling, setSettling] = useState(false);

  return (
    <>
      use {sourceSelector} and {ipfsGatewaySelector}
      <br />
      <br />
      <BrowserWalletRequestProvider onlyId={requestId}>
        <Content />
        <ChainData />
        {publishing ? (
          <button
            onClick={() => {
              setPublishing(false);
              setSettling(false);
            }}
          >
            Show responses <Icon crypto="list" />
          </button>
        ) : (
          <button
            onClick={() => {
              setPublishing(true);
              setSettling(false);
            }}
          >
            Publish a response <Icon crypto="receive" />
          </button>
        )}
        <button
          onClick={() => {
            setSettling((s) => !s);
          }}
        >
          Settle
        </button>
        {settling ? (
          <Settle />
        ) : !publishing ? (
          <Responses />
        ) : (
          <Respond requestId={requestId} />
        )}
      </BrowserWalletRequestProvider>
    </>
  );
}
