import { providers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { BigNumber } from "ethers";

export const Web3Context = createContext(null);

export const useWeb3Context = () => {
  return useContext(Web3Context);
};

export default function Web3Provider({children}) {
  const [readOnly, setReadOnly] = useState();
  const [account, setAccount] = useState();
  const [provider, setProvider] = useState();
  const [chainId, setChainId] = useState();
  const [hasWallet, setHasWallet] = useState();

  useEffect(() => {
    async function handleBrowserProvider() {
      const provider = new providers.Web3Provider(window.ethereum, "any");
      const signer = provider.getSigner();

      setProvider(provider);
      setHasWallet(true);
      try {
        const address = await signer.getAddress();

        setReadOnly(false);
        setAccount(address);
        console.log("🦊 Browser Wallet connected as", address);
      } catch (_) {
        console.log("🦊 Browser Wallet not connected");
        setReadOnly(true);
      }
      console.log("⛽ Using Browser Wallet as provider");
    }

    window.ethereum && handleBrowserProvider();
  }, []);

  useEffect(() => {
    async function waitForProviderReady() {
      const { chainId: chain } = await provider.ready;

      setChainId(chain);
      console.log("🔗 ChainId", chain);
    }

    provider && waitForProviderReady();
  }, [provider]);

  function handleChainChanged(arg) {
    const newChainId = BigNumber.from(arg).toNumber();
    setChainId(newChainId);
    console.log("🔗 Now on ChainId", newChainId);
  }

  function handleAccountChanged(accounts) {
    if (accounts.length <= 0) {
      setReadOnly(true);
      setAccount("");
      console.log("👤 Account disconnected");
    } else {
      setAccount(accounts[0]);
      console.log("👤 Connected as", accounts[0]);
      !readOnly && setReadOnly(false);
    }
  }

  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum.on("chainChanged", handleChainChanged);
    window.ethereum.on("accountsChanged", handleAccountChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", handleChainChanged);
      window.ethereum.removeListener("accountsChanged", handleAccountChanged);
    };
  }, []);

  return (
    <Web3Context.Provider
      value={{
        readOnly,
        account,
        provider,
        chainId,
        hasWallet
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
