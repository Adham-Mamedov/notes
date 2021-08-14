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
    notes = notes.filter(el => !el.archive)

    res.render('allNotes', {notes: notes, title: 'All notes:'})
  })
})

router.delete('/delete/:id', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if(err) return res.sendStatus(500)
    const notes = JSON.parse(data)
    const id = req.params.id
    notes = notes.filter(el => el.id !== id)

    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
      if(err) return res.sendStatus(500)
      notes = notes.filter(el => !el.archive)
      res.render('allNotes', {notes: notes, title: 'All notes:'})
    })    
  })
})


export default router