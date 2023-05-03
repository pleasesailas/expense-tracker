const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')
const record = require('../../models/record')

//create
router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find().lean().sort({ _id: 'asc' })
    res.render('new', { categories })
  } catch (err) {
    console.log(err)
  }
})
router.post('/new', async (req, res) => {
  try {
    const data = req.body
    const referenceCategory = await Category.findOne({ name: data.category }).lean()
    await Record.create({ ...data, categoryId: referenceCategory._id })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

//update
router.get('/:id/edit', async (req, res) => {
  try {
    const { id } = req.params
    const categories = await Category.find().lean()
    const record = await Record.findById(id).lean()
    record.date = record.date.toLocaleDateString('zu-Za')
    res.render('edit', { record, categories })
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const referenceCategory = await Category.findOne({ name: data.category }).lean()
    const update = { ...data, categoryId: referenceCategory._id }
    await Record.findByIdAndUpdate(id, update)
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})
//delete
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Record.findByIdAndDelete(id)
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router