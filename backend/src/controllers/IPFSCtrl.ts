import { Request, Response, NextFunction } from 'express'
import IPFSServices from '../services/IPFSServices'

export async function getIPFSFileByIdCtrl (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const request = await IPFSServices.get(req.params.id)

    res.send({ success: true, request })
  } catch (err: unknown) {
    next(err)
  }
}
