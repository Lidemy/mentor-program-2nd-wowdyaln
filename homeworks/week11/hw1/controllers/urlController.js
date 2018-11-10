const Url = require('../models').Url
const crypto = require('crypto')
const path = require('path')

function loginObj(req, otherObj){
  let obj = {}
  obj.currentUser = req.session.username
  obj.currentUserNk = req.session.nickname
  obj.title = "Short Url"

  if (otherObj) {

    Object.keys(otherObj)
          .forEach( k => {
            obj[k] = otherObj[k]
          })
  }

  return obj
}


exports.showPage = (req, res)=> {
  // let currentUser = req.session.username
  // let currentUserNk = req.session.nickname

  res.render('url', loginObj(req) )
}

exports.createStnurl = (req, res)=> {
  var addOne =  // todo: temp 刪除
    (function (n) {
      return function () {
        n += 1;
        return n.toString();
      }
    }(123468));
  
  // 
  function genUrl(orgUrl, creator) {

    let random6 = crypto.randomBytes(3).toString('hex')
    // let random6 = addOne()
    
    Url.findOrCreate({
      where: {
        shortUrl: random6,
        originUrl: orgUrl,
        user_id: creator
      }
    }).spread( (url, createSucceed) => {
      // ! 有時候直接跑去 catch ,這邊不執行了，兩邊作用域都要 call genUrl
      console.log(createSucceed);

      if (createSucceed){
        let renderObj = loginObj(req,  url.get({ plain: true }) )

        res.render('url', renderObj )
        // res.json( url.get({ plain: true }) )
      } else {
        console.log(createSucceed);
        genUrl(orgUrl, creator) //! 再 call 一次
      }
      
    }).catch(err => {
      console.log("error catch ...");

      if (err.errors[0].type === "unique violation"){
        genUrl(orgUrl, creator) //! 再 call 一次 
      } else {

        res.status(500).send( "something wrong ... ...")
      }
    })
  }

  genUrl(req.body.originUrl, req.session.user_id)  
  
}

exports.redirect = (req, res)=> {

  console.log(req.params.short);
  let short = path.basename(req.params.short)

  Url.findOne({
    where: {
      shortUrl: short
    }
  }).then(url => {
    let renderObj = loginObj(req, url.get({ plain: true }))

    res.render('url', renderObj)
    // res.redirect(`/stnurl/${short}`) //* 前端要 redirect
  }).catch( err => {
    console.log(err);
    res.status(500).send("something wrong ... ...")
  })

}

