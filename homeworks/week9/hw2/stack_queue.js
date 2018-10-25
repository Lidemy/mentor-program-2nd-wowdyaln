// stack
function Stack() {
  let obj = {}
  let i = 0

  this.push = function (value) {
    obj[i] = value
    i++
  }

  this.pop = function () {
    i--
    return obj[i]
  }
}

// queue
function Queue() {
  let obj = {}
  let i = 0
  let k = -1

  this.push = function (value) {
    obj[i] = value
    i++
  }

  this.pop = function () {
    if (k+1 === i) return  // 如果 obj 沒有東西了，就不能再 pop

    k++
    return obj[k]
  }
}

// test
var stack = new Stack()
stack.push(10)
stack.push(5)
console.log(stack.pop()) // 5
console.log(stack.pop()) // 10

var queue = new Queue()
queue.push(1)
queue.push(2)
console.log(queue.pop()) // 1
console.log(queue.pop()) // 2
