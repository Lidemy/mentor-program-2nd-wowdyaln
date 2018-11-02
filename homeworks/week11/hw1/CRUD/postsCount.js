const User = require('../models').User
const Comment = require('../models').Comment
const SubComment = require('../models').SubComment


Comment.count().then(counts => {
  // how many pages ?
  let pages_count = Math.ceil(counts / 10);
  console.log(pages_count);

        // 設定目前頁數

})



