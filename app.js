const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const usePassport = require('./config/passport')
const routes = require('./routes')

const app = express()

//mongoose
require('./config/mongoose')
const port = process.env.PORT
//view
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
//method-override
app.use(methodOverride('_method'))
//body-parser
app.use(express.urlencoded({ extended: true }))
//session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
//passport
usePassport(app)
//flash
app.use(flash())
//isAuthenticated middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error')
  next()
})
//routes
app.use(routes)
//listening
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})