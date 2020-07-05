var config = {
    width: 1280,
    height: 720,
    backgroundColor: "#65FF99",
    scene: [titleScene, gameplayScene, pauseScene, ifNoClicks, resultScene, learnMore, endScene],
    audio: {disableWebAudio:true}
}

window.onload=function() {

    // https://stackoverflow.com/a/23522755 | règle le paramètre automatique audio en vrai ou faux selon le navigateur du joueur, pour éviter les latences
    isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    config.audio.disableWebAudio = !isSafari;

    var game = new Phaser.Game(config);
}