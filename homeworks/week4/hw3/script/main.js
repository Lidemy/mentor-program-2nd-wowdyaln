//
let accept = "application/vnd.twitchtv.v5+json"
let clientID = "8d2pq7tro8z1hpuf5fu9tmvidw5enl"
let Url = "https://api.twitch.tv/kraken/streams"
let limit = "20"
let headerObj = {
  "Accept": accept,
  "Client-ID": clientID
}

let gameList = {
  "LOL": "League%20of%20Legends",
  "SFV": "Street%20Fighter%20V",
  "ZD": "The%20Legend%20of%20Zelda%3A%20Breath%20of%20the%20Wild",
}

document.getElementById('selector').addEventListener('change', ()=> {
  let doms = document.getElementById('game-select')
  let game  = doms[doms.selectedIndex].value

  let queryGame = gameList[game]

  alert(queryGame)
})



let game = "League%20of%20Legends"
let game2 = "Street%20Fighter%20V"
let game3 = "The%20Legend%20of%20Zelda%3A%20Breath%20of%20the%20Wild"


let twitchUrl = `${Url}/?game=${game3}&limit=${limit}`


// 
$(document).ready(function () {
  console.log("ready to go");

  function getData() {
    $.ajax({
      type: "GET",
      url: twitchUrl,
      headers: headerObj,

      // if succeed in getting data from server
      success: function (datas) {
        console.log('ajax successful');
        // change gameTitle
        console.log($('.gameTitle'));
        $('.gameTitle').text(datas.streams[0].game)

        // add liveStream boxes.
        datas.streams.forEach((data) => {
          console.log(data);

          let newContent = `
                  <div class="container__box">
                    <div class="box__video">
                      <a href="${data.channel.url}" target="_blank">
                        <img src=${data.preview.medium}>
                      </a>
                    </div>
                    <div class="box__avatar">
                      <img class="avatar__img" src=${data.channel.logo}>
                      <div class="avatar__info">
                        <h6 class="info__status"> ${data.channel.status}</h6>
                        <h6 class="info__host"> ${data.channel.display_name}</h6>
                        <h6 class="info__timeLast"> ${ $.format.prettyDate(data.created_at)}</h6>
                      </div>
                    </div>
                  </div>
                `

          $('.container').append(newContent)
        })

      },
      // if something wrong
      error: function (datas) {
        console.log('Error', datas);
      }
    })
  }

  getData()
})