// 所有 routes 定義在這邊
const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')
const authController = require('../controllers/authController')
const urlController = require('../controllers/urlController')

// * message Board
// show all posts
router.get('/comments', commentController.showPage )
// create a new post
router.post('/comments', commentController.createMainComment)
router.post('/comments/:comment_id', commentController.createSubComment)

// login / logout / sign up
router.get('/login', authController.loginForm)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/signup', authController.signupForm)
router.post('/signup', authController.signup)

// update a post
router.put('/comments/:comment_id', commentController.update)

// delete a post
router.delete('/comments/:comment_id', commentController.delete)


// * shorten Url
router.get('/stnurl', urlController.showPage)
router.post('/stnurl', urlController.createStnurl)
router.get('/stnurl/:short', urlController.redirect)





module.exports = router　