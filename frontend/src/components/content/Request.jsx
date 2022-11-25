import styles from "./Request.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Icon from "./Icon";
import { useMemo } from "react";
import Currency from "./Currency";
import { explorers } from "../../contracts/explorers";
import { useWeb3Context } from "../context/Web3Provider";

export default function Request({
  address,
  id,
  cid,
  fetchCid,
  origin,
  hash,
  owner,
  amount,
  symbol
}) {
  let navigate = useNavigate();
  const { chainId } = useWeb3Context();
  const [metadata, setMetadata] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const originDate = useMemo(() => {
    const date = new Date(origin * 1000);
    return origin
      ? `${date.getDate()}/${date.getMonth() + 1}/${date
          .getFullYear()
          .toString()
          .substring(2, 4)}`
      : "...";
  }, [origin]);

  useEffect(() => {
    async function fetchRequestMetadata() {
      setMetadata(undefined);
      setTimeout(async () => {
        try {
          setMetadata(await fetchCid(cid));
        } catch (err) {
          console.error("Couldn't fetch metadata", err);
          setMetadata(null);
        }
      }, 100);
    }

    cid && fetchRequestMetadata();
  }, [cid, fetchCid]);

  return (
    <div className={[styles.card, "card"].join(" ")}>
      <div
        className={styles.innerCard}
        onClick={(e) => {
          navigate("/request/" + id);
          e.stopPropagation();
        }}
      >
        <h3>
          {metadata && metadata.name}
          {!metadata && metadata === null && (
            <span className="error">
              <Icon crypto="denied" /> Couldn't fetch content
            </span>
          )}
          {metadata === undefined && "Loading..."}
        </h3>
        <p>
          Submitted by <a>{(owner && owner.substring(0, 7)) ?? "Loading..."}</a>{" "}
          for <a>{amount ?? "..."} </a>
          <Currency symbol={symbol} />
        </p>
        <div className={styles.status}>
          <span className={["highlight", "success"].join(" ")}>active</span>
        </div>
      </div>
      <div className={[styles.details, showDetails && "show"].join(" ")}>
        <div
          onClick={(e) => {
            setShowDetails((show) => !show);
            e.stopPropagation();
          }}
          style={{ width: "max-content" }}
          className={[styles.slider, showDetails ? styles.show : ""].join(" ")}
        >
          <Icon crypto="receive" />
        </div>
        <div className={[styles.chain, showDetails && styles.show].join(" ")}>
          <p>
            @
            <a
              href={
                explorers.get(chainId)
                  ? explorers.get(chainId).address(address)
                  : address
              }
              target="_blank"
            >
              {address.substring(0, 8)}
            </a>
            <br />#<a>{id.substring(0, 8)}</a>
            <br />h
            <a
              href={
                explorers.get(chainId)
                  ? explorers.get(chainId).txn(hash)
                  : address
              }
              target="_blank"
            >
              {hash && hash.substring(0, 8)}
            </a>
            <br />t<a>{originDate}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
