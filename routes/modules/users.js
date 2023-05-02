const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then((user) => {
      if(user) {
        console.log('This account is exist.')
        res.render('register', { name, email, password, confirmPassword })
      }
      User.create({ name, email, password })
        .then(() => {
          res.redirect('/login')
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router