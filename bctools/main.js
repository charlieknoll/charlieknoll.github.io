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
        app.alpha = Math.abs(Math.round(e.beta - 90))
        document.getElementById("slope-angle-value").innerHTML = app.beta + '&#176;';
        var el = document.getElementById("alpha-angle-value")
        el.classList.remove("ok");
        el.classList.remove("warning");
        el.classList.remove("danger");
        el.innerHTML = app.alpha + '&#176;';
        el.classList.add(app.alpha < 18 ? 'ok' : app.alpha > 20 ? 'danger' : 'warning')
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
var aaContainer = document.getElementById("outer-container")
const constraints = window.constraints = {
    audio: false,
    video: { facingMode: "environment" }
    //video: { width: { max: aaContainer.offsetWidth }, height: { max: aaContainer.offsetHeight } }
};
async function init(e) {
    window.navigator = window.navigator || {};
    var d = await navigator.mediaDevices.enumerateDevices()
    //alert(JSON.stringify(d))
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        null;
    //alert('test')
    var device = d.find(v => v.label.includes('facing back'))
    if (!device) device = d.find(v => v.kind.includes('videoinput'))

    //constraints.video.deviceId = { exact: d.deviceId }
    if (navigator.getUserMedia === null) alert("No camera!")
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const video = document.querySelector('video');
    const videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints:', constraints);
    console.log(`Using video device: ${videoTracks[0].label}`);
    window.stream = stream; // make variable available to browser console
    video.srcObject = stream;

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js?v3', {
            scope: '.' // THIS IS REQUIRED FOR RUNNING A PROGRESSIVE WEB APP FROM A NON_ROOT PATH
        }).then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }
}
window.addEventListener('load', init);