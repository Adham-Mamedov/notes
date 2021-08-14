import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()
const __dirname = path.resolve()

const dbPath = path.resolve(__dirname, 'database/notes.json')

router.get('/', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if(err) return res.sendStatus(500)
    const notes = JSON.parse(data)

    res.render('allNotes', {notes: notes})
  })
})

router.delete('/delete/:id', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if(err) return res.sendStatus(500)
    const notes = JSON.parse(data)
    const id = req.params.id
    notes = notes.filter(el => el.id !== id)

    res.render('allNotes', {notes: notes})
  })
})


export default router