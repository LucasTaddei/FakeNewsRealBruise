// fonction pour récupérer le navigateur du jeu afin de configurer le paramètre disableWebAudio en conséquence
var isSafari;

window.onload=function() {

    // https://stackoverflow.com/a/23522755
    isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    var game = new Phaser.Game(config);
}

var config = {
    width: 1280,
    height: 720,
    backgroundColor: "#65FF99",
    scene: [titleScene, gameplayScene, pauseScene, ifNoClicks, resultScene, learnMore, endScene],
    audio: {disableWebAudio: !isSafari}
}