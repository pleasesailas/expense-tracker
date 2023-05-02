const express = require('express')
const router = express.Router()
const Records = require('../../models/record')


router.get('/', (req, res) => {
  res.render('index', { record })
  Records.find()
    .lean()
    .then((record) => res.render('index', { record }))
    .catch(err => console.log(err))
})

//create
//read
//update
//delete

module.exports = router