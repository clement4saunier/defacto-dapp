import Response from "../../content/Response";
import { useIPFSGatewayContext } from "../../context/IPFSGatewayProvider";
import { useRequestSourceContext } from "../../context/on-chain/RequestSourceContext";
import styles from "../List.module.css";
import { useSettleContext } from "../Request";

export default function Responses({ selected, onSelect }) {
  const { responseChainData } = useRequestSourceContext();

  return (
    <>
      <h2>{responseChainData && responseChainData.length} Responses</h2>
      <div className={styles.grid}>
        {responseChainData &&
          responseChainData.map((data, key) => {
            return (
              <Response
                highlight={
                  selected ? selected.find((id) => data.id === id) : false
                }
                key={key}
                onClick={onSelect && (() => onSelect(data.id))}
                {...data}
              />
            );
          })}
      </div>
    </>
  );
}
