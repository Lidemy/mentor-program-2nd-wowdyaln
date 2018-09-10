// https://github.com/peterolson/BigInteger.js
const bigInt = require("big-integer")

function add(a, b) {
  let answer = bigInt(a).add(b)
  return answer.toString()
}

module.exports = add;