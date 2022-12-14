
import { Request, Response, NextFunction } from 'express'
import Tx from '../interfaces/Tx.js'
import responseServices from '../services/responseServices.js'

export async function getAllResponsesCtrl (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let responses: string[]

    switch (req.params.provider) {
      case 'starton-nodereal':
        responses = await responseServices.getAll.nodereal(Number(req.params.network), req.params.address, req.params.request_id)
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
      case 'starton-nodereal':
        details = await responseServices.details.starton(Number(req.params.network), req.params.address, req.params.request_id, req.params.response_id)
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

export async function getResponseTxCtrl (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let tx: Tx = { txHash: '', timestamp: '' }

    switch (req.params.provider) {
      case 'starton-nodereal':
        tx = await responseServices.getTx.nodereal(Number(req.params.network), req.params.address, req.params.request_id, req.params.response_id)
        break
    }

    res.send({
      success: true,
      tx
    })
  } catch (err: unknown) {
    next(err)
  }
}
