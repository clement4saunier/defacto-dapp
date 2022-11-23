export default interface request {
  askerAddress: string
  cid: string
  bounty: {
    tokenAddress: string
    amount: number
  }
  expiryBlock: number
}
