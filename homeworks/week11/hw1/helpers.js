//  給 template 方便使用的 helpler 集中在此。

const fs = require('fs')

// icon
exports.icon = (name) => {
  fs.readFileSync(`./public/icons/${name}.svg`)
}

// 方便處理日期時間的 lib 
exports.moment = require('moment')

// 方便 debug 的 function ， 類似 console.log
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
exports.dump = (obj) => {
  JSON.stringify(obj, null, 2)
}

// Some details about the site
exports.siteName = 'Minty Board'

exports.menu = [
  { url: '/posts', title: '首頁', icon: 'home', },
  { url: '/my', title: '我的發表', icon: 'my', },
  { url: '/top', title: '人氣回應', icon: 'top', },
  { url: '/setting', title: '設定', icon: 'setting', },
]
