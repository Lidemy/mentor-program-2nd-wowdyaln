const express = require('express')
// const session = require('express-session')
const path = require('path')
// const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// const passport = require('passport')
// const promisify = require('es6-promisify')
// const flash = require('connect-flash')
// const expressValidator = require('express-validator')

// router 使用 exprss.Router ，另外引入
const routes = require('./routes/index')
const helpers = require('./helpers')
const errorHandlers = require('./handlers/errorHandlers')

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

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
// app.use(expressValidator())

// populates req.cookies with any cookies that came along with the request
// app.use(cookieParser())

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
// app.use(session({
//   secret: process.env.SECRET,
//   key: process.env.KEY,
//   resave: false,
//   saveUninitialized: false,
// }))

// Passport JS is what we use to handle our logins
// app.use(passport.initialize())
// app.use(passport.session())

// The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
// app.use(flash())

/*
在調用res.render的時候，express合併（merge）了3處的結果後傳入要渲染的模板
優先順序：res.render傳入的對象> res.locals對象> app.locals對象
所以app.locals和res.locals幾乎沒有區別，
使用上的區別在於：app.locals上通常掛載常量信息（如博客名、描述、作者信息）
res.locals上通常掛載變量信息，即每次請求可能的值都不一樣（如請求者信息，res.locals.user = req.session.user）
*/
// http://expressjs.com/en/4x/api.html#res.locals
app.use((req, res, next) => {
  res.locals.h = helpers
  // res.locals.flashes = req.flash()
  res.locals.user = req.user || null
  res.locals.currentPath = req.path
  next()
})

// promisify some callback based APIs
// app.use((req, res, next) => {
//   req.login = promisify(req.login, req)
//   next()
// })

// After allllll that above middleware, we finally handle our own routes!
app.use('/', routes)

// If that above routes didnt work, we 404 them and forward to error handler
// app.use(errorHandlers.notFound)

// One of our error handlers will see if these errors are just validation errors
// app.use(errorHandlers.flashValidationErrors)

// Otherwise this was a really bad error we didn't expect! Shoot eh
// if (app.get('env') === 'development') {
//   /* Development Error Handler - Prints stack trace */
//   app.use(errorHandlers.developmentErrors)
// }

// // production error handler
// app.use(errorHandlers.productionErrors)

// done!
module.exports = app
