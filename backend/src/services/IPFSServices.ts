import axios from 'axios'
import { create } from 'ipfs-http-client'

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

export async function postFileInfura (file: string): Promise<string> {
  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: 'Basic ' +
        Buffer.from(String(process.env.INFURA_PROJECT_ID) + ':' + String(process.env.INFURA_SECRET)).toString('base64')
    }
  })
  const cid = (await client.add(file)).cid
  await client.pin.add(cid)
  return String(cid)
}

export default {
  post: {
    starton: postFileStarton,
    infura: postFileInfura
  }
}
