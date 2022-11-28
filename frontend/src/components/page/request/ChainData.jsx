import { useEffect } from "react";
import { useMemo, useState } from "react";
import Currency from "../../content/Currency";
import { useRequestSourceContext } from "../../context/on-chain/RequestSourceContext";

export default function ChainData() {

    const { requestChainData } = useRequestSourceContext();
    const [{ address, amount, owner, deadline, symbol, token, delegate }, setData] =
      useState({});

      console.log(deadline);
    const displayDate = useMemo(() => {
      const date = new Date(parseInt(deadline));
      return deadline
        ? `${date.getDate()}/${date.getMonth() + 1}/${date
            .getFullYear()
            .toString()
            .substring(2, 4)}`
        : "...";
    }, [deadline]);

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