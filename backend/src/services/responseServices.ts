import axios from 'axios'
import { ethers } from 'ethers'
import fetch, { Response } from 'node-fetch'

import ExpressError from '../ExpressError.js'
import MeganodeRequestBody from '../interfaces/MeganodeRequestBody'
import ResponseDetails from '../interfaces/ResponseDetails'
import Tx from '../interfaces/Tx'

export async function getAllResponsesNodeReal (network: number, address: string, requestID: string): Promise<string[]> {
  const allResponses: string[] = []
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
            topics: [ethers.utils.id('Respond(uint256,uint256)'), requestID, null],
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
      if (data.error !== undefined && data.error.code === -32005) {
        throw new ExpressError(500, 'NodeReal API call rate exceeded.')
      }
      break

    default:
      throw new Error('Unknown network.')
  }

  for (const i of data.result) {
    allResponses.push(i.topics[2])
  }

  return allResponses
}

export async function getResponseDetailsStarton (network: number, address: string, requestID: string, responseID: string): Promise<ResponseDetails> {
  let details: ResponseDetails
  let res

  switch (network) {
    case 5:
      res = (await axios.post('https://api.starton.io/v3/smart-contract/ethereum-goerli/' + address + '/read',
        {
          functionName: 'response',
          params: [requestID, responseID]
        },
        {
          headers: {
            'x-api-key': process.env.STARTON_API_KEY
          }
        }))
        .data.response
      details = {
        owner: res[0],
        cid: res[1],
        requestID,
        responseID,
        address
      }
      break

    default:
      throw new Error('Unknown network.')
  }
  return details
}

export async function getResponseTxNodeReal (network: number, address: string, requestID: string, responseID: string): Promise<Tx> {
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
            topics: [ethers.utils.id('Respond(uint256,uint256)'), requestID, responseID],
            fromBlock: '0x7A2ECD',
            toBlock: 'latest'
          }
        ]
      }
      requestOptions.body = JSON.stringify(body)
      response = await fetch(nodeRealAPIEndpoint, requestOptions)
      data = JSON.parse(await response.text())
      if (data.error !== undefined && data.error.code === -32005) {
        throw new ExpressError(500, 'NodeReal API call rate exceeded.')
      }
      txHash = data.result[0].transactionHash
      body.method = 'eth_getBlockByNumber'
      body.params = [data.result[0].blockNumber, false]
      requestOptions.body = JSON.stringify(body)
      response = await fetch(nodeRealAPIEndpoint, requestOptions)
      data = JSON.parse(await response.text())
      if (data.error !== undefined && data.error.code === -32005) {
        throw new ExpressError(500, 'NodeReal API call rate exceeded.')
      }
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
    nodereal: getAllResponsesNodeReal
  },
  details: {
    starton: getResponseDetailsStarton
  },
  getTx: {
    nodereal: getResponseTxNodeReal
  }
}
