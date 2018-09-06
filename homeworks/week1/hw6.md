## 請解釋後端與前端的差異。
#### 前端：
- 用戶可以看到的、與之互動的介面（按鈕、表單...）
- 屬於瀏覽器管轄範圍的部分 （發送 request / 接受 response ; 作出DOM tree, render 畫面...）
- 改前端的資料不會影響到後端。

#### 後端：
- web 伺服器, mail 伺服器, FTP 伺服器... ... 等，伺服器、資料庫這些部分通稱後端。

前端主要在於顯示畫面，必要的資料從後端過來。

後端主要在處理、保存：經常變動的 / 或需要長期保存的資料。　

## 假設我今天去 Google 首頁搜尋框打上：javascript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

- 每輸入一個字（中文或英文），就會發送一個 request （GET, 透過 XHR 發出）給 google 伺服器，伺服器回傳資料讓瀏覽器可以顯示 "Google Suggest" 的下拉選單，預測使用者要輸入的 keyword。

e.g. 
按下 'j' 的時候，收到 response （透過 XHR 收到）類似下面這樣一個 array：

```

["j",[["javascript 大數相加",35,[39]],["javascript parseint large numbers",35,[39]],["jo malone",0],["jojo",0],["jordan",0],["jkf",0],["java",0],["j羅",0],["jr",0],["jins",0]],{"j":"54u","k":1,"q":"NpNmvW5kkwHIQ471eU7PV_E6kyo","t":{"bpc":false,"tlw":false}}]

```
 (似乎之前搜尋過的關鍵字會放在比較前面。)

javascript 共 10 個字母，就會有 10 次 request 跟 10 次像是上面那樣的 response 從 google 伺服器發回來。

- 按下 enter 之後，瀏覽器會發出 POST / GET 等等一大堆的 request 出去。根據搜尋框裡面的 value，伺服器也回傳給我們一堆 response （html / CSS / js / 圖片 ...） ，然後瀏覽器再把這些資料秀出來讓用戶看到。

## 請列舉出 5 個 command line 指令並且說明功用
- `iconv` 文字編碼轉換，例如 big5 -> utf8
- `cd` 切換工作目錄
- `ls` 列出目前工作目錄的檔案、資料夾
- `git` git 版本控制工具的使用指令 （要安裝 git 才有）
- `curl` 強大的 http 命令列工具
