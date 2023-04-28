const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
  const CATEGORY = {
    家居物業: "https://fontawesome.com/icons/home?style=solid",
    交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
    休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
    餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
    其他: "https://fontawesome.com/icons/pen?style=solid"
  }
  const test = [{
    id: 1,
    icon: "fa-solid fa-utensils",
    name: '午餐',
    date: '2019/04/23',
    cost: 60,
  }, {
    id: 2,
    icon: "fa-solid fa-utensils",
    name: '晚餐',
    date: '2019/04/23',
    cost: 60,
  }
  ]
  res.render('index', { test })
})

//create
//read
//update
//delete

module.exports = router