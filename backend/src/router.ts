/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getAllRequestsCtrl, getRequestDetailsCtrl, getRequestTxCtrl } from './controllers/requestsCtrl.js'
import { getAllResponsesCtrl, getResponseDetailsCtrl, getResponseTxCtrl } from './controllers/responseCtrl.js'
import { postFileCtrl } from './controllers/IPFSCtrl.js'

export default Router()
  .get('/requests/:provider/:network/:address', getAllRequestsCtrl) // List requestsIds (on-chain); address = contract address
  .get('/request/:provider/:network/:address/:request_id', getRequestDetailsCtrl) // get request details (on-chain)
  .get('/request-tx/:provider/:network/:address/:request_id', getRequestTxCtrl) // get transaction of the request
  .get('/responses/:provider/:network/:address/:request_id', getAllResponsesCtrl) // List responseIds (on-chain)
  .get('/response/:provider/:network/:address/:request_id/:response_id', getResponseDetailsCtrl) // get response details (on-chain)
  .get('/response-tx/:provider/:network/:address/:request_id/:response_id', getResponseTxCtrl) // get transaction of the request
  .post('/ipfs/:provider', postFileCtrl) // post a file (IPFS)
