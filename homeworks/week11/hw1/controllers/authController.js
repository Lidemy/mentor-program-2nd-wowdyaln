const User = require('../models').User
const Comment = require('../models').Comment
const SubComment = require('../models').SubComment

exports.loginForm = (req, res, next) => {
  //* Access the session as req.session
  let username = req.session.username
  res.render('login', {
    username: username
  })
}

exports.login = (req, res, next) => {
  console.log(req.body);
  User.find({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  })
  .then( user => {
    console.log(user.nickname);
    req.session.username = user.username  
    req.session.nickname = user.nickname 
    req.session.user_id = user.id
    res.redirect('/comments') 
  })

  // res.end('test')
}

exports.signupForm = (req, res, next) => {
  res.render('signup')
}

exports.signup = (req, res, next) => {
  console.log(req.body);
  let { username, nickname, password} = req.body
  User.create({
              username,
              nickname,
              password })
      .then( () => {
        //* Access the session as req.session
        req.session.username = username
        req.session.nickname = nickname
        res.redirect('/comments')
      })
      .catch( (err)=> {
        console.log(err);
      })
}



exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect('/comments')
}
