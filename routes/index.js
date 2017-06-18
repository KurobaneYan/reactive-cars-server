const express = require('express')
let router = express.Router()

const db = require('../db/index')

router.get('/', function (req, res, next) {
  db.getAll()
  .then(cars => res.json(cars))
  .catch(err => res.json(err))
})

router.get('/catalog', function (req, res, next) {
  db.getCatalog()
  .then(c => res.json(c))
  .catch(err => res.json(err))
})

module.exports = router
