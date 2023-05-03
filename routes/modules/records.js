const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')

//create
router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find().lean().sort({ _id:'asc' })
    res.render('new', { categories })
  } catch(err) {
    console.log(err)
  }
})
router.post('/new', async (req, res) => {
  try {
    const data = req.body
    const categories = await Category.find().lean()
    const referenceCategory = categories.find(category => category.name === data.category)
    data.categoryId = referenceCategory._id
    await Record.create(data)
    res.redirect('/')
  } catch(err) {
    console.log(err)
  }
})
//read

//update
//delete

module.exports = router