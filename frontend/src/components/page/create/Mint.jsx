import { useEffect, useMemo, useState } from "react";
import Icon from "../../content/Icon";
import { useWeb3Context } from "../../context/Web3Provider";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";
import { useCreationContext } from "../Create";
import { create } from "ipfs-http-client";
import Currency from "../../content/Currency";
import { Contract } from "ethers";
import erc20abi from "../../../contracts/abi/erc20.json"
import { useIPFSGatewayContext } from "../../context/IPFSGatewayProvider";

export default function Mint() {
  const {
    body,
    setBody,
    bounty,
    setBounty,
    title,
    setTitle,
    token,
    symbol,
    setToken,
    timer,
    setTimer,
    nbDelegates,
    setNbDelegates,
    delegates,
    setDelegates,
    setConfirmed
  } = useCreationContext();
  const { account, provider } = useWeb3Context();
  const { instance } = useRequestBountyContract();
  const [cid, setCid] = useState(null);
  const [approved, setApproved] = useState(false);
  const file = useMemo(
    () => JSON.stringify({ name: title, description: body }),
    [title, body]
  );

  const [selectedGatewayIndex, setSelectedGatewayIndex] = useState(0);
  const {ipfsUploadGateway: gateway, ipfsUploadGatewaySelector} = useIPFSGatewayContext();

  function onMintButton() {
    const args = [cid, token, bounty, 1903123123];
    console.log(`publishRequest(${[...args]})`);
    instance.publishRequest(...args);
  }

  async function onApproveButton() {
    const erc20 = new Contract(token, erc20abi, provider.getSigner());
    const currentAllowance = await erc20.allowance(account, instance.address);

    console.log("allowance", currentAllowance);
    if (currentAllowance.toNumber() >= bounty) {
        setApproved(true);
    } else {
        const txn = await erc20.approve(instance.address, bounty);
        await txn.wait();
        setApproved(true);
    }
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
        {ipfsUploadGatewaySelector}
        </div>
        <button onClick={onUploadButton}>
          {cid === null ? <>Upload <Icon crypto="send-in" /></> : cid === undefined ? "Loading..." : <>{cid} <Icon crypto="receive" /></>}{" "}
        </button>
      </div>
      <p>
        Will be subimitted by <a>{account.substring(0, 7)}</a> for {bounty} <Currency symbol={symbol}/>
      </p>
      <p>The request will end in {timer}</p>
      <button onClick={() => setConfirmed(false)}>Back</button>
      <button onClick={onApproveButton}>
        Approve {bounty} {symbol}
      </button>
      <button disabled={!cid || !approved} onClick={onMintButton}>
        Mint
      </button>
    </>
  );
}
