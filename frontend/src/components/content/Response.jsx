import { useEffect, useState } from "react";
import { useIPFSGatewayContext } from "../context/IPFSGatewayProvider";

export default function Response({ sender, id, cid }) {
  const { ipfsGateway } = useIPFSGatewayContext();
  const [{ name, description }, setContent] = useState({});

  useEffect(() => {
    async function fetchContent() {
      setContent(await ipfsGateway.fetch(cid));
    }

    cid && fetchContent();
  }, [cid]);

  return (
    <div className="card">
      <p>
        <a>{sender}</a> on 21 Wed 2021
      </p>
      <h4>{name}</h4>
      <p>{description}</p>
    </div>
  );
}
