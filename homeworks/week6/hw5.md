## 請說明 SQL Injection 的攻擊原理以及防範方法
#### 攻擊原理 
  App 中，後端原始碼使用字串聯結方式組合SQL指令。外部使用者，把 **分號（;）、單引號（'）、減號(-)、括號( )** 這些經過適當的組合，就可以成爲查詢、插入、更新、刪除資料庫的SQL命令。
  例如：

```
SELECT fieldlist
FROM table
WHERE email = '';
```
email 欄位填入：
> x'; DROP TABLE members; --
> 
就把 members table 刪除了。

```
SELECT email, passwd, login_id, full_name
FROM members
WHERE email = 'x'; DROP TABLE members; --';
```
#### 防範方法
- 對於連線進來使用者，權限要設好，不必要的權限，例如 CREATE / DROP / TRUNCATE 等權限不必給。
- **prepare statement** ：
  
```
$findUser = $conn->prepare("SELECT * FROM users WHERE username = ? ");
$findUser->bind_param('s', $username);
```

query 之前，告訴資料庫外部進來的資料是何種類別。（i - integer / d - double / s - string / b - BLOB）。而資料庫知道資料是 string 的時候，就不會把資料當成 query 語法的一部分了。


## 請說明 XSS 的攻擊原理以及防範方法
#### 攻擊原理 
- **儲存型 XSS** 
利用網站上允許使用者輸入字串的欄位，**在資料庫寫入** HTML 與 Script 語言，造成其他正常使用者在觀看網頁的同時，瀏覽器會主動下載並執行 Script / 解析 HTML，這樣攻擊者就可以做很多壞事了。

- **反射型 XSS** 
後端原始碼把用戶的 **query parameter** 拿來運用，如果 query parameter 是一段可執行的 script ，後端程式碼又把 parameter 回傳給用戶， script 就會被解析出來並執行。

#### 防範方法

  在使用者輸入欄位加入過濾字串的功能，將『<』、『>』、『%』、『/』、『()』、『&』等**符號進行過濾不予輸出至網頁**，或限定**欄位長度的輸入**。



## 請說明 CSRF 的攻擊原理以及防範方法
- Cross Site Request Forgery，跨站請求偽造
#### 攻擊原理 
利用瀏覽器發 request 的時候也會把 cookie 的資料附在 request 一併送出。

**請求偽造**：誤導使用者去發送符合使用者自己身份認證的 request 到 server，去達成需要身份認證的操作。（ 類似詐騙集團騙民衆去 ATM 轉賬的道理 ，壞人不需要取得權限，只要誤導受害者即可。）

#### 防範方法
- #### 一般常見的有效防禦是使用圖形驗證碼。


- #### **Double Submit Cookie** （以下兩種）

##### 由 server 隨機產生一個 csrftoken

  server 回 response 的時候，把 csrftoken 加在 clinet 端的兩個地方：
  1. 給使用者填寫的表單 （ csrftoken 成爲其中一個 input value ）
  2. 寫進 cookie


  當使用者 submit 表單之後，Form 的 csrftoken 加在 request 裡面 / 而 cookie 送上的資料也有一個 csrftoken。Server 收到 request / cookie 之後，比較一下這兩處的 csrftoken 是否一樣？若相同，**表示這個 request 的確是使用者『自願』發出，而不是被『誤導』發出的**，因此可以執行 request 要求的相關操作。


  ##### 由 client 隨機產生一個 csrftoken
client 發 request 的時候，client 自行產生一個 csrftoken ，並且加在：
  1. request Header
  2. 寫進 cookie


request 帶上 request Header / cookie 兩處的 csrftoken 發給 Server，接下來流程如同上面說過的。

**Double Submit Cookie 這個方法可以運作的基礎是建立在：『b.com』不能在瀏覽器寫入 『a.com』的 cookie 這個前提。**

- #### 瀏覽器使用 `SameSite` ，只有在同個網站之下發出的 request ，才能送該網站的 cookie 出去。

- [讓我們來談談 CSRF | TechBridge 技術共筆部落格](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)

## 請舉出三種不同的雜湊函數
- **Bcrypt**
- **MD5**
（ Message-Digest Algorithm ）訊息摘要演算法。被證實存在弱點，可以被加以破解。
- **SHA-256**
安全雜湊演算法2（SHA-2）的其中一個分支。


## 請去查什麼是 Session，以及 Session 跟 Cookie 的差別
#### Cookie
存在瀏覽器中，（目的網站 domain 相同情況之下）每次發 request 會一併送出， server 就根據 cookie 裡面資訊來分辨 request 是誰發的等等狀態。cookie 可以存許多組資訊，而用來驗證身份的 session 只是其中之一。

#### Session
通常是一串隨機產生的複雜亂數組合， Session 一式兩份，分別交給 server 跟 client。要驗證身份的時候 client 就拿出 Session ，讓 server 比對此 Session 是否存在，來達成驗證身份目的。




## `include`、`require`、`include_once`、`require_once` 的差別
都是用來引入外部檔案。
include_once和require_once 會檢查外部檔案是否已經在其他地方引入過了，避免重複。
include / require 不檢查重複引入。
發生錯誤的時候：include/include_once 拋出警告，不中斷程式執行。require/require_once 會中斷執行，拋出 Error。