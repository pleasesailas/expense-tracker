const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

//login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    const registeredUser = await User.findOne({ email })
    if (registeredUser) {
      console.log('This account is exist.')
      res.render('register', { name, email, password, confirmPassword })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.create({ name, email, password: hash })
    return res.redirect('/users/login')
  } catch (error) {
    console.log(error)
  }
})

//logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router