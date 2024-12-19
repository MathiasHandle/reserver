import express from 'express'

import { router } from './routes'
import bodyParser from 'body-parser'
import { errorHandler } from './middleware/error'

const app = express()

app.use(bodyParser.json())

app.use(router)

app.use(errorHandler)

const port = 3020

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
