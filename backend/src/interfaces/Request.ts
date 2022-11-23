export default interface Request {
  askerAddress: string
  cid: string
  bounty: {
    tokenAddress: string
    amount: number
  }
  expiryBlock: number
}
