import cors from 'cors'
import express from 'express'

import bodyParser from 'body-parser'
import { errorHandler } from './middleware/error'
import { router } from './routes'

import env from '@/services/env'
import session from 'express-session'

const app = express()

app.use(cors({ origin: env.ORIGIN, credentials: true }))

app.use(bodyParser.json())

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000, // 72 hours
    },
  })
)

app.use(router)

app.use(errorHandler)

app.listen(env.PORT, () => {
  console.log(`Server is listening on port ${env.PORT}`)
})
