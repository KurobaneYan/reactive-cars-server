const express = require('express')
let router = express.Router()

const db = require('../db/index')

const show = (promise, res) => {
  promise
  .then(data => res.json(data))
  .catch(error => res.status(500).json({ error: error }))
}

router.get('/', (req, res, next) => {
  show(db.getAll(), res)
})

router.get('/catalog', (req, res, next) => {
  show(db.getCatalog(), res)
})

router.get('/show/:id', (req, res, next) => {
  show(db.show(req.params.id), res)
})

router.post('/create', (req, res, next) => {
  show(db.create(req.body), res)
})

router.get('/read/:id', (req, res, next) => {
  show(db.read(req.params.id), res)
})

router.put('/update/:id', (req, res, next) => {
  show(db.update(req.params.id, req.body), res)
})

router.delete('/delete/:id', (req, res, next) => {
  show(db.delete(req.params.id), res)
})

module.exports = router
