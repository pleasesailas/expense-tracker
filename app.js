const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const routes = require('./routes')

const app = express()


//mongoose
require('./config/mongoose')
const port = process.env.PORT
//view
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
//passport
usePassport(app)
//method-override
app.use(methodOverride('_method'))
//session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
//public
// app.use(express.static('public'))
//body-parser
app.use(express.urlencoded({ extended: true }))
//routes
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})