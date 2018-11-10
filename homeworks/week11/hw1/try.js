const crypto = require('crypto')

let a = crypto.randomBytes(3).toString('hex')

console.log(a);