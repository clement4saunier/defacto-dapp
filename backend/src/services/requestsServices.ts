import axios from 'axios'
import request from '../interfaces/request'

export async function postStatement (title: string, statement: string): Promise<string> {
  const response = await axios.post('https://api.starton.io/v3/ipfs/json', {
    name: statement,
    content: {
      title,
      statement
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

export async function listRequests (): Promise<request[]> {
  return []
}

export default {
  get: getStatement,
  post: postStatement,
  list: listRequests
}
