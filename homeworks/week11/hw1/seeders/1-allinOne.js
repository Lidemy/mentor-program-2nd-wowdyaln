// 'use strict';
// strict 會出問題... why？？
const User = require('../models').User
const Comment = require('../models').Comment
const SubComment = require('../models').SubComment
// data
const usernames = require('../seedData/data').usernames
const nicknames = require('../seedData/data').nicknames
const comments = require('../seedData/data').comments

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

async function findUserIds() {
  let userIds = []
  await User.findAll({ attributes: ['id'] })
    .then(users => {
      users.forEach(user => {
        userIds.push(user.dataValues.id)
      })
    })
  return userIds
}

async function insertComments(interface, num){
  let userIds = await findUserIds()
  let posts = []

  for (let i = 0; i < num; i++) {
    let content = comments[Math.floor(Math.random() * comments.length)]
    let user_id = userIds[Math.floor(Math.random() * userIds.length)]
    let post = {
      content,
      user_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    posts.push(post)
  }

  interface.bulkInsert('comments', posts)
  console.log('insertComments, done.');
}

async function findCommentIds(){
  let commentIds = []
  await Comment.findAll({ attributes: ['id']})
        .then( comments => {
          comments.forEach( comment => {
            commentIds.push(comment.dataValues.id)
          })
        })
  return commentIds
}

async function insertSubComments(interface, num){
  let userIds = await findUserIds()
  let commentIds = await findCommentIds()
  let subPosts = []

  for (let i = 0; i < num; i++) {
    let content = comments[Math.floor(Math.random() * comments.length)]
    let user_id = userIds[Math.floor(Math.random() * userIds.length)]
    let comment_id = commentIds[Math.floor(Math.random() * commentIds.length)]
    let post = {
      content,
      user_id,
      comment_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    subPosts.push(post)
  }

  interface.bulkInsert('subComments', subPosts)
  console.log('insertSubComments, done.');
  
}

async function insertUsers(interface){
  const nicks = shuffle(nicknames)
  let userAry = []

  usernames.forEach((u, index) => {
    let user = {
      username: u,
      nickname: nicks[index],
      password: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    userAry.push(user)
  })

  interface.bulkInsert('users', userAry) 
  console.log('insertUsers, done.');
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // insert into users table.
    await insertUsers(queryInterface)  // username is UNIQUE
    // insert into comments table.
    await insertComments(queryInterface, 50)

    // insert into subComments table.
    await insertSubComments(queryInterface, 100)
    // bulkInsert 每次最多可以 insert 3000 筆。
    // insertSubComments(), 如果 insertComments() 時候建立太多 comments 會有 bug , comment_id 會抓不到，或是整個不執行寫入 subComments table 了
  },

  down: async (queryInterface, Sequelize) => {
    await User.truncate({ truncate: true })
    await Comment.truncate({ truncate: true })
    await SubComment.truncate({ truncate: true })
  }
};
