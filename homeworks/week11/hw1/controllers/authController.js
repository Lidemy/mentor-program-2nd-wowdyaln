const User = require('../models').User
const Comment = require('../models').Comment
const SubComment = require('../models').SubComment

const bcrypt = require('bcrypt');
const saltRounds = 5;

exports.loginForm = (req, res, next) => {
  //* Access the session as req.session
  let username = req.session.username
  res.render('login', {
    username: username
  })
}

exports.login = (req, res, next) => {

  User.findOne({
    where: {
      username: req.body.username
    }
  }).then( u => {
    if (!u) {
      // db 沒有這個使用者
      // res.status(403).json({ error: "password is wrong or user not found."})
      res.redirect('/login')

    } else {
      let match = bcrypt.compareSync(req.body.password, u.password)

      if (match) {
        // 驗證OK，login
        req.session.username = u.username
        req.session.nickname = u.nickname
        req.session.user_id = u.id
        res.redirect('/comments')

      } else {
        // password 錯誤
        // res.status(403).json({ error: "password is wrong or user not found." })
        res.redirect('/login')
      }
    }
  })
}


exports.signupForm = (req, res, next) => {
  res.render('signup')
}

exports.signup = (req, res, next) => {
  console.log(req.body);
  let { username, nickname } = req.body
  let hashedPW = bcrypt.hashSync(req.body.password, saltRounds)

  User.create({
      username,
      nickname,
      password: hashedPW 
    })
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
