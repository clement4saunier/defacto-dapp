import { NextFunction, Request, Response } from 'express'
import { postStatement } from '../services/statements'

export default async (req: Request, res: Response, next: NextFunction): Promise <void> => {
  try {
    const {
      askerAddress,
      statement,
      bounty,
      delegates,
      expiryBlock
    } = req.body

    const id: string = await postStatement(askerAddress, statement, bounty, delegates, expiryBlock)

    res.send({
      success: true,
      id
    })
  } catch (err: unknown) {
    next(err)
  }
}
