var config = {
    width: 1280,
    height: 720,
    backgroundColor: "#65FF99",
    scene: [titleScene, gameplayScene, pauseScene, ifNoClicks, resultScene, learnMore, endScene],
    audio: {disableWebAudio:true}
}

window.onload=function() {

    // https://stackoverflow.com/a/23522755
    isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    config.audio.disableWebAudio = !isSafari;

    var game = new Phaser.Game(config);
}