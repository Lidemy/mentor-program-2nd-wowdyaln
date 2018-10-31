const User = require('../models').User
const Comment = require('../models').Comment
const SubComment = require('../models').SubComment

let u_id = 10
// read
User.findById(u_id)
  .then(u => {
    u.getComments()
      .then(post => {
        console.log(`'${u.username}' has '${post.length}' posts `);
        post.forEach(subc => {
          console.log(subc.dataValues);
        })
      })
    u.getSubComments()
      .then(subPost => {
        console.log(`'${u.username}' has '${subPost.length}' subPosts `);
        subPost.forEach(subc => {
          console.log(subc.dataValues);
        })
      })
  })

Comment.findAll().then( posts => console.log(`there are ${posts.length} posts.`) )
SubComment.findAll().then( posts => console.log(`there are ${posts.length} sub posts.`) )