const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

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
    const userId = req.user._id
    const data = req.body
    const referenceCategory = await Category.findOne({ name: data.category }).lean()
    // 如果referenceCategory 沒找到回傳 null 避免回傳defined產生bug
    const categoryId = referenceCategory ? referenceCategory._id : null 
    await Record.create({ ...data, userId, categoryId })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

//update
router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const categories = await Category.find().lean()
    const record = await Record.findOne({ _id, userId }).lean()
    record.date = record.date.toLocaleDateString('zu-Za')
    res.render('edit', { record, categories })
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const data = req.body
    const referenceCategory = await Category.findOne({ name: data.category }).lean()
    const categoryId = referenceCategory ? referenceCategory._id : null
    const update = { ...data, userId, categoryId }
    await Record.findOneAndUpdate({ _id, userId }, update, { new: true })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})
//delete
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    await Record.findOneAndDelete({ _id, userId })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router