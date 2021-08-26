import express from 'express'
import path from 'path'

import homeRouter from './routes/home.js'
import notesRouter from './routes/notes.js'
import archiveRouter from './routes/archive.js'
import createNoteRouter from './routes/createNote.js'
import noteDetailsRouter from './routes/noteDetails.js'

const app = express()
const port = process.env.PORT ?? 3000
const __dirname = path.resolve()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'pug')
app.use('/static', express.static(__dirname + '/public'))

// Routes handlers
app.use('/', homeRouter)
app.use('/notes', notesRouter)
app.use('/archive', archiveRouter)
app.use('/create-note', createNoteRouter)
app.use('/note', noteDetailsRouter)


app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`))