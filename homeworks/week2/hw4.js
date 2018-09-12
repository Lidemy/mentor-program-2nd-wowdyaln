/*
1. 如果奇數個，對切 （捨棄中間）成左右兩邊
2. 如果偶數個，對切成左右兩邊
3. 把右邊 reverse ; 然後跟左邊比較是否相同
*/
function reverse(string) {
  let ary = string.split("")
  let newAry = []
  ary.forEach((ele) => newAry.unshift(ele))
  return newAry.join("")
}

function isPalindromes(str) {
  let left = str.slice(0, Math.floor( str.length/2 ))
  let right = str.slice(Math.ceil( str.length/2 ))

  return left === reverse(right) ? true : false
}

module.exports = isPalindromes