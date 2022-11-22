import * as dotenv from 'dotenv'
dotenv.config()
import express, { Application, Request, Response } from 'express'

function main () {
    const app: Application = express()

    app.get('/', (req: Request, res: Response) => {
        res.send({ success: true })
    })

    app.listen(process.env.PORT, () => {
        console.log('DeFacto server online on port ', String(process.env.PORT))
    })
}

main()
