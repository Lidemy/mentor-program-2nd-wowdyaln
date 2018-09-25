## hw5：簡答題

1. 什麼是 DOM？
- Document Object Model, DOM 。
- DOM 是 程式語言對於 HTML、XML 文件的一個 interface。
- DOM 讓程式可以存取並改變 document 架構（structure）、風格（style）和內容（content）的方法。
- 程式語言存取、操控的是 DOM，DOM改變了，然後才間接改變網頁。



2. 什麼是 Ajax？
- Asynchronous JavaScript + XML
- 描述一種使用數個既有技術的「新」方法，包括：
  -  HTML or XHTML
  -  CSS, JavaScript
  -  DOM, XML, JSON
  -  XMLHttpRequest object

- 這些技術被結合在 Ajax 概念中，從後端拿資料過程中，不需要重新讀取整個網頁，讓用戶體驗更好。



3. HTTP method 有哪幾個？有什麼不一樣？

- GET
  - 只用於從 server 取得資料。

- POST
  - 提交指定資源的實體，通常會改變 server 的狀態.

- PUT
  - Create or Update，資源如果已經存在就替換，沒有就新增。

- PATCH
  - 套用指定資源的**部份**修改。 （？）

- DELETE
  - 刪除指定資源.

- HEAD
  - 與 GET 方法相同，但 server 不會回應 response body（只有 response header ）。

- CONNECT
  - 和指定資源標明的伺服器之間，建立隧道（tunnel）。

- OPTIONS
  - 描述指定資源的溝通方法（communication option）。
- TRACE
  - 指定資源標明的伺服器之間，執行迴路返回測試（loop-back test）。



4. `GET` 跟 `POST` 有哪些區別，可以試著舉幾個例子嗎？


|   |  GET  |  POST  |
|----------|----------|------|
|request header |O   | O     |
|request body   | X | O  |
| 帶資料( 參數 )給 server 的存放處   | url 的問號之後加上參數。?a=123&b=456。可在 url 欄位看到 | request body ( Form Data ) 。因此在 url 看不到  |


5. 什麼是 RESTful API？
   
- REST : Representational State Transfer
- RESTful，它是一種網路架構風格。
- RESTful 規定一套固定的 API 撰寫規則： HTTP method 搭配 Url ，組合出許多互動狀態，達成前後端的資源操作。


6. JSON 是什麼？
- JavaScript Object Notation
- 一種資料格式。

7. JSONP 是什麼？
- JSON with Padding。
- 利用 `<script>` 不受同源政策限制的特性來達成跨來源請求。
  - `<script>`裡面放資料，透過指定好的 function 把資料給帶回客戶端。
  - request 參數只能附加在網址上（GET）帶過去，沒辦法用 POST。


8. 要如何存取跨網域的 API？
- Server 端必須在 Response 的 Header 裡面加上Access-Control-Allow-Origin 規則。
- 當瀏覽器接收到這個 Response 之後，比對目前的 Origin 有沒有符合 Access-Control-Allow-Origin 訂的規則，如果符合，才允許接受跨來源請求的 response，不然就會擋下來。
