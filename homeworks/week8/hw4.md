## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
- Domain Name System，是網際網路的一項服務。 它作為將域名和IP位址相互對映的一個分散式資料庫，能夠使人更方便地存取網際網路。

- 對 Google 的好處：
知道用戶去了那些網站，這個資訊很有商業價值。

- 對一般大眾的好處：
平常使用的 DNS server 如果不穩定/當機；google 提供的是一個優良備案。效能也有可能比其他服務商要好，可以作爲預設選項。

## 什麼是資料庫的 lock？為什麼我們需要 lock？
在資料異動時候，把需要異動的資料鎖住，不讓其他操作（query）存取；改變；直到這筆資料異動完成爲止才解鎖。
爲了避免中途其他操作，影響同一筆資料，造成資料不一致。（避免 race condition.）

## NoSQL 跟 SQL 的差別在哪裡？
- **SQL**
  SQL is a **declarative query language**, not a procedural, imperative language.

  是一種 **『陳述式』的 query 語言** ，直接說你想要的就好，過程要如何實行就交給資料庫。使用之前需要先定義 Schema，資料表內的欄位名稱和資料型態都是固定的，每個資料表間也透過固定的規則關聯起來。

平常會說的 MySQL , PostgreSQL , MongoDB ... 這些不叫做資料庫，而是 『database Management systems』 (DBMS) , 用來管理資料庫。
MySQL 是一種 RDBMS （關聯式資料庫管理系統）。

- **NoSQL**
Not Only SQL
也是一種『陳述式』的 query 語言，但**不使用SQL作為查詢語言**。
不要求一定要固定的 Schama ；不鼓勵 Table Join。
沒有內建的交易機制 ( transation )。
在 RDBMS 裡面 Query 很昂貴（因為 lock /交易），但 NoSQL 裡面 Query 相對成本低很多。
但是在資料儲存方面，不如老牌的 SQL 可靠，數據有可能丟失，安全性和正確性不如 SQL。

## 資料庫的 ACID 是什麼？
- Atomic （原子性）
transaction : 綁定一連串 sql 指令。
一個成功的 transaction ： 代表一連串 sql 指令必須**按照循序 && 全部完成**。
只要任一個事件沒有完成，則視爲 transaction 失敗，然後有更動的事件會反轉回去（reverse to original state）（回覆原本的狀態）。
**Atomic 保證系統數據安全的移到下一個正確狀態。**

- Consistency （一致性）
transaction 之後的狀態必須要合乎規則。
Consistency 保證系統在改變狀態失敗時，能安全回復本來的正確狀態。

- Isolated （獨立的）
transaction 進行時，外部不能存取。多個 transaction 可以獨立、同時執行，不會互相干擾。

- Durable （持久的）
資料庫重新啓動後，完成的 transaction 依然存在。
