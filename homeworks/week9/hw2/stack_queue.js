// stack
function Stack() {
  this.obj = {}
  this.i = 0
}

Stack.prototype.push = function (value) {
  this.obj[this.i] = value
  this.i++
}
Stack.prototype.pop = function () {
  this.i--
  return this.obj[this.i]
}


// queue
function Queue() {
  this.obj = {}
  this.i = 0
  this.k = -1
}

Queue.prototype.push = function (value) {
  this.obj[this.i] = value
  this.i++
}

Queue.prototype.pop = function () {
  if (this.k + 1 === this.i) return  // 如果 obj 沒有東西了，就不能再 pop

  this.k++
  return this.obj[this.k]
}

// test
var stack = new Stack()
console.log(stack.i);
console.log(stack.obj);
stack.push(10)
stack.push(5)
console.log(stack.pop()) 
console.log(stack.pop()) 
stack.push("A")
stack.push("B")
stack.pop()
stack.pop()
stack.pop()
stack.pop()
stack.push("C")
stack.push("D")
console.log(stack.pop()) 


var queue = new Queue()
queue.push(1)
queue.push(2)
console.log(queue.pop()) 
console.log(queue.pop()) 
queue.push("A")
queue.push("B")
queue.pop()
queue.pop()
queue.pop()
queue.pop()
queue.push("C")
queue.push("D")
console.log(queue.pop()) 
