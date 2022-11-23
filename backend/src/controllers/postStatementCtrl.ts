import { NextFunction, Request, Response } from 'express'
import { postStatement } from '../services/statements'

export default async (req: Request, res: Response, next: NextFunction): Promise <void> => {
  try {
    const { title, statement } = req.body

    const id: string = await postStatement(title, statement)

    res.send({
      success: true,
      id
    })
  } catch (err: unknown) {
    next(err)
  }
}
