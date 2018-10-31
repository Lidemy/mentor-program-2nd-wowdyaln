const User = require('../models').User
const Comment = require('../models').Comment

  // delete
let u_id = 25
User.findById(u_id)
        .then( c => {
          c.destroy()
        })

// Comment.findById()