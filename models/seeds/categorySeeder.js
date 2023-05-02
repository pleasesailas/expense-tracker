const db = require('../../config/mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category')
const categories = require('../seedsData/category.json')
db.once('open', () => {
  Promise.all([
    Category.create(categories)
  ])
    .then(() => {
      console.log('categories created done!')
      process.exit()
    })
    .catch(err => console.log(err))
})