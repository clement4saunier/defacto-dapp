import styles from "./Request.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Icon from "./Icon";
import { useMemo } from "react";

export default function Request({ address, chainId, requestId, fetchCid }) {
  let navigate = useNavigate();
  const [cid, setCid] = useState();
  const [metadata, setMetadata] = useState({});

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

  useEffect(() => {
    setCid("QmaasREid7vEwZFTwEEzEm2gu7LEs1DEcS6cJhjgDZ4r2V");
  }, [address, chainId, requestId]);

  return (
    <div
      className={[styles.card, "card"].join(" ")}
      onClick={() => navigate("/request")}
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
      <div>
        <p>
          active <br />1 BTC
        </p>
      </div>
    </div>
  );
}
