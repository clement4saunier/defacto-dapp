import { useRequestSourceContext } from "../context/on-chain/RequestSourceContext";
import Icon from "./Icon";
import Request from "./Request";
import styles from "./RequestList.module.css";

export default function RequestList({ fetchCid }) {
  const { requestIds, requestChainData } = useRequestSourceContext();

  return (
      <div className={styles.grid}>
        {requestChainData === null && (
          <span className="error">
            <Icon crypto="denied" /> Could not load requests from this provider
          </span>
        )}
        {requestChainData !== null && requestChainData !== undefined && requestChainData.length + " Requests found"}
        {requestChainData !== null &&
          (requestChainData === undefined
            ? "Loading..."
            : requestChainData.map((chainData, idx) => (
                <Request
                  {...chainData}
                  fetchCid={fetchCid}
                  key={idx}
                />
              )))}
      </div>
  );
}
