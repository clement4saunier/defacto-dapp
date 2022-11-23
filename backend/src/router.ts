/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { listRequestsCtrl, postRequestCtrl } from './controllers/requestsCtrl'
import { listResponseCtrl } from './controllers/responseCtrl'
import { getIPFSFileByIdCtrl } from './controllers/IPFSCtrl'

export default Router()
  .get('/:id', getIPFSFileByIdCtrl)
  .get('/requests', listRequestsCtrl)
  .post('/requests', postRequestCtrl)
  .get('/responses', listResponseCtrl)
