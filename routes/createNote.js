import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()
const __dirname = path.resolve()

const dbPath = path.resolve(__dirname, 'database/notes.json')

router.get('/', (req, res) => {
  res.render('createNote')
})

router.post('/', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if(err) return res.sendStatus(500)
    const notes = JSON.parse(data)
    
    notes.push({
      id: '_11212',
      title: req.body.title,
      description: req.body.description,
      archive: false
    })

    res.render('createNote') //todo Show message
  })
})


export default router