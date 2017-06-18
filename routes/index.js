const express = require('express')
let router = express.Router()

const db = require('../db/index')

router.get('/', function (req, res, next) {
  db.getAll()
  .then(cars => res.json(cars))
  .catch(error => res.json({error: error}))
})

router.get('/catalog', function (req, res, next) {
  db.getCatalog()
  .then(c => res.json(c))
  .catch(error => res.json({error: error}))
})

router.post('/create', function (req, res, next) {
  db.create(req.body)
  .then(c => res.json(c))
  .catch(error => res.json({error: error}))
})

router.get('/read/:id', function (req, res, next) {
  db.read(req.params.id)
  .then(c => res.json(c))
  .catch(error => res.json({error: error}))
})

router.put('/update/:id', function (req, res, next) {
  db.update(req.params.id, req.body)
  .then(c => res.json(c))
  .catch(error => res.json({error: error}))
})

module.exports = router
