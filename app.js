import express from 'express'
import path from 'path'

import homeRouter from './routes/home.js'
import notesRouter from './routes/notes.js'

const app = express()
const port = process.env.PORT ?? 3000
const __dirname = path.resolve()

app.set('view engine', 'pug')
app.use('/static', express.static(__dirname + '/public'))

app.use('/', homeRouter)
app.use('/notes', notesRouter)


app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`))