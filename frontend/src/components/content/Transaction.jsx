import { useEffect, useState } from "react";
import { explorers } from "../../contracts/explorers";
import { useWeb3Context } from "../context/Web3Provider";
import Icon from "./Icon";
import styles from "./Transaction.module.css";

export default function Transaction({
  children,
  instance,
  functionName,
  args,
  ...props
}) {
  const { provider, chainId} = useWeb3Context();
  const [wei, setWei] = useState(0);
  const [gasLimit, setGasLimit] = useState(0);
  const [gas, setGas] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState();
  const [txnHash, setTxnHash] = useState();

  useEffect(() => {
    async function updateGas() {
      if (!instance) return;

      try {
        const estimatedWei = await instance.estimateGas[functionName](...args);
        setWei(estimatedWei.toNumber());
        setGasLimit(estimatedWei.toNumber());
        setGas(estimatedWei.toNumber() * (await provider.getGasPrice()));
      } catch (err) {
        setGas(0);
      }
    }

    updateGas();
  }, [args, functionName, instance]);

  const statusComponent = (icon, content) => (
    <div className={styles.tooltip}>
      <Icon crypto={icon} />
      <span className={styles.content}>{content}</span>
    </div>
  );

  function onInteractButton() {
    setLoading(true);
    setTxnHash(undefined);
    setStatus(
      statusComponent("signature", "Waiting for your wallet's signature")
    );
    setTimeout(async () => {
      try {
        const { wait, hash } = await instance[functionName](
          ...args,
          gasLimit !== 0 ? { gasLimit: wei } : {}
        );
        setStatus(
          statusComponent(
            "time",
            <>
              {`Transaction ${hash.substring(0, 7)} pending..`}
              <br />
              (click to open explorer)
            </>
          )
        );
        setTxnHash(hash);
        await wait();
        setStatus(
          <>
            <Icon crypto="sucess" />
          </>
        );
      } catch (err) {
        console.log(err);
        setStatus(statusComponent("denied", "Transaction failed"));
      }
    }, 1);
  }

  function onOpenTransactionButton() {
    window.open(explorers.get(chainId).txn(txnHash), "_blank");
  }

  return (
    <>
      <button onClick={onInteractButton} {...props}>
        <Icon crypto="hardware" /> {children}
      </button>
      {status && <button disabled={!txnHash} onClick={onOpenTransactionButton} className="unselected">{status}</button>}
    </>
  );
}
