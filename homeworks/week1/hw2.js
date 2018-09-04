/*
1. 使用 .split("") 切開
2. 一個個檢查：如果不是英文字母就忽略
3. 第一個字母，轉成大寫。已經碰到第一個字母 = true
4. 第一個字母之後的字母都轉成小寫。
*/


function isEnLetter(letter){
  return /[a-zA-Z]/.test(letter)
}


function capitalize(str) {
  let ary = str.split("")
  let meetFirstLetter = false

  let output = ary.map( (ele)=> {
    if (meetFirstLetter && isEnLetter(ele)) {
      return ele.toLowerCase()
    } else if (!meetFirstLetter && isEnLetter(ele)){
      meetFirstLetter = true
      return ele.toUpperCase()
    } else if (!isEnLetter(ele)) {
      return ele
    }
  })
  return output.join("")
}


