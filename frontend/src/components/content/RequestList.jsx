import { useRequestSourceContext } from "../context/on-chain/RequestSourceContext";
import Icon from "./Icon";
import Request from "./Request";
import styles from "./RequestList.module.css";

export default function RequestList({ fetchCid }) {
  const { requestIds } = useRequestSourceContext();

  return (
      <div className={styles.grid}>
        {requestIds === null && (
          <span className="error">
            <Icon crypto="denied" /> Could not load requests from this provider"
          </span>
        )}
        {requestIds !== null &&
          (requestIds === undefined
            ? "Loading..."
            : requestIds.map((id, idx) => (
                <Request
                  address={""}
                  requestId={id}
                  fetchCid={fetchCid}
                  key={idx}
                />
              )))}
      </div>
  );
}
