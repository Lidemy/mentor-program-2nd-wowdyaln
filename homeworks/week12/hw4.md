## 為什麼我們需要 React？可以不用嗎？
當網頁元件越來越來越多、複雜的時候，直接用 javascript 手動操作 DOM 去改變 UI 是一件很複雜的事。
React 讓開發人員關心 UI 在何種情況下要如何改變就好，至於 UI 要怎麽改變就交給 React。
Virtual DOM 的技術下，render 效能是很不錯的。
當網站架構單純的時候， react 優勢可能不明顯；而架構越來越龐大時候，使用它會比較好。


## React 的思考模式跟以前的思考模式有什麼不一樣？
- 之前： 開發者直接操作 DOM 去改變 UI
- React: 一旦 component 的 state 改變， react 就會去 call render() ，我們關心 state 要如何改變即可。

## state 跟 props 的差別在哪裡？


- state 可以被改變 ，前提是：自己的 state 自己改，不能被其他 component 改變。
state 是 class component 特別的一個屬性 ( function component 沒有 state )，
class component 本身有個特別的 method: **setState** 來更改 state 的值。
（自己的 state 自己改，不能被其他 component 改變。）
當 setState 方法改變 state 時，就會 call 本身的 render 方法去重繪製 UI。


- props 不能改變 （除非外部傳來新的 props）
當 componentA 在 render 一個 componentB 的時候，可以傳資料給這個被 render 的 componentB
（應該說比較像是 "外包" 一部分給這個 componentB ）
這些資料會集中在名爲 props 的物件傳給 componentB；componentB 依賴 props 來取得外部資訊。
props 不能被改變。

## 請列出 React 的 lifecycle 以及其代表的意義

###lifecycle
#### Mounting ( 組件實例被創建並將其插入DOM 時 )
將按以下順序調用這些方法
- **constructor()**
- static getDerivedStateFromProps()
- **render()**
應該是純函數，不會修改組件狀態，每次調用它時返回相同的結果。
- **componentDidMount()**
（update DOM and refs）後被立即調用

#### Update ( 已經 Mount 的 component 的 state 改變 / 有新的 props 進來)
re-render 組件時，按以下順序調用這些方法：
- getDerivedStateFromProps()
- shouldComponentUpdate()
如果shouldComponentUpdate()方法返回false，之後的方法（ render / componentDidUpdate ）都不會被調用
- **render()**
同上方。
- getSnapshotBeforeUpdate()
- **componentDidUpdate()**
（update DOM and refs）後被調用。

#### Unmount
組件從DOM 中刪除時，將調用此方法
- **componentWillUnmount()**
component 被卸載( unmounted )和銷毀( destroyed )**之前**被調用。在此方法中執行任何必要的清理，例如使計時器無效，取消網絡請求，或清理在componentDidMount中創建的任何DOM元素。