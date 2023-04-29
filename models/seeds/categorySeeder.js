const db = require('../../config/mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Categories = require('../category')
const categories = [
  { name: '家居物業', icon: '<i class="fa-solid fa-house"></i>' },
  { name: '交通出行', icon: '<i class="fa-solid fa-van-shuttle"></i>' },
  { name: '休閒娛樂', icon: '<i class="fa-solid fa-face-grin-beam"></i>' },
  { name: '餐飲食品', icon: 'i class="fa-solid fa-utensils"></i>' },
  { name: '其他', icon: '<i class="fa-solid fa-pen"></i>' }
]

db.once('open', () => {
  Promise.all([
    Categories.create(categories)
  ])
    .then(() => {
      console.log('done!')
      process.exit()
    })
    .catch(err => console.log(err))
})