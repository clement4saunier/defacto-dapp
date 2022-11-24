export const explorers = new Map([
  [
    1,
    {
      txn: tx => `https://etherscan.io/tx/${tx}`,
      address: addr => `https://etherscan.io/address/${addr}`
    }
  ],
  [
    5,
    {
      txn: tx => `https://goerli.etherscan.io/tx/${tx}`,
      address: addr => `https://goerli.etherscan.io/address/${addr}`
    }
  ]
]);
