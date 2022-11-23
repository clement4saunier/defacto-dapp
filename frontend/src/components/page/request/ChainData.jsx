import { useEffect } from "react";
import { useMemo, useState } from "react";
import Currency from "../../content/Currency";
import { useRequestSourceContext } from "../../context/on-chain/RequestSourceContext";

export default function ChainData() {

    const { requestChainData } = useRequestSourceContext();
    const [{ address, amount, owner, deadline, symbol, token }, setData] =
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
          {amount && amount.toNumber()} <Currency symbol={symbol} />
          <br />
          Available until {displayDate}
        </p>
      </>
    );
}