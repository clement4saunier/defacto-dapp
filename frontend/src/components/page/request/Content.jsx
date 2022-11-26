import { useEffect, useState } from "react";
import Icon from "../../content/Icon";
import { useIPFSGatewayContext } from "../../context/IPFSGatewayProvider";
import { useRequestSourceContext } from "../../context/on-chain/RequestSourceContext";
import ReactMarkdown from 'react-markdown'

export default function Content() {
  const { requestChainData } = useRequestSourceContext();
  const [cid, setCid] = useState();
  const [{ name, description }, setContent] = useState({});
  const { ipfsGateway } = useIPFSGatewayContext();

  useEffect(() => {
    requestChainData && setCid(requestChainData[0].cid);
  }, [requestChainData]);

  useEffect(() => {
    async function fetchContent() {
      try {
        setContent(await ipfsGateway.fetch(cid));
      } catch (err) {
        setContent({ name: null, description: null });
      }
    }

    cid && fetchContent();
  }, [cid]);

  return (
    <div>
      <h1>
        {name === null ? (
          <span className="error">
            <Icon crypto="denied" /> Could not load content from this provider
          </span>
        ) : (
          name ?? "..."
        )}
      </h1>

      <div className="divider" />
      <p>
        <ReactMarkdown>{description ?? "..."}</ReactMarkdown>
      </p>
    </div>
  );
}
