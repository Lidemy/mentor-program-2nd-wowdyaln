function unit(k) {
  let uni = ""
  for (let j = 0; j < k; j++) {
    uni += "*"
  }
  return uni
}

function stars(n) {
  let newAry = []
  for (let i = 1; i <= n; i++){
    let ele = unit(i)
    newAry.push(ele)
  }
  return newAry
}

module.exports = stars;