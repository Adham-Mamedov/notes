import express from 'express'
import fs from 'fs'
import path from 'path'
import uniqueId from '../utils/uniqueId.js'

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
      id: uniqueId(),
      title: req.body.title,
      description: req.body.description,
      archive: false
    })

    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
      if(err) return res.sendStatus(500).render('createNote', {message: {
        text: 'Error! Something went wrong.',
        type: 'danger'
      }})
    })
  })
  res.render('createNote', {message: {
    text: 'Success! Note was created.',
    type: 'primary'
  }})
})


export default router