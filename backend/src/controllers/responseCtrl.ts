
import { Request, Response, NextFunction } from 'express'
import responseService from '../services/responseService'

export async function listResponseCtrl (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const responses = await responseService.list()

    res.send({
      success: true,
      responses
    })
  } catch (err: unknown) {
    next(err)
  }
}
