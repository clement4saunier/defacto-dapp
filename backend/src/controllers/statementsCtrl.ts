import { NextFunction, Request, Response } from 'express'
import requestsService from '../services/requestsServices'

export async function getIPFSFileByIdCtrl (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const statement = await requestsService.get(req.params.id)

    res.send({ success: true, statement })
  } catch (err: unknown) {
    next(err)
  }
}

export async function listRequestsCtrl (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const requests = await requestsService.list()

    res.send({
      success: true,
      requests
    })
  } catch (err: unknown) {
    next(err)
  }
}

export async function postRequestCtrl (req: Request, res: Response, next: NextFunction): Promise <void> {
  try {
    const { title, statement } = req.body
    const id: string = await requestsService.post(title, statement)

    res.send({
      success: true,
      id
    })
  } catch (err: unknown) {
    next(err)
  }
}
