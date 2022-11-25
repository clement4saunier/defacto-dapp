import React, { useEffect, useMemo } from "react";
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
import useDelegateRegistryContract from "../hooks/useDelegateRegistryContract";
import { ethers } from "ethers";

export default function Request() {
  let { requestId } = useParams();
  const { sourceSelector, source } = useOnChainContext();
  const { ipfsGateway, ipfsGatewaySelector, ipfsUploadGatewaySelector } =
    useIPFSGatewayContext();

  const [publishing, setPublishing] = useState(false);
  const [settling, setSettling] = useState(false);

  const SettleButton = () => {
    const { account } = useWeb3Context();
    const { requestChainData } = useRequestSourceContext();
    const [delegate, setDelegate] = useState();
    const { instance } = useDelegateRegistryContract();
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
      requestChainData && setDelegate(requestChainData[0].delegate);
      requestChainData && console.log(requestChainData[0]);
    }, [requestChainData]);

    useEffect(() => {
      async function checkOwnerOfDelegate() {
        const owner = await instance.ownerOf(ethers.utils.id(delegate));

        setIsOwner(owner === account);
      }

      delegate && checkOwnerOfDelegate();
    }, [delegate, account]);

    return (
      <>
        {isOwner && (
          <button
            onClick={() => {
              setSettling((s) => !s);
            }}
          >
            Settle
          </button>
        )}
      </>
    );
  };

  return (
    <>
      use {sourceSelector} and {ipfsGatewaySelector}
      <br />
      <br />
      {React.cloneElement(source.requestProvider, {
        onlyId: requestId,
        children: (
          <>
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
            <SettleButton />
            {settling ? (
              <Settle />
            ) : !publishing ? (
              <Responses />
            ) : (
              <Respond requestId={requestId} />
            )}
          </>
        )
      })}
    </>
  );
}
