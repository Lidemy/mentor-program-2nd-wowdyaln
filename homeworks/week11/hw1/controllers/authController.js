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

  // todo: hash(password) === hashFromDB
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

  // todo: password --> hash function --> hash
  User.create({
              username,
              nickname,
              password })
      .then((user) => {
        //* Access the session as req.session
        req.session.username = user.username
        req.session.nickname = user.nickname
        req.session.user_id = user.id
        res.redirect('/comments')
      })
      .catch( (err)=> {
        console.log(err);
        res.status(400).send(err)  // todo: 回覆必須資訊就好了
      })
}



exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect('/comments')
}
