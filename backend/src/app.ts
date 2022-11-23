/* eslint-disable @typescript-eslint/no-misused-promises */
import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import getStatementCtrl from './controllers/getStatementCtrl'
import postStatementCtrl from './controllers/postStatementCtrl'
dotenv.config()

function main (): void {
  const app: Application = express()

  app.use(express.json())

  app.post('/statement', postStatementCtrl)

  app.get('/statement/:id', getStatementCtrl)

  app.listen(process.env.PORT, () => {
    console.log('DeFacto server online on port ', String(process.env.PORT))
  })
}

main()
