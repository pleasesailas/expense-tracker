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
  failureRedirect: '/users/login',
  failureFlash: true
}))

//register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if ( !email || !password ) {
      errors.push({ message: '信箱與密碼必填！'})
    }
    if(password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符！' })
    }
    if(errors.length) {
      return res.render('register', { errors, name, email, password, confirmPassword })
    }
    const registeredUser = await User.findOne({ email })
    if (registeredUser) {
      errors.push({ message: '此email已經被註冊！' })
      return res.render('register', { errors, name, email, password, confirmPassword })
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
  req.flash('success_msg', '您已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router