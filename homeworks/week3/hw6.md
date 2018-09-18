## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
- `<time date="2018-09-18" pubdate>  Sep 18 </time>`
time tag 在語義上識別某個時間點。 一個網頁可能只有一個帶有pubdate屬性的時間元素，充當網頁發布日期的時間戳。

- `<bdi>  مرحبا </bdi>`  ( 阿拉伯語 : 你好 )
並非的所有文字都是從左到右。像是阿拉伯語是右到左。 bdi tag 會讓文字順序相反。

- 
```
<meter  
  min="0"
  max="100"
  value="70">

  70 out of 100
</meter>

```
meter 可以用它來表示剩餘電池電量，產品額定值等等。

## 請問什麼是盒模型（box modal）
- html 中的每個元素都被視爲一個矩形。CSS 盒模型描述了元素所佔空間的內容。每個盒子有四個邊，由外而內，一層包著一層構建起來：
  - 外邊距邊(margin)
  - 邊框邊(border)
  - 內填充邊(padding)
  - 內容邊(content)。



- 在 CSS box-sizing 屬性中，指定 width ; height 屬性的時候 ：
  - Border-Box 代表盒模型 padding 跟 border 都含在區塊裡面.
  - Content-box 代表盒模型 padding 跟 border 不包含在區塊裡面. 
  - Border-Box 比較方便啦。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

- inline
  - 盒模型的內容寬度有多少，整個盒子寬度就多少。
  - 不能設定 width 與 height 屬性。
  - HTML : span、a、input、img、em 預設是 inline。
- block
  - 不論盒模型的內容寬度有多少，盒子會自動佔滿整個瀏覽器寬度。
  - HTML : div、p、ul、li 預設是 block。
- inline-block
  - 就像 inline 一樣，但可以設定 width 與 height 屬性。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

- static
  - **position 屬性的預設值**。無法指定位置，是照著瀏覽器預設的配置自動排版在頁面上。
- relative
  - 以**瀏覽器預設配置的位置**當做參考點，作相對移動。
###**absolute ( 容易忘記，特別放大 )**
>以**上一層並且不是 static 的父元素**當做參考點，作相對移動。

- fixed
  - 以**瀏覽器視窗**當做參考點，作相對移動。
  - 上下左右的捲動不會改變其位置。
