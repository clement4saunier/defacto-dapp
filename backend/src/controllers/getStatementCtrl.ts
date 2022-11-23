import { NextFunction, Request, Response } from 'express'
import { getStatement } from '../services/statements'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const statement = await getStatement(req.params.id)
    res.send({ success: true, statement })
  } catch (err: unknown) {
    next(err)
  }
}
