// 所有 routes 定義在這邊
const express = require('express')
const router = express.Router()

router.get('/', (req, res)=> {
  res.render('signup')
})


router.get('/yoyo/:name', (req, res)=> {
// router.get('/yoyo/:name/:a/:b', (req, res)=> {
  res.json( req.params )
})

router.post('/signup', (req, res)=> {
  res.json( req.body )
})

module.exports = router　