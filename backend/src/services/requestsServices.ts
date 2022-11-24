import RequestDetails from '../interfaces/RequestDetails'

export async function getAllRequestsStarton (): Promise<string[]> {
  return []
}

export async function getRequestDetailsStarton (id: string): Promise<RequestDetails> {
  return {
    askerAddress: '0xAsker',
    cid: 'cid',
    tokenAddress: '0xToken',
    amount: 42,
    expiryBlock: 420
  }
}

export default {
  getAll: {
    starton: getAllRequestsStarton
  },
  details: {
    starton: getRequestDetailsStarton
  }
}
