import { useMemo } from "react";
import Currency from "../../content/Currency";
import Response from "../../content/Response";
import { useRequestSourceContext } from "../../context/on-chain/RequestSourceContext";
import { useSettleContext } from "../request/Settle";

export default function State() {
  const { grantedResponses, onResponseSelect, next } = useSettleContext();
  const { responseChainData, requestChainData } = useRequestSourceContext();

  const responses = useMemo(
    () =>
      responseChainData &&
      responseChainData.filter(({ id }) =>
        grantedResponses.find((i) => id === i)
      ),
    [grantedResponses, responseChainData]
  );

  console.log(requestChainData);

  return (
    <>
      <h3>Write your statement</h3>
      <textarea />
      <textarea />
      <h3>Distribute bounty</h3>
      {responses &&
        responses.map((data) => (
          <>
            <Response {...data} />
            <input type="number" />
            <Currency symbol={requestChainData[0].symbol} />
            <br />
            <br />
          </>
        ))}
      <button>Publish</button>
    </>
  );
}
