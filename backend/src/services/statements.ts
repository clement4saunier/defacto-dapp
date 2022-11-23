import axios from 'axios'
import Bounty from '../interfaces/Bounty'

export async function postStatement (askerAddress: string, statement: string, bounty: Bounty, delegates: String[], expiryBlock: number): Promise<string> {
  const response = await axios.post('https://api.starton.io/v3/ipfs/json', {
    name: statement,
    content: {
      askerAddress,
      statement,
      bounty,
      delegates,
      expiryBlock
    },
    metadata: {}
  }, {
    headers: {
      'x-api-key': process.env.STARTON_API_KEY
    }
  })

  return response.data.id
}

export async function getStatement (id: string): Promise<any> {
  const response = await axios.get('https://api.starton.io/v3/ipfs/pin/' + id, {
    headers: {
      'x-api-key': process.env.STARTON_API_KEY
    }
  })

  return response.data
}

export default {
  postStatement
}
