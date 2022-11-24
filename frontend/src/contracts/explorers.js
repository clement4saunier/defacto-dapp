export const explorers = new Map([
  [
    1,
    {
      name: "Mainnet",
      txn: tx => `https://etherscan.io/tx/${tx}`,
      address: addr => `https://etherscan.io/address/${addr}`
    }
  ],
  [
    5,
    {
      name: "Goerli",
      txn: tx => `https://goerli.etherscan.io/tx/${tx}`,
      address: addr => `https://goerli.etherscan.io/address/${addr}`
    }
  ],
  [
    56,
    {
      name: "BNB Mainnet",
      txn: tx => ` https://bscscan.com/tx/${tx}`,
      address: addr => ` https://bscscan.com/address/${addr}`
    }
  ],
  [
    97,
    {
      name: "BNB Testnet",
      txn: tx => `https://testnet.bscscan.com/tx/${tx}`,
      address: addr => `https://testnet.bscscan.com/address/${addr}`
    }
  ]
]);
