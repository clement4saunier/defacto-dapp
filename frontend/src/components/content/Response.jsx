import { useEffect, useMemo, useState } from "react";
import { useIPFSGatewayContext } from "../context/IPFSGatewayProvider";

export default function Response({ sender, id, cid, origin }) {
  const { ipfsGateway } = useIPFSGatewayContext();
  const [{ name, description }, setContent] = useState({});
  const originDate = useMemo(() => {
    const date = new Date(origin * 1000);
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
    <div className="card">
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
