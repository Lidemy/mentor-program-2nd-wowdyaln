/*
  1. 使用 .split("") 分割
  2. 每個 element ，unshift 到另一個新的 array
*/

function reverse(str) {
  let ary = str.split("")
  let newAry = []

  ary.forEach( (ele) =>  newAry.unshift(ele) )

  return newAry.join("")
}
