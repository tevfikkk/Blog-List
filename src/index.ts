import express, { Application, Request, Response } from 'express'

import { PORT } from './utils/config'
import { info } from './utils/logger'

const app: Application = express()

app.use('/', (req: Request, res: Response) => {
  res.status(200).send({ data: 'as' })
})

app.listen(PORT, () => {
  info(`Sever is running on port ${PORT}`)
})
