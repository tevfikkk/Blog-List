import http from 'http'

import app from './app'
import { PORT } from './utils/config'
import { info } from './utils/logger'

const server = http.createServer(app)

server.listen(PORT as string, () => {
  info(`Sever is running on port ${PORT}`)
})
