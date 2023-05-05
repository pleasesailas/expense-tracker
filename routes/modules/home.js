const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

//read all
router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    let totalAmount = 0
    const categories = await Category.find().lean().sort({ _id: 'asc' })
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

//category filter
router.get('/filter', async (req, res) => {
  try {
    const userId = req.user._id
    const selectCategoryName = req.query.filterSelect
    let totalAmount = 0
    const categories = await Category.find().lean().sort({ _id: 'asc' })
    const selectCategory = await Category.findOne({ name: selectCategoryName })
    const categoryId = selectCategory ? selectCategory._id : null
    const records = await Record.find({ categoryId, userId }).populate('categoryId').lean().sort({ date: 'desc' })
    const finalRecords = await records.map((record) => {
      totalAmount += record.amount
      record.date = record.date.toLocaleDateString('zu-Za')
      return record
    })
    res.render('index', { finalRecords, categories, totalAmount })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router