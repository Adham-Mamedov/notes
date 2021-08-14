import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()
const __dirname = path.resolve()

const dbPath = path.resolve(__dirname, 'database/notes.json')

router.get('/:id', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if(err) return res.sendStatus(500)
    const notes = JSON.parse(data)
    const note = notes.find(el => el.id === req.params.id)
    
    res.render('noteDetails', {note: note})
  })
})


export default router