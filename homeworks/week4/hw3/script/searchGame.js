let accept = "application/vnd.twitchtv.v5+json"
let clientID = "8d2pq7tro8z1hpuf5fu9tmvidw5enl"
let Url = "https://api.twitch.tv/kraken/search/games"
let searchGame = "Super Mario"

let myHeaders = new Headers({
  "Accept": accept,
  "Client-ID": clientID,
});
var myInit = {
  method: 'GET',
  headers: myHeaders,
};

let twitchUrl = `${Url}?query=${searchGame}&live=true`

// DOMContentLoaded ready
// initial HTML document has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM ready");
  // 使用 fetch 發 request
  getGames(twitchUrl, myInit)

  // 當下拉選單有更動時候，清除畫面，重新發 request
  // document.getElementById('selector').addEventListener('change', () => {
  //   let doms = document.getElementById('game-select')
  //   let game = doms[doms.selectedIndex].value  //! the point.

  //   if (game) {
  //     let queryGame = gameList[game]
  //     twitchUrl = `${Url}/?game=${queryGame}&limit=${limit}`
  //     // clean screen
  //     let containerDom = document.querySelector('.container')
  //     while (containerDom.firstChild) {     //! the point.
  //       containerDom.removeChild(containerDom.firstChild);
  //     }
  //     // 重新發 request
  //     getGames(twitchUrl, myInit)
  //   }
  // })


  // 把 fetch 包成 function 使用
  function getGames(twitchUrl, myInit) {
    fetch(twitchUrl, myInit)
      .then(res => {
        if (res.ok) {
          console.log("get response , OK");
          return res.json()
        }
        throw new Error('Network response was not ok.');
      })
      .then((respJSON) => {
        // 把 stream 一個個 append 到 .container 裡
        respJSON.games.forEach( game => {
          let { 
                name,
                _id,
                box: { large }
              } = game

          document.querySelector('.container').innerHTML += renderStream(name, _id, large)
        })
      })
      .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      })
  }
  //
  function renderStream(name, _id, large) {
  return `
          <div class="container__box">
              <a href="#" target="_blank" data-gameName="${name}" data-gameId="${_id}">
                <img src=${large}>
              </a>
          </div>
          `
  }
})