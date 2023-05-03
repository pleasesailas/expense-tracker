const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')


const app = express()
const port = 3000

//mongoose
require('./config/mongoose')
//view
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
//method-override
app.use(methodOverride('_method'))
//public
// app.use(express.static('public'))
//body-parser
app.use(express.urlencoded({ extended: true }))
//routes
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})