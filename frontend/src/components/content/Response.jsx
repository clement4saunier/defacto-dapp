import { useEffect, useMemo, useState } from "react";
import { useIPFSGatewayContext } from "../context/IPFSGatewayProvider";

export default function Response({ sender, id, cid, origin, highlight, onClick, ...props}) {
  const { ipfsGateway } = useIPFSGatewayContext();
  const [{ name, description }, setContent] = useState({});
  console.log("origin", origin);
  const originDate = useMemo(() => {
    const date = new Date(parseInt(origin * 1000));
    return origin
      ? `${date.getDate()}/${date.getMonth() + 1}/${date
          .getFullYear()
          .toString()
          .substring(2, 4)}`
      : "...";
  }, [origin]);

  useEffect(() => {
    async function fetchContent() {
      setContent(await ipfsGateway.fetch(cid));
    }

    cid && fetchContent();
  }, [cid]);

  return (
    <div style={onClick && {cursor: "pointer"}} onClick={onClick} className={["card", highlight ? "selected" : ""].join(" ")} {...props}>
      <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
        <h3>{name}</h3>
        <p>
          <a>{sender && sender.substring(0, 8)}</a> on {originDate}
        </p>
      </div>
      <p>{description}</p>
    </div>
  );
}
