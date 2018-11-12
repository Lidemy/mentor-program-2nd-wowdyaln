const express = require('express')
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')

// router 使用 exprss.Router ，另外引入
const routes = require('./routes/index')

// create our Express app
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views')) // this is the folder where we keep our pug files
app.set('view engine', 'pug') // we use the engine pug, mustache or EJS work great too

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, '/public')))

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
// todo: 詳看細節
app.use(session({
  secret: 'goman',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
}));


// After allllll that above middleware, we finally handle our own routes!
app.use('/', routes)


// done!
module.exports = app
