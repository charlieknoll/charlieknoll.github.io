var viewModel = {
  baseUrl: 'https://statsapi.web.nhl.com/api/v1/',
  games: ko.observable(),
  currentGameId: null,
  scheduleDate: ko.observable(),
  init: async function () {
    console.log('init');
    this.scheduleDate(this.formatDate(new Date()));


    [].slice.call(document.getElementsByClassName('item')).map(i => {
      i.onclick = async function (e) {
        e.preventDefault();
        const path = e.target.dataset.path
        playerProxy.exec(path)
      }
    });
    const schedule = await this.getSchedule()
    const games = schedule.dates[0].games
    for (var i = 0; i < games.length; i++) {
      const game = await this.getGame(games[i].gamePk)
      games[i].feeds = game.media.epg.find(e => e.title == 'NHLTV').items
    }
    this.games(games)

    ko.applyBindings(this)
    const links = document.getElementsByClassName('media-link')
    for (var i = 0; i < links.length; i++) {
      links[i].onclick = this.playFeed
    }
    // const avsGame = this.games().find((g) => g.teams.away.team.id === 21 || g.teams.home.team.id === 21)
    // if (!avsGame) return
    // const avsGameContent = await this.getGame(avsGame.gamePk)
    // const url = formatUrl('https://cors-anywhere.herokuapp.com/http://nhl.freegamez.ga/getM3U8.php', {
    //   league: 'nhl',
    //   date: this.scheduleDate(),
    //   id: getDefaultFeed(avsGameContent.media.epg[0].items),
    //   cdn: 'akc'
    // })

    // const response = await fetch(url)
    // const feedUrl = await response.text()
    // playerProxy.load(feedUrl, 0)


  },
  getDefaultFeed: function (items) {
    return items[0].mediaPlaybackId
  },
  formatDate: function (date) {
    var d = date ? new Date(date) : new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  },
  formatUrl: function (urlStr, params) {
    return urlStr + '?' + new URLSearchParams(params).toString()
  },
  playFeed: async function (e) {
    var self = this;
    e.preventDefault()
    const url = viewModel.formatUrl('https://cors-anywhere.herokuapp.com/http://nhl.freegamez.ga/getM3U8.php', {
      league: 'nhl',
      date: viewModel.scheduleDate(),
      id: e.target.dataset.playbackId,
      cdn: 'akc'
    })

    const response = await fetch(url)
    const feedUrl = await response.text()
    if (feedUrl.substring(0, 3) == 'Not') {
      alert(feedUrl)
      return
    }
    playerProxy.load(feedUrl, 0)
  },
  getGame: async function (id) {
    const response = await fetch(this.baseUrl + 'game/' + id + '/content')
    return await response.json()
  },
  getSchedule: async function () {
    const response = await fetch(this.baseUrl + 'schedule?date=' + this.scheduleDate())
    return await response.json()
  }

}


viewModel.init()



