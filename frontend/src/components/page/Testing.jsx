import { useEffect, useMemo, useState } from "react";
import currencies from "../../contracts/currencies.json";
import Currency from "../content/Currency";
import Icon from "../content/Icon";
import Transaction from "../content/Transaction";
import { useWeb3Context } from "../context/Web3Provider";
import { Contract } from "ethers";
import erc20abi from "../../contracts/abi/erc20.json";
import {utils} from 'ethers';

export default function Testing() {
  const { chainId, provider } = useWeb3Context();

  const currencyList = useMemo(
    () => currencies && currencies.chain[chainId],
    [chainId]
  );

  useEffect(() => {
    console.log(currencyList, currencies);
  }, [currencyList]);

  const CurrencyFaucet = ({ address, name }) => {
    const contract = new Contract(address, erc20abi, provider.getSigner());
    const [amount, setAmount] = useState(100000);

    return (
      <>
        <p>
          <Currency symbol={name} /> @{address}
          <br />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Transaction
            instance={contract}
            functionName={"mint"}
            args={[utils.parseEther(amount.toString())]}
          >
            Mint {name}
          </Transaction>
        </p>
      </>
    );
  };

  return (
    <>
      <h1>Testing</h1>
      <p>
        As this is a hackathon proof of concept, we provide you with testnet
        dummy tokens in order to be able to publish a request for a price
      </p>
      {currencyList &&
        currencyList.map((currency) => <CurrencyFaucet {...currency} />)}
    </>
  );
}
