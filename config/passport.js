const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = (app) => {
  //init
  app.use(passport.initialize())
  app.use(passport.session())
  //configure LocalStrategy
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback:true }, async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email })
      if(!user) {
        return done(null, false, req.flash('error', '此信箱尚未註冊！'))
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch) {
        return done(null, false, req.flash('error', '帳號或密碼錯誤！'))
      }
      return done(null, user)
    } catch (error) {
      console.log(error)
    }
  }))

  //serialize & deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      return done(null, user)
    } catch (err) {
      done(err, null)
    }
  })
}