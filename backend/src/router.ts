/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getIPFSFileByIdCtrl, listRequestsCtrl, postRequestCtrl } from './controllers/statementsCtrl'
import { listResponseCtrl } from './controllers/responseCtrl'

export default Router()
  .get('/:id', getIPFSFileByIdCtrl)
  .get('/requests', listRequestsCtrl)
  .post('/requests', postRequestCtrl)
  .get('/responses', listResponseCtrl)
