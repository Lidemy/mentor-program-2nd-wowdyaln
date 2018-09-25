function q(selector) {
  let dom = document.querySelector(selector)
  return dom
}

/*                                             (.hidden)
Object <-- EventTarget <-- Node <-- Element <--HTMLElement  <-- HTMLImageElement
                                                            <-- HTMLAnchorElement
                                                            <-- HTMLBodyElement
                                                            <-- HTMLButtonElement
                                                            <-- ... and so on ...
*/


// hidden 屬性在 HTMLElement 裡面 (HTMLElement 下游有些函數也有 hidden 屬性，作用一樣) 
// 在任意上游( Object ~ HTMLElement )的 prototype 裡面加入屬性，下游都可以『參照』到 （ 但前提是下游本身，不能有同名的 hide ; show 屬性，不然上游的 prototype 就被遮蔽了 ）

// HTMLElement 可以換成 Object ~ Element 都可以
HTMLElement.prototype.hide = function () {   // this 的關係，不能使用 arrow function.
  this.hidden = true
}

HTMLElement.prototype.show = function () {
  this.hidden = false
}

// this.hidden 的  this 如果是 HTMLImageElement 生出來的物件，那 HTMLImageElement 本身就有 hidden 屬性。
// this.hidden 的  this 如果是 HTMLButtonElement 生出來的物件，由於 HTMLButtonElement 不具備 hidden 屬性，所以往上找到 HTMLElement 的 hidden 屬性。


let msg = `* try this example in devTool console :


              let img = q('img')
              img.hide()
              img.show()

              let aa = q('body > div > p:nth-child(3) > a')
              aa.hide()
              aa.show()
              
              `

console.log(msg);