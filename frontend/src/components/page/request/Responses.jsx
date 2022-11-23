import Response from "../../content/Response";
import { useIPFSGatewayContext } from "../../context/IPFSGatewayProvider";
import { useRequestSourceContext } from "../../context/on-chain/RequestSourceContext";
import styles from "../List.module.css";

export default function Responses() {
  const { responseChainData } = useRequestSourceContext();

  console.log("resp", responseChainData);

  return (
    <>
      {" "}
      <h2>{responseChainData && responseChainData.length} Responses</h2>
      <div className={styles.grid}>
        {responseChainData &&
          responseChainData.map((data, key) => {
            console.log(data);
            return <Response key={key} {...data} />;
          })}
      </div>
    </>
  );
}
