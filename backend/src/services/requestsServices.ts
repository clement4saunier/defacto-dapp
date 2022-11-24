import axios, { AxiosResponse } from 'axios'
import RequestDetails from '../interfaces/RequestDetails'
import { ethers } from 'ethers'

export async function getAllRequestsStarton (network: string, address: string): Promise<string[]> {
  const allRequests: string[] = []
  return allRequests
}

export async function getAllRequestsNodeReal (network: number, address: string): Promise<string[]> {
  const allRequests: string[] = []
  let response: AxiosResponse

  switch (network) {
    case 5:
      response = await axios.post('https://eth-goerli.nodereal.io/v1/' + String(process.env.MEGANODE_API_KEY_ETH),
        {
          id: network,
          jsonrpc: '2.0',
          method: 'eth_getLogs',
          params: [
            {
              address: [address],
              topics: [ethers.utils.id('Publish(uint256)')],
              fromBlock: '0x7A2ECD',
              toBlock: 'latest'
            }
          ]
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            charset: 'UTF-8'
          }
        })
      break

    default:
      throw new Error('Unknown network.')
  }

  for (const i of response.data.result) {
    allRequests.push(i.topics[1])
  }

  return allRequests
}

export async function getRequestDetailsStarton (network: number, address: string, id: string): Promise<RequestDetails> {
  let details: RequestDetails
  let response
  let symbol: string
  let token: string

  switch (network) {
    case 5:
      response = (await axios.post('https://api.starton.io/v3/smart-contract/ethereum-goerli/' + address + '/read',
        {
          functionName: 'request',
          params: [id]
        },
        {
          headers: {
            'x-api-key': process.env.STARTON_API_KEY
          }
        }))
        .data.response
      token = response[2]
      symbol = (await axios.post('https://api.starton.io/v3/smart-contract/ethereum-goerli/' + token + '/read',
        {
          functionName: 'symbol'
        },
        {
          headers: {
            'x-api-key': process.env.STARTON_API_KEY
          }
        }))
        .data.response
      details = {
        owner: response[0],
        cid: response[1],
        token,
        amount: response[3],
        deadline: response[4],
        id,
        symbol,
        address
      }
      break

    default:
      throw new Error('Unknown network.')
  }
  return details
}

export default {
  getAll: {
    starton: getAllRequestsStarton,
    nodereal: getAllRequestsNodeReal
  },
  details: {
    starton: getRequestDetailsStarton
  }
}
