import { useRequestSourceContext } from "../context/on-chain/RequestSourceContext";
import Icon from "./Icon";
import Request from "./Request";
import styles from "./RequestList.module.css";

export default function RequestList({ fetchCid }) {
  const { requestIds, requestCids } = useRequestSourceContext();

  return (
      <div className={styles.grid}>
        {requestIds === null && (
          <span className="error">
            <Icon crypto="denied" /> Could not load requests from this provider"
          </span>
        )}
        {requestCids !== null &&
          (requestCids === undefined
            ? "Loading..."
            : requestCids.map((id, idx) => (
                <Request
                  address={""}
                  requestId={id}
                  cid={id}
                  fetchCid={fetchCid}
                  key={idx}
                />
              )))}
      </div>
  );
}
