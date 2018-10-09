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
瀏覽器發 request 的時候也會把 cookie 的資料附在 request 一併送出。

**請求偽造**：誤導使用者，去發送符合使用者身份認證的 request 到 server，去達成需要身份認證的操作。


#### 防範方法


## 請舉出三種不同的雜湊函數
- **Bcrypt**
- **MD5**
（ Message-Digest Algorithm ）訊息摘要演算法。1996  年後被證實存在弱點，可以被加以破解。
- **SHA-256**
安全雜湊演算法2（SHA-2）的其中一個分支。


## 請去查什麼是 Session，以及 Session 跟 Cookie 的差別
#### Cookie


#### Session





## `include`、`require`、`include_once`、`require_once` 的差別