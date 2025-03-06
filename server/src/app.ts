import cors from 'cors'
import express from 'express'

import bodyParser from 'body-parser'
import { errorHandler } from './middleware/error'
import { router } from './routes'

import env from '@/services/env'

const app = express()

app.use(cors({ origin: env.ORIGIN }))

app.use(bodyParser.json())

app.use(router)

app.use(errorHandler)

app.listen(env.PORT, () => {
  console.log(`Server is listening on port ${env.PORT}`)
})
