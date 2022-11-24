import { Contract, ethers } from "ethers";
import { useMemo } from "react";
import contracts from "../../contracts/deployed.json";
import { useWeb3Context } from "../context/Web3Provider";

import registryAbi from "../../contracts/abi/registry.json";

export default function useDelegateRegistryContract() {
  const { chainId, provider, readOnly } = useWeb3Context();
  const address = useMemo(
    () => (contracts.chain[chainId] ? contracts.chain[chainId].registry : null),
    [chainId, contracts]
  );
  const instance = useMemo(
    () =>
      provider && address
        ? new Contract(
            address,
            registryAbi,
            readOnly ? provider : provider.getSigner()
          )
        : null,
    [address, provider]
  );

  return {
    address,
    instance
  };
}
