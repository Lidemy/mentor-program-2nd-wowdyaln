
``` js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

- JavaScript 是單執行緒，程序按照順序排列，前面的必須處理好，後面的才會執行。

setTimeout 屬於瀏覽器提供的 api 不是 JavaScript 的 function。
https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout

因此 setTimeout 一開始是放在 webAPIs 計時， 設定時間到了之後，裡面的 console.log() 到 callback Queue 去排隊，

### stack 裡面的 function 要全部執行完畢之後，才會輪到 callback Queue


時間軸：

| stack        |  callback Queue  |
| ----------- | ----------- |
|    console.log(1) | ( )=>{console.log(2)} ,  ( )=>{console.log(4)}
|    console.log(3) |
|    console.log(5) |

| stack        |  callback Queue  |
| ----------- | ----------- |
|   x  | ( )=>{console.log(2)} ,  ( )=>{console.log(4)}
|    console.log(3) |
|    console.log(5) |

**印出 1**
| stack        |  callback Queue  |
| ----------- | ----------- |
|     | ( )=>{console.log(2)} ,  ( )=>{console.log(4)}
|   x  |
|    console.log(5) |

**印出 3**
| stack        |  callback Queue  |
| ----------- | ----------- |
|     | ( )=>{console.log(2)} ,  ( )=>{console.log(4)}
|     |
|x |

**印出 5**

| stack        |  callback Queue  |
| ----------- | ----------- |
|   ( )=>{console.log(2)} | ( )=>{console.log(4)}

| stack        |  callback Queue  |
| ----------- | ----------- |
|   console.log(2)  |  ( )=>{console.log(4)}
|   ( )=>{ }  |  


| stack        |  callback Queue  |
| ----------- | ----------- |
|   x  |  ( )=>{console.log(4)}
|   ( )=>{ }  |  

**印出 2** 

| stack        |  callback Queue  |
| ----------- | ----------- |
|     |  ( )=>{console.log(4)}
|   x  |  


| stack        |  callback Queue  |
| ----------- | ----------- |
|   ( )=>{console.log(4)}  |  

| stack        |  callback Queue  |
| ----------- | ----------- |
|   console.log(4)  |  
|   ( )=>{ }  | 

| stack        |  callback Queue  |
| ----------- | ----------- |
|   x  |  
|   ( )=>{ }  |  

**印出 4** 

| stack        |  callback Queue  |
| ----------- | ----------- |
|     |  
|   x  |  

結束。