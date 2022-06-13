import bodyParser from 'body-parser'
import express, { Application } from 'express'
import mongoose from 'mongoose'

import { blogRouter } from './controllers/blogController'
import { userRouter } from './controllers/userController'
import { MONGO_URI } from './utils/config'
import { errorMessage, info } from './utils/logger'
import {
  errorHandler,
  requestLogger,
  unknownEndpoint
} from './utils/middleware'

const app: Application = express()

info('Starting server...', MONGO_URI)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    info('Connected to MongoDB')
  })
  .catch((error: Error) => {
    errorMessage('error connecting to MongoDB', error.message)
  })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
