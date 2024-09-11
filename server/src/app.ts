import express from 'express'

import { router } from './routes'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())

app.use(router)

const port = 3020

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
