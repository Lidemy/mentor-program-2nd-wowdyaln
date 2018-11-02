const User = require('../models').User
const Comment = require('../models').Comment
const SubComment = require('../models').SubComment

User.findOne({
  where: { username: " Fitzgerald" }
  // where: { username: "Scott and Zelda Fitzgerald" }
})
  .then((u) => {
    if (u){
      console.log(`good , find user : ${u.username}`)
    } else {
      console.log("sorry, no user.");
    }
  })
  .catch(err => {
    console.log(err)
  })