var app = {
    beta: null,
    panels: null,
    okPanel: null,
    warningPanel: null,
    dangerPanel: null,
    transition: function (fromId, toId) {
        document.getElementById(fromId).setAttribute('hidden', true)
        document.getElementById(toId).removeAttribute('hidden')
    },
    setBeta: function (e) {
        app.beta = Math.abs(Math.round(e.beta))
        document.getElementById("slope-angle-value").innerHTML = app.beta + '&#176;';
        app.panels.forEach(el => el.setAttribute('hidden', true))
        if (app.beta <= 25 || app.beta >= 60) app.okPanel.removeAttribute('hidden')
        if ((app.beta > 25 && app.beta < 30) || (app.beta > 50 && app.beta < 60)) app.warningPanel.removeAttribute('hidden')
        if (app.beta >= 30 && app.beta <= 50) app.dangerPanel.removeAttribute('hidden')
    }

}
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', app.setBeta, false);

}
app.panels = Array.from(document.getElementsByClassName("slope-panel"))
app.okPanel = app.panels.find(p => { return p.classList.contains('slope-ok') })
app.warningPanel = app.panels.find(p => { return p.classList.contains('slope-warning') })
app.dangerPanel = app.panels.find(p => { return p.classList.contains('slope-danger') })
