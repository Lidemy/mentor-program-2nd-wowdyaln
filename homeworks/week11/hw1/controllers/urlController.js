

exports.showPage = (req, res)=> {
  let currentUser = req.session.username
  let currentUserNk = req.session.nickname

  res.render('urls', {
    currentUser, currentUserNk,
    title: "Short url"
  })
}

exports.createStnurl = (req, res)=> {
  
}

exports.redirect = (req, res)=> {
  
}

/* 

todo: 

*login: 
        enter a short url --> redirect to the web page
        create a new shorten url
        see shorten url datas created by me.


*not login:
            enter a short url --> redirect to the web page
*/