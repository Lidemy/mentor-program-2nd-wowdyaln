// 所有 routes 定義在這邊
const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')
const userController = require('../controllers/userController')

// router.get('/', commentController.homePage )

// router.get('/', commentController.findallsubc)
router.get('/comments/:page', commentController.showPage )

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/createComment', commentController.create )


router.post('/authLogin', userController.authLogin)



router.get('/login', )
router.get('/signup', (req, res)=> {
  res.render('signup')
})


router.get('/yoyo/:name', (req, res)=> {
// router.get('/yoyo/:name/:a/:b', (req, res)=> {
  res.json( req.params )
})

router.post('/signup', (req, res)=> {
  res.json( req.body )
})
router.post('/login', (req, res)=> {
  res.json( req.body )
})

module.exports = router　