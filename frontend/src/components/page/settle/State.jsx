import { BigNumber } from "ethers";
import { useMemo, useState } from "react";
import Currency from "../../content/Currency";
import FillMetadata from "../../content/FillMetadata";
import Response from "../../content/Response";
import Transaction from "../../content/Transaction";
import { useRequestSourceContext } from "../../context/on-chain/RequestSourceContext";
import useRequestBountyContract from "../../hooks/useRequestBountyContract";
import { useSettleContext } from "../request/Settle";

export default function State() {
  const { grantedResponses, onResponseSelect, next } = useSettleContext();
  const { responseChainData, requestChainData } = useRequestSourceContext();
  const [cid, setCid] = useState();
  const { instance } = useRequestBountyContract();

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
      <h2>Write your statement</h2>
      <FillMetadata onCidSet={setCid} />
      <h2>Distribute bounty</h2>
      {responses &&
        responses.map((data) => (
          <>
            <Response {...data} />
            <input style={{ width: "10ch" }} type="number" />
            %
            <br />
            <br />
          </>
        ))}
      <Transaction
        instance={instance}
        functionName={"settleRequest"}
        args={[
          requestChainData[0].id,
          grantedResponses.map((i) => i),
          [50, 50]
        ]}
        disabled={!cid}
      >
        Publish
      </Transaction>
    </>
  );
}
