window.onload=function(){
    var game = new Phaser.Game(config);
}

var config = {
    width: 1280,
    height: 720,
    backgroundColor: "#65FF99",
    scene: [endScene,learnMore1,learnMore2,learnMore3,titleScene,gameplayScene,resultScene,ifNoClicks,notAVideoGameScene,howTo]
}