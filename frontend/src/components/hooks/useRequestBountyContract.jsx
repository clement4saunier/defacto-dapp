import { Contract, ethers } from "ethers";
import { useMemo } from "react";
import contracts from "../../contracts/deployed.json";
import { useWeb3Context } from "../context/Web3Provider";

import requestAbi from "../../contracts/abi/requests.json";

export default function useRequestBountyContract() {
  const { chainId, provider, readOnly } = useWeb3Context();
  const address = useMemo(
    () => (contracts.chain[chainId] ? contracts.chain[chainId].requests : null),
    [chainId, contracts]
  );
  const instance = useMemo(
    () =>
      provider && address
        ? new Contract(
            address,
            requestAbi,
            readOnly ? provider : provider.getSigner()
          )
        : null,
    [address, provider]
  );

  async function getRequestTxn(id = null) {
    const addr = contracts.chain[chainId].requests;
    const inst = new Contract(addr, requestAbi, provider);

    let publishTransaction = await inst.queryFilter({
      address,
      topics: [ethers.utils.id("Publish(uint256)"), id]
    }, -4000);

    return publishTransaction;
  }

  async function getResponseTxn(requestId, responseId = null) {
    const addr = contracts.chain[chainId].requests;
    const inst = new Contract(addr, requestAbi, provider);

    let publishTransaction = await inst.queryFilter({
      address,
      topics: [
        ethers.utils.id("Respond(uint256,uint256)"),
        requestId,
        responseId
      ]
    },
    -4000
    );

    return publishTransaction;
  }

  async function getAllRequestIds() {
    return (await getRequestTxn()).map(({ args }) => args[0]._hex);
  }

  async function getAllResponseIds(id) {
    return (await getResponseTxn(id)).map(({ args }) => args[1]._hex);
  }

  return {
    address,
    instance,
    getAllRequestIds,
    getAllResponseIds,
    getRequestTxn,
    getResponseTxn
  };
}
