const passport = require('passport')

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/comments/1'
})


exports.logout = (req, res)=> {
  req.logout()
  res.redirect('/comments/1')
}