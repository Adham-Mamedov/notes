import express from 'express'
import fs from 'fs'
import path from 'path'
import uniqueId from '../utils/uniqueId.js'
import multer from 'multer'

const router = express.Router()
const __dirname = path.resolve()

const dbPath = path.resolve(__dirname, 'database/notes.json')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/images'))
  },
  filename: function (req, file, cb) {
    cb(null, uniqueId() + file.originalname)
  }
})

const upload = multer({ storage: storage })

router.get('/', (req, res) => {
  res.render('createNote')
})

router.post('/', upload.single('file'), (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if(err) return res.sendStatus(500)
    const notes = JSON.parse(data)
    
    notes.push({
      id: uniqueId(),
      title: req.body.title,
      description: req.body.description,
      archive: false,
      file: req.file?.filename ?? 'default.jpg'
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