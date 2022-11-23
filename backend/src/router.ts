/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getStatementCtrl, postStatementCtrl } from './controllers/statementsCtrl'

export default Router()
  .get('/statement', getStatementCtrl)
  .post('/statement', postStatementCtrl)
