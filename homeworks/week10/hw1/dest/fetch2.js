"use strict";

// from week4-3
var accept = "application/vnd.twitchtv.v5+json";
var clientID = "8d2pq7tro8z1hpuf5fu9tmvidw5enl";
var Url = "https://api.twitch.tv/kraken/streams";
var limit = "20";
var myHeaders = new Headers({
  "Accept": accept,
  "Client-ID": clientID
});
var myInit = {
  method: 'GET',
  headers: myHeaders
}; // DOMContentLoaded ready
// initial HTML document has been completely loaded and parsed

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM ready");
  var q = window.location.search;
  var query = q.split("=")[1].replace(/\+/g, " ");
  var gameName = encodeURI(query); //! 碰到有奇怪符號的名字就不行了

  console.log(gameName);
  var twitchUrl = "".concat(Url, "/?game=").concat(gameName, "&limit=").concat(limit); // 使用 fetch 發 request

  getStreams(twitchUrl, myInit); // 把 fetch 包成 function 使用

  function getStreams(twitchUrl, myInit) {
    fetch(twitchUrl, myInit).then(function (res) {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Network response was not ok.');
    }).then(function (respJSON) {
      // 更改網頁 title
      document.querySelector('.gameTitle').innerText = respJSON.streams[0].game; // 把 stream 一個個 append 到 .container 裡

      respJSON.streams.forEach(function (stream) {
        var _stream$channel = stream.channel,
            url = _stream$channel.url,
            logo = _stream$channel.logo,
            status = _stream$channel.status,
            display_name = _stream$channel.display_name,
            medium = stream.preview.medium,
            created_at = stream.created_at;
        document.querySelector('.container').innerHTML += renderStream(url, medium, logo, status, display_name, created_at);
      });
    }).catch(function (error) {
      console.log('There has been a problem with your fetch operation: ', error.message);
    });
  } //


  function renderStream(url, medium, logo, status, display_name, created_at) {
    return "\n            <div class=\"container__box\">\n              <div class=\"box__video\">\n                <a href=\"".concat(url, "\" target=\"_blank\">\n                  <img src=").concat(medium, ">\n                </a>\n              </div>\n              <div class=\"box__avatar\">\n                <img class=\"avatar__img\" src=").concat(logo, ">\n                <div class=\"avatar__info\">\n                  <h6 class=\"info__status\"> ").concat(status, "</h6>\n                  <h6 class=\"info__host\"> ").concat(display_name, "</h6>\n                  <h6 class=\"info__timeLast\"> ").concat(created_at, "</h6>\n                </div>\n              </div>\n            </div>\n                ");
  }
});