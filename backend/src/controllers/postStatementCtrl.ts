import { NextFunction, Request, Response } from 'express'
import axios from 'axios'

export default async (req: Request, res: Response, next: NextFunction): Promise <void> => {
  try {
    const {
      askerAddress,
      statement,
      bounty,
      delegates,
      expiryBlock
    } = req.body
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

    res.send({
      success: true,
      id: response.data.id,
      cid: response.data.cid
    })
  } catch (err: unknown) {
    next(err)
  }
}
