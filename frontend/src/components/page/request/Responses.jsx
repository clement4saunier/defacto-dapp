import Response from "../../content/Response";
import { useIPFSGatewayContext } from "../../context/IPFSGatewayProvider";
import { useRequestSourceContext } from "../../context/on-chain/RequestSourceContext";
import styles from "../List.module.css";
import { useSettleContext } from "../Request";

export default function Responses() {
  const { responseChainData } = useRequestSourceContext();
  const {responseChoosen, setResponseChoosen} = useSettleContext();
  console.log("resp", responseChainData);

  return (
    <>
    {responseChoosen}
      {" "}
      <h2>{responseChainData && responseChainData.length} Responses</h2>
      <div className={styles.grid} onClick={(e) => {setResponseChoosen(e.target)}}>
        {responseChainData &&
          responseChainData.map((data, key) => {
            console.log(data);
            return <Response key={key} {...data} />;
          })}
      </div>
    </>
  );
}
