const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//create
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  Record.create()
})
//read

//update
//delete

module.exports = router