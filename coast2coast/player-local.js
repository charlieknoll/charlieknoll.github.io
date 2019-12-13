(function (open) {

  XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
    if (url.indexOf('https://mf.svc.nhl.com') != -1) {
      rewrittenUrl = url.replace("https://mf.svc.nhl.com", "https://nhl.freegamez.ga");
    } else { rewrittenUrl = url; }
    open.call(this, method, rewrittenUrl, async, user, pass);
  };
})(XMLHttpRequest.prototype.open);

var playerProxy = {
  exec: async function (action) {
    if (action.substring(0, 6) == 'seek-p') {
      const t = action.split('/')[1]
      player.seekPercentage(parseInt(t))
      return
    }
    if (action.substring(0, 4) == 'seek') {
      const t = action.split('/')[1]
      player.seek(player.getCurrentTime() + parseInt(t))
      return
    }
    if (action.substring(0, 4) == 'play') {
      player.isPlaying() ? player.pause() : player.play();
      return
    }
  },
  load: function (url, t) {
    player.load(url, false)
    player.seek(parseInt(t) + 1);
    //player.seek(10);
    player.play()
  },
  getCurrentTime: function () {
    return player.getCurrentTime() + player.getStartTimeOffset()
  }
}

var player = new Clappr.Player({
  mimeType: "application/x-mpegURL",
  autoPlay: false,
  width: "100%",
  parentId: "#player",
  plugins: { 'core': [LevelSelector] }
});
player.on(Clappr.Events.PLAYBACK_READY, function () {
  console.log('PLAYBACK_READY')
})