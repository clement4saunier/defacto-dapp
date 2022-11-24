import { Request, Response, NextFunction } from 'express'
import IPFSServices from '../services/IPFSServices'

export async function postFileCtrl (req: Request, res: Response, next: NextFunction): Promise <void> {
  try {
    let cid: string

    switch (req.params.provider) {
      case 'starton':
        cid = await IPFSServices.post.starton(req.body.file)
        break

      case 'infura':
        cid = await IPFSServices.post.infura(req.body.file)
        break

      default:
        throw new Error('Unknown provider.')
    }

    res.send({
      success: true,
      cid
    })
  } catch (err: unknown) {
    next(err)
  }
}
