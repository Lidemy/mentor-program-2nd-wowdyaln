## 什麼是 MVC？
- Model、View、Controller 的簡稱。
是一種設計模式，沒有一個嚴格的定義，所以大家認知可能不盡相同。
大致上：

    - Model： 負責資料庫系統的存取。  
    - View： 負責前端呈現相關的部分。
    - Controller： 負責處理前端 request 的收集、驗證，後端接收 Model 回傳的資料。View 與 Model 互相溝通的中間橋樑。

MVC 的好處在於三個部分各司其職，可以讓前後端人員職責更明確、整體專案也比較好維護。


## 什麼是 ORM？

- Object-Relational Mapping
- 將資料庫 （ 不論 SQL-Bsaed 或是 NoSql ）轉換至物件導向的資料抽象化技術。
- 讓程式開發人員可以用操作物件的方式對資料庫進行操作，而不直接使用SQL語法對資料庫進行操作。
- 降低了物件導向程式與資料庫之間的耦合關係
- ORM 有效能上的爭議，不過總體上優點多過缺點，而 MDN 建議開發者直接使用 ORM 即可：
> Using ODM/ORMs often results in lower costs for development and maintenance! Unless you're very familiar with the native query language or performance is paramount, you should strongly consider using an ODM.

[Express Tutorial Part 3: Using a Database | MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)