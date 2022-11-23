import axios from 'axios'
export async function getFileByID (id: string): Promise<any> {
  const response = await axios.get('https://api.starton.io/v3/ipfs/pin/' + id, {
    headers: {
      'x-api-key': process.env.STARTON_API_KEY
    }
  })

  return response.data
}

export default {
  get: getFileByID
}
