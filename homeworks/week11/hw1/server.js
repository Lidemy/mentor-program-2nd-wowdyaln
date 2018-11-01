const app = require('./app')
app.set('port', process.env.PORT || 3000)
// const express = require('express')
// const bodyParser = require('body-parser')
// const path = require('path')
const User = require('./models').User  // 爲什麼可以這樣用？
const Comment = require('./models').Comment

// const app = express()

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, 'public')));
// 


// User.findAll({
//   include: [Comment]
// }).then( users => {
//   // console.log(users);
//   console.log(users[0].Comments);
// })




const server = app.listen( app.get('port'), ()=>{
  console.log(`server running ${server.address().port}`);
})
// app.post('/addComment', (req, res)=> {
//   let {user, password, nickname, comment} = req.body
//   console.log(`user: ${user}, password: ${password}, nickname: ${nickname}, comment: ${comment}`);
//   User.findOne({ where: 
//                   { username: user } 
//               })
//     .then( u => { 
//       if(u){
//         console.log(u);
//         u.createComment({
//           content: comment
//     })
     
//     } else {
//       console.log("no user ... ");
//       User.create({
//         username: user,
//         password: password,
//         nickname: nickname
//       })
//       .then((u) => {
//         u.createComment({
//           content: comment
//         })
//       })
//       .catch(err => {
//         console.log(err)
//       })
//     }
//   })
 
// })

// app.listen('3000', ()=> {
//   console.log("lesten port 3000 ... ");
// })