const express = require('express')
let router = express.Router()

const db = require('../db/index')

router.get('/', (req, res, next) => {
  db.getAll()
  .then(cars => res.json(cars))
  .catch(error => res.json({error: error}))
})

router.get('/catalog', (req, res, next) => {
  db.getCatalog()
  .then(c => res.json(c))
  .catch(error => res.json({error: error}))
})

router.post('/create', (req, res, next) => {
  db.create(req.body)
  .then(c => res.json(c))
  .catch(error => res.json({error: error}))
})

router.get('/read/:id', (req, res, next) => {
  db.read(req.params.id)
  .then(c => res.json(c))
  .catch(error => res.json({error: error}))
})

router.put('/update/:id', (req, res, next) => {
  db.update(req.params.id, req.body)
  .then(c => res.json(c))
  .catch(error => res.json({error: error}))
})

router.delete('/delete/:id', (req, res, next) => {
  db.delete(req.params.id)
  .then(c => res.json(c))
  .catch(error => res.json({error: error}))
})

module.exports = router
