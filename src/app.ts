import express, { Application, Request, Response } from 'express'

const app: Application = express()

app.use('/', (req: Request, res: Response) => {
  res.status(200).send({ data: 'as' })
})

export default app
