
import { Request, Response, NextFunction } from 'express'
import responseServices from '../services/responseServices'

export async function getAllResponsesCtrl (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let responses: string[]

    switch (req.params.provider) {
      case 'starton':
        responses = await responseServices.getAll.starton(req.params.request_id)
        break

      default:
        throw new Error('Unknown provider.')
    }

    res.send({
      success: true,
      responses
    })
  } catch (err: unknown) {
    next(err)
  }
}

export async function getResponseDetailsCtrl (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // const details = {} // await axios.get
    let details

    switch (req.params.provider) {
      case 'starton':
        details = await responseServices.details.starton(req.params.request_id, req.params.response_id)
        break

      default:
        return
    }

    res.send({
      success: true,
      details
    })
  } catch (err: unknown) {
    next(err)
  }
}
