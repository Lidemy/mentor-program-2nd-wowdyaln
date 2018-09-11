/*
1. 拆成 2 個 array 做計算
2. 從右到左相加，所以把 array 反轉
2. 兩個 array 同樣位數，會少很多麻煩！這是重點。所以不夠的地方要補零
2. 兩個相加 < 10 ，不用進位
3. 兩個相加 >= 10 ，進位

324549453519
+     923643
----------------
324550377162

      999
+     888
----------------

*/
function add(a, b) {
  let arrA = a.split("").reverse().map( (ele) => Number(ele))
  let arrB = b.split("").reverse().map( (ele) => Number(ele))

  let diff = Math.abs(arrA.length - arrB.length)
  if (diff !== 0){
    for (let i = 0; i < diff; i++) {
      if (arrA.length > arrB.length) {
        arrB.push(0)
      } else {
        arrA.push(0)
      }
    }
  }
  
  let carry = false  // 是否進位
  let answer = []

  for (let i = 0; i < arrA.length; i++){
    let sum = arrA[i] + arrB[i]
    if (carry) {
      sum += 1
      carry = false
    }

    if (sum < 10){
      answer.unshift(sum)
    } else {
      sum -= 10
      answer.unshift(sum)
      carry = true
    }

    if (i === arrA.length - 1 && carry === true) {
      answer.unshift(1)
    }
  }
  ansString = answer.map( digi => digi.toString() )
  return ansString.join("")
}

module.exports = add;