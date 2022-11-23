import { useEffect, useMemo, useState } from "react";
import { useWeb3Context } from "../../context/Web3Provider";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";
import { useCreationContext } from "../Create";

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
  const [cid, setCid] = useState();
  const file = useMemo(
    () => JSON.stringify({ name: title, description: body }),
    [title, body]
  );

  useEffect(() => {
    //fetch IPFS CID
    file && console.log("UPLOAD", file);
  }, [file]);

  function onMintButton() {
    const args = [cid, token, "0", 1903123123];
    console.log(`publishRequest(${[...args]})`);
    instance.publishRequest(...args);
  }

  return (
    <>
      <h1>Mint your request</h1>
      <p>Lorem ipsum</p>
      <div className="divider" />
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="divider" />
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
