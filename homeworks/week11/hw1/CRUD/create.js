const User = require('../models').User  // 爲什麼可以這樣用？

// User.create({
//   username: 'Peter',
//   password: '123',
//   nickname: 'dog'
// })
// .then((u) => {
//   u.createComment({ 
//     content: 'hello, this is peter.'
//   })
// })
// .catch(err => {
//   console.log(err)
// })

let u_id = 10

User.findById(u_id)
.then((u) => {
  u.createComment({ 
    content: `this is ${u.username}, this is my comment.`
  })
  .then((c)=> {
    c.createSubComment({
      content: `'${u.username}' also leave a subcomment here`,
      user_id: c['user_id']
    })
  })
})
.catch(err => {
  console.log(err)
})
