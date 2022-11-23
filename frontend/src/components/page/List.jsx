import React from "react";
import RequestList from "../content/RequestList";
import { useIPFSGatewayContext } from "../context/IPFSGatewayProvider";
import { useOnChainContext } from "../context/OnChainProvider";

export default function List() {
  const { source, sourceSelector } = useOnChainContext();
  const { ipfsGateway, ipfsGatewaySelector } = useIPFSGatewayContext();

  return (
    <>
      <h1>A là une</h1>
      <p>The most recent open bounties</p>
      <h4>On-chain source</h4>
      {sourceSelector}
      <h4>IPFS gateway</h4>
      {ipfsGatewaySelector}
      <br />
      <br />
      {React.cloneElement(source.requestProvider, {
        children: <RequestList fetchCid={ipfsGateway.fetch} />
      })}
    </>
  );
}
