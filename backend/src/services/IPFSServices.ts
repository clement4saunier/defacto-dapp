import axios from 'axios'

export async function postFileStarton (file: string): Promise<string> {
  const response = await axios.post('https://api.starton.io/v3/ipfs/json', {
    name: JSON.parse(file).name,
    content: JSON.parse(file),
    metadata: { }
  }, {
    headers: {
      'x-api-key': process.env.STARTON_API_KEY
    }
  })

  return response.data.cid
}

export default {
  post: {
    starton: postFileStarton
  }
}
