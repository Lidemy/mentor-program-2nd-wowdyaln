## CSS 預處理器是什麼？我們可以不用它嗎？
- CSS 預處理器用更可讀、可維護的語法去寫 CSS （有基本的變數、巢狀、迴圈、匯出匯入語法）
- 像是 SCSS / LESS / Stylus ，檔名分別是 **scss ; less ; styl** ，每個語法大同小異，但沒有互通。
- 由於瀏覽器只認識 CSS ，以上檔案都還要編譯成 CSS 才能使用。

也可以不用，只是之後要改要維護就比較困難，業界通常都會使用（開發快速 / 好維護）。


## 請舉出任何一個跟 HTTP Cache 有關的 Header 並說明其作用。
- **Cache-Control**
  
`Cache-Control: max-age=3600`
從收到 response 開始，在往後的一小時**之內**，如果**再次要求資源**，**不會發 request**，直接從快取拿。

`Cache-Control: no-cache`
每次都另外發送 Request 去確認 server 資源是否有更新，如果沒有更新，就使用快取在瀏覽器的檔案即可。

`Cache-Control: no-store`
瀏覽器不使用快取，不管資源是否有更新都抓回來，比較耗網路流量。

## Stack 跟 Queue 的差別是什麼？
- **stack** 像是疊盤子，從最上面開始拿，後進先出，first-in ; last-out (FILO)
- **Queue** 像是銀行排隊，先到的先服務，先進先出，first-in ; first-out (FIFO)

## 請去查詢資料並解釋 CSS Selector 的權重是如何計算的（不要複製貼上，請自己思考過一遍再自己寫出來）
  

- step1 ： 比類型
- step2 ： 比數量
- step3 ： 比程式碼執行順序
- 有任何一步驟分出高下，後面步驟就不用再比較了。
- 類型優先度，由上到下，優先度由高到低如下：

|  類型   |  e.g.  |
|-----|------|
|  !important    | `p { color: blue !important; }`   |
|  inline style    | HTML:   `<p style="color:blue;font-size:46px;">`  |
|   id   |  `#super`  |
|  class / Pseudo-classes (一個冒號) / Attribute Selector  (方括號)  |  `.super`  `:hover :active :nth-child()` `[lang|="fr"] [data-vegetable*="not spicy"]` |
|   tag / Pseudo-elements (兩個冒號)   |  `p`  `::first-line   `  |


- 只要類型優先度高，後面都不用再比較了。
例如：
`#yoman .a`    => [0, 1, 1, 0, 0]  --> Win
`.a .b .c .d .e .f .g` => [0, 0, 7, 0, 0]


- 如果類型優先度相同，比數量
例如：
`.apple.coco`    => [0, 0, 2, 0, 0] --> Win
`.coco` => [0, 0, 1, 0, 0]


- 如果類型、數量都相同，比較後面的程式碼蓋掉前面的。
例如：
`.coco`   => [0, 0, 1, 0, 0]
`.coco` => [0, 0, 1, 0, 0] --> Win

- [Specificity Calculator](http://specificity.keegan.st/)