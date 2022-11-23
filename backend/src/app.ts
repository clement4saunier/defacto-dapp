/* eslint-disable @typescript-eslint/no-misused-promises */
import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import router from './router'
dotenv.config()

function main (): void {
  const app: Application = express()

  app.use(express.json())
  app.use(router)

  app.listen(process.env.PORT, () => {
    console.log('DeFacto server online on port ', String(process.env.PORT))
  })
}

main()
