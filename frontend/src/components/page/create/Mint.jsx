import { useEffect, useMemo, useState } from "react";
import Icon from "../../content/Icon";
import { useWeb3Context } from "../../context/Web3Provider";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";
import { useCreationContext } from "../Create";
import Currency from "../../content/Currency";
import { Contract } from "ethers";
import erc20abi from "../../../contracts/abi/erc20.json";
import { useIPFSGatewayContext } from "../../context/IPFSGatewayProvider";
import Transaction from "../../content/Transaction";
import { utils } from "ethers";

export default function Mint() {
  const { body, bounty, title, token, symbol, delegate, timer, setConfirmed } =
    useCreationContext();
  const { account, provider } = useWeb3Context();
  const { instance } = useRequestBountyContract();
  const [cid, setCid] = useState(null);
  const [approved, setApproved] = useState(false);
  const file = useMemo(
    () => JSON.stringify({ name: title, description: body }),
    [title, body]
  );

  const erc20 = useMemo(
    () => new Contract(token, erc20abi, provider.getSigner()),
    [token, provider]
  );
  const deadlineTimestamp = useMemo(
    () => Date.now() + parseInt(timer) * 60 * 60 * 1000,
    [timer]
  );
  const displayDeadlineData = useMemo(() => {
    const date = new Date(deadlineTimestamp);
    return origin
      ? `${date.getDate()}/${date.getMonth() + 1}/${date
          .getFullYear()
          .toString()
          .substring(2, 4)}`
      : "...";
  }, [deadlineTimestamp]);

  console.log(deadlineTimestamp);

  const { ipfsUploadGateway: gateway, ipfsUploadGatewaySelector } =
    useIPFSGatewayContext();

  async function onApproveButton() {
    const erc20 = new Contract(token, erc20abi, provider.getSigner());
    const currentAllowance = await erc20.allowance(account, instance.address);

    console.log("allowance", currentAllowance);
    if (utils.formatEther(currentAllowance.toString()) >= bounty) {
      setApproved(true);
    } else {
      const txn = await erc20.approve(
        instance.address,
        utils.parseEther(bounty.toString())
      );
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
      <p>Upload your request to IPFS and mint it on the blockchain.</p>
      <div className="divider" />
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="divider" />
      <a>{delegate}</a> will be responsible for the settlement of your bounty
      <h3>IPFS Upload gateway</h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{ipfsUploadGatewaySelector}</div>
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
      <p>
        Will be subimitted by <a>{account && account.substring(0, 7)}</a> for{" "}
        {bounty} <Currency symbol={symbol} />
      </p>
      <p>The request will end the {displayDeadlineData}</p>
      <button onClick={() => setConfirmed(false)}>Back</button>
      <Transaction
        instance={erc20}
        functionName="approve"
        args={[instance.address, utils.parseEther(bounty.toString())]}
      >
        Approve {bounty} {symbol}
      </Transaction>
      <Transaction
        disabled={!cid}
        instance={instance}
        functionName="publishRequest"
        args={[
          cid,
          token,
          utils.parseEther(bounty.toString()),
          deadlineTimestamp,
          delegate
        ]}
      >
        Mint
      </Transaction>
    </>
  );
}
