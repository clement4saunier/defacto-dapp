import axios from 'axios'
import fetch, { Response } from 'node-fetch'
import RequestDetails from '../interfaces/RequestDetails'
import { ethers } from 'ethers'
import MeganodeRequestBody from '../interfaces/MeganodeRequestBody'

export async function getAllRequestsNodeReal (network: number, address: string): Promise<string[]> {
  const allRequests: string[] = []
  let response: Response
  let data: any
  let body: MeganodeRequestBody

  switch (network) {
    case 5:
      body = {
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
      }
      response = await fetch('https://eth-goerli.nodereal.io/v1/' + String(process.env.MEGANODE_API_KEY_ETH), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(body)
      })
      data = JSON.parse(await response.text())
      break

    default:
      throw new Error('Unknown network.')
  }

  for (const i of data.result) {
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
        address,
        delegate: response[5]
      }
      break

    default:
      throw new Error('Unknown network.')
  }
  return details
}

export default {
  getAll: {
    nodereal: getAllRequestsNodeReal
  },
  details: {
    starton: getRequestDetailsStarton
  }
}
