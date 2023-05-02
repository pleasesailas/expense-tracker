const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const record = require('../../models/record')


router.get('/', async (req, res) => {
  try {
    let totalAmount = 0
    const categories = await Category.find().lean()
    const records = await Record.find().populate('categoryId').lean().sort({ date:'desc' })

    const finalRecords = records.map((record) => {
      totalAmount += record.amount
      record.date = record.date.toLocaleDateString('zu-Za')
      return record
    })
    res.render('index', { finalRecords, categories, totalAmount })
  } catch(err) {
    console.log(err)
  }
})

module.exports = router