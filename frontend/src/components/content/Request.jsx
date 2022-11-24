import styles from "./Request.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Icon from "./Icon";
import { useMemo } from "react";
import Currency from "./Currency";

export default function Request({
  address,
  chainId,
  id,
  cid,
  fetchCid,
  owner,
  amount,
  symbol
}) {
  let navigate = useNavigate();
  const [metadata, setMetadata] = useState({});
  const [showDetails, setShowDetails] = useState(false);

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

  // useEffect(() => {
  //   setCid(requestCid);
  // }, [address, chainId, requestId, requestCid]);

  return (
    <div
      className={[styles.card, "card"].join(" ")}
      onClick={(e) => {
        navigate("/request/" + id);
        e.stopPropagation();
      }}
    >
      <div>
        <h3>
          {metadata ? (
            metadata.name
          ) : metadata === null ? (
            <span className="error">
              <Icon crypto="denied" /> Couldn't fetch content
            </span>
          ) : (
            "Loading..."
          )}
        </h3>
        <p>
          Submitted by <a>{(owner && owner.substring(0, 7)) ?? "Loading..."}</a>{" "}
          for <a>{(amount && amount.toNumber()) ?? "..."} </a>
          <Currency symbol={symbol} />
        </p>
      </div>
      <div className={[styles.details, showDetails && "show"].join(" ")}>
        <p>
          <span className="highlight success">active</span>
          <br />
          <br />
        </p>
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
          <p>@<a>{address.substring(0, 8)}</a><br/>#<a>{id.substring(0, 8)}</a><br/>t<a>XX/XX/XX</a></p>
        </div>
      </div>
    </div>
  );
}
