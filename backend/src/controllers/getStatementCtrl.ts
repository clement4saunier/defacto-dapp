import { NextFunction, Request, Response } from 'express'
import axios from 'axios'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const statement = await axios.get('https://api.starton.io/v3/ipfs/pin/' + req.params.id, {
      headers: {
        'x-api-key': process.env.STARTON_API_KEY
      }
    })

    console.log(statement)

    res.send({ success: true, statement: statement.data })
  } catch (err: unknown) {
    next(err)
  }
}
