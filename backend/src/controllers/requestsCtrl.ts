import { NextFunction, Request, Response } from 'express'
import requestsService from '../services/requestsServices'

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
    const cid: string = await requestsService.post(req.body.file)

    res.send({
      success: true,
      cid
    })
  } catch (err: unknown) {
    next(err)
  }
}
