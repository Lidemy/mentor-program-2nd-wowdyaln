/*
1. 使用.split("") 切開
2. 一個個檢查：如果不是英文字母就忽略
3. 大寫轉小寫，反之亦然
*/
function isCapital(letter) {
  return /[A-Z]/.test(letter)
}
function isLowercase(letter) {
  return /[a-z]/.test(letter)
}

function alphaSwap(str) {
  let ary = str.split("")
  let output = ary.map((ele) => {
    if (isCapital(ele) ) {
      return ele.toLowerCase()
    } else if ( isLowercase(ele) ) {
      return ele.toUpperCase()
    } else {
      return ele
    }
  })
  return output.join("")
}
module.exports = alphaSwap