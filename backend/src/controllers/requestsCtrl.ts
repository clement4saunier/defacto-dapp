import { NextFunction, Request, Response } from 'express'
import RequestDetails from '../interfaces/RequestDetails'
import requestsServices from '../services/requestsServices'

export async function getAllRequestsCtrl (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let requests: string[]

    switch (req.params.provider) {
      case 'starton':
        requests = await requestsServices.getAll.starton(req.params.network, req.params.address)
        break
      case 'nodereal':
        requests = await requestsServices.getAll.nodereal(Number(req.params.network), req.params.address)
        break
      default:
        throw new Error('Unknown provider.')
    }

    res.send({
      success: true,
      requests
    })
  } catch (err: unknown) {
    next(err)
  }
}

export async function getRequestDetailsCtrl (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let details: RequestDetails

    switch (req.params.provider) {
      case 'starton':
        details = await requestsServices.details.starton(Number(req.params.network), req.params.address, req.params.request_id)
        break

      default:
        throw new Error('Unknown provider.')
    }

    res.send({
      success: true,
      details
    })
  } catch (err: unknown) {
    next(err)
  }
}
