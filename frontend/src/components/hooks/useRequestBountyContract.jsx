import { Contract, ethers } from "ethers";
import { useMemo } from "react";
import contracts from "../../contracts/deployed.json";
import { useWeb3Context } from "../context/Web3Provider";

import requestAbi from "../../contracts/abi/requests.json";

export default function useRequestBountyContract() {
  const { chainId, provider } = useWeb3Context();
  const address = useMemo(
    () => (contracts.chain[chainId] ? contracts.chain[chainId].requests : null),
    [chainId, contracts]
  );
  const instance = useMemo(
    () =>
      provider && address
        ? new Contract(address, requestAbi, provider.getSigner())
        : null,
    [address, provider]
  );

  async function getAllRequestIds() {
      const addr = contracts.chain[chainId].requests;
      const inst = new Contract(addr, requestAbi, provider.getSigner());
      console.log("contract", addr, chainId);

    let publishTransaction = await inst.queryFilter({
      address,
      topics: [ethers.utils.id("Publish(uint256)")]
    });

    console.log("publish", publishTransaction);
    return [0];
  }

  return {
    address,
    instance,
    getAllRequestIds
  };
}