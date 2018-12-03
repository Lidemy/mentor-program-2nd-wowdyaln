## React Router 背後的原理你猜是怎麼實作的？
React Router 會用 js 幫你讀 URL，依照 URL 替換 Component，進行前端轉址。實現URL與UI界面的同步。

原理：
URL 對應 Location 對象，而 UI 是由 react components 來決定的，這樣就轉變成 location 與 components 之間的同步問題。

#### browserHistory
- 利用 html5 的 History API (history.pushState() & replaceState() & popstate()) 來進行網址的假修改。
- 優點：網址簡潔好看。
- 缺點：History API 是 html5 的特性，因此一些較老舊的瀏覽器就 GG 了。另外，需要有後端轉址框架 (例如 Express) 配合而不能單純以靜態頁面顯示，所以後端轉址框架要設定 * (萬用字元) 指到 view，不然一旦 reload 就會 404。

#### hashHistory
- 利用瀏覽器不將錨點變化視做頁面變化的特性來轉址。
- 原理：設定及讀取 location.hash，並使用 location.replace() 來轉址，onhashchange 來偵測網址變更。
- 優點：所有瀏覽器都適用，且不需要依靠後端轉址框架。
- 缺點：網址中有 # 會影響網址美觀。

##### 參考資料：
* [猴子也能看懂的 React 教學 - 4](https://j6qup3.github.io/2016/08/19/%E7%8C%B4%E5%AD%90%E4%B9%9F%E8%83%BD%E7%9C%8B%E6%87%82%E7%9A%84-React-%E6%95%99%E5%AD%B8-4/#%E6%A6%82%E5%BF%B5-Front-End-Routing)
* [react-router的實現原理](http://zhenhua-lee.github.io/react/history.html)

## SDK 與 API 的差別是什麼？
#### API
API：如同家中的 110V 電力插座。
只要是 110V 的家電都能使用，像是電視機、吹風機、洗衣機

這些家電透過 『110V插座』（API）來得到電力。

#### SDK
類似一個生產家電的工廠。

工廠裡面有專業設備，可以有效率、安全的生產出多種家電。

如果不透過工廠取得家電，也可以自己到電器材料行買材料、工具，自己做一個，但就會比較麻煩。

##### 參考資料：
[Difference between an API and SDK - Stack Overflow](https://stackoverflow.com/questions/834763/difference-between-an-api-and-sdk)


## 在用 Ajax 的時候，預設是不會把 Cookie 帶上的，要怎麼樣才能把 Cookie 一起帶上？

- 如果是同源請求，Ajax 會自動帶上 cookie。
- 如果是非同源請求，要做設定：

  - **前端**：XMLHttpRequest.withCredentials 設定爲 true。
  - server 設置 response header ： `Access-Control-Allow-Credentials = true` （在此設定下 `Access-Control-Allow-Origin` 的值不能爲 `*`）
  

  ##### 參考資料：
  [Ajax不會自動帶上cookie/利用withCreadentials帶上cookie - 知乎](https://zhuanlan.zhihu.com/p/28818954)



