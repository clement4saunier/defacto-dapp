/* eslint-disable @typescript-eslint/no-misused-promises */
import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import router from './router.js'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js'

dotenv.config()

function main (): void {
  const app: Application = express()

  app.use(cors())
  app.use(express.json())
  app.use(router)
  app.use(errorHandler)

  app.listen(process.env.PORT, () => {
    console.log('DeFacts server is online on port ', String(process.env.PORT))
  })
}

main()
