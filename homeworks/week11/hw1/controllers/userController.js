const User = require('../models').User
const Comment = require('../models').Comment
const SubComment = require('../models/').SubComment

exports.authLogin = (req, res)=> {
  let { username, password } = req.body

  User.findOne({
    where: {username: username}
  })
    .then((u) => {
      if (u && u.password === password){
        console.log(`login !! welcome !! ${u.username}`)
        res.cookie(u.username, password, {maxAge: 1000 * 60 * 3})
        res.redirect('/')
      } else {
        console.log("something wrong");
      }
    })
    .catch(err => {
      console.log(err)
    })
}


