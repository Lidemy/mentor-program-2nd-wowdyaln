function isPrime(n) {
  if (n === 1) return false
  if (n === 2) return true
  let answer = true

  for (let i=2; i<n; i++){
    if (n%i === 0){
      answer = false
      break
    } else {
      continue
    }
  }
  return answer
}

module.exports = isPrime