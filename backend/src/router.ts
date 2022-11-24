/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getAllRequestsCtrl, getRequestDetailsCtrl } from './controllers/requestsCtrl'
import { getAllResponsesCtrl, getResponseDetailsCtrl } from './controllers/responseCtrl'
import { postFileCtrl } from './controllers/IPFSCtrl'

export default Router()
  .get('/requests/:provider/:network/:address', getAllRequestsCtrl) // List requestsIds (on-chain); address = contract address
  .get('/request/:provider/:network/:address/:request_id', getRequestDetailsCtrl) // get request details (on-chain)
  .post('/ipfs/:provider', postFileCtrl) // post a file (IPFS)
  .get('/responses/:provider/:network/:address/:request_id', getAllResponsesCtrl) // List responseIds (on-chain)
  .get('/response/:provider/:network/:address/:request_id/:response_id', getResponseDetailsCtrl) // get response details (on-chain)
