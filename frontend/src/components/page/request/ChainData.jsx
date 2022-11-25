import { useEffect } from "react";
import { useMemo, useState } from "react";
import Currency from "../../content/Currency";
import { useRequestSourceContext } from "../../context/on-chain/RequestSourceContext";

export default function ChainData() {

    const { requestChainData } = useRequestSourceContext();
    const [{ address, amount, owner, deadline, symbol, token, delegate }, setData] =
      useState({});
    const displayDate = useMemo(
      () => (deadline ? new Date(deadline * 1000).toLocaleDateString() : "..."),
      [deadline]
    );

    useEffect(() => {
      requestChainData && setData(requestChainData[0]);
    }, [requestChainData]);

    return (
      <>
        <p>
          Submitted by <a>{owner && owner.substring(0, 7)}</a> for{" "}
          {amount} <Currency symbol={symbol} />
          <br />
          Available until {displayDate}
          <br/>
          <a>{delegate}</a> is the settlement agent
        </p>
      </>
    );
}