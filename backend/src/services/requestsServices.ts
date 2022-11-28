import axios from 'axios'
import fetch, { Response } from 'node-fetch'
import RequestDetails from '../interfaces/RequestDetails'
import { ethers } from 'ethers'
import MeganodeRequestBody from '../interfaces/MeganodeRequestBody'
import Tx from '../interfaces/Tx'

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
            topics: [ethers.utils.id('Publish(uint256)')], // ajouter id de la requete en argument au topic dans une nouvelle route /request/:network/:provider/:id_request/
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

export async function getRequestTxNodeReal (network: number, address: string, requestID: string): Promise<Tx> {
  let txHash: string = ''
  let timestamp: string = ''
  let body: MeganodeRequestBody
  let response: Response
  let data: any
  const nodeRealAPIEndpoint: string = 'https://eth-goerli.nodereal.io/v1/' + String(process.env.MEGANODE_API_KEY_ETH)
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: ''
  }

  switch (network) {
    case 5:
      body = {
        id: network,
        jsonrpc: '2.0',
        method: 'eth_getLogs',
        params: [
          {
            address: [address],
            topics: [ethers.utils.id('Publish(uint256)'), requestID],
            fromBlock: '0x7A2ECD',
            toBlock: 'latest'
          }
        ]
      }
      requestOptions.body = JSON.stringify(body)
      response = await fetch(nodeRealAPIEndpoint, requestOptions)
      data = JSON.parse(await response.text())
      txHash = data.result[0].transactionHash
      body.method = 'eth_getBlockByNumber'
      body.params = [data.result[0].blockNumber, false]
      requestOptions.body = JSON.stringify(body)
      response = await fetch(nodeRealAPIEndpoint, requestOptions)
      data = JSON.parse(await response.text())
      timestamp = data.result.timestamp
      break
  }

  return {
    txHash,
    timestamp
  }
}

export default {
  getAll: {
    nodereal: getAllRequestsNodeReal
  },
  details: {
    starton: getRequestDetailsStarton
  },
  getTx: {
    nodereal: getRequestTxNodeReal
  }
}
