## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
|  | VARCHAR | TEXT |
|----------|----------|------|
| 建立 index 索引  |   可以  | 不行     |
| 指定字數         |  可以  | 不行  |
| 設定預設值     | 可以  | 不行  |


## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又會以什麼形式帶去 Server？
- server 回傳 **response header** 裡面，會有一個 **Set-Cookie:** 讓瀏覽器依照 **Set-Cookie**: 的參數存資料進 cookie.

- 之後，每次發 request 出去，cookie 會帶在 **request header** 裡面給 server.


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
- 任何人只要有同名的 Cookie 就能登入，cookie 的值無關緊要，任意值都可登入（只有拿來跟暱稱綁在一起）
- 我們用 user id 來當 cookie 的值 ，由於規律很好預測，Client 端很容易可以更改 cookie 值，就可以用某個人的身份登入。

