import axios from 'axios'
import Request from '../interfaces/Request'

export async function postRequest (title: string, request: string): Promise<string> {
  const response = await axios.post('https://api.starton.io/v3/ipfs/json', {
    name: request,
    content: {
      title,
      request
    },
    metadata: {}
  }, {
    headers: {
      'x-api-key': process.env.STARTON_API_KEY
    }
  })

  return response.data.id
}

export async function listRequests (): Promise<Request[]> {
  return []
}

export default {
  post: postRequest,
  list: listRequests
}
