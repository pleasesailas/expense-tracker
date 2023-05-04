const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

//read all
router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    let totalAmount = 0
    const categories = await Category.find().lean()
    const records = await Record.find({ userId }).populate('categoryId').lean().sort({ date:'desc' })

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