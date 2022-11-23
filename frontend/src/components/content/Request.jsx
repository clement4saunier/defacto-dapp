import styles from "./Request.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Icon from "./Icon";
import { useMemo } from "react";

export default function Request({ address, chainId, requestId, cid, fetchCid }) {
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
        navigate("/request");
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
          Submitted by <a>0x012389</a>
        </p>
      </div>
      <div className={[styles.details, showDetails && "show"].join(' ')}>
        <p>
          active <br />1 BTC
          <br />
          <button onClick={(e) => {setShowDetails(show => !show); e.stopPropagation()}}>
            <Icon crypto="info" />
          </button>
        </p>
        <div className={[styles.chain, showDetails && styles.show].join(" ")}>
          <p>contract: 0x212393</p>
        </div>
      </div>
    </div>
  );
}
