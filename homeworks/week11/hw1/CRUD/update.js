const User = require('../models').User
const Comment = require('../models').Comment

Comment.findById(3)
  .then(c => {
    c.update(
      {
        content: 'update this comment'
      },

    )
  })