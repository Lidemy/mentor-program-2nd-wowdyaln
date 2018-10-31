// truncate all DB.

const User = require('./models').User
const Comment = require('./models').Comment
const SubComment = require('./models').SubComment

User.truncate({ truncate: true})
Comment.truncate({ truncate: true})
SubComment.truncate({ truncate: true})