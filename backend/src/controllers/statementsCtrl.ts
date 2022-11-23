import { NextFunction, Request, Response } from 'express'
import statementsServices from '../services/statementsServices'

export async function getStatementCtrl (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const statement = await statementsServices.get(req.params.id)

    res.send({ success: true, statement })
  } catch (err: unknown) {
    next(err)
  }
}

export async function postStatementCtrl (req: Request, res: Response, next: NextFunction): Promise <void> {
  try {
    const { title, statement } = req.body
    const id: string = await statementsServices.post(title, statement)

    res.send({
      success: true,
      id
    })
  } catch (err: unknown) {
    next(err)
  }
}
