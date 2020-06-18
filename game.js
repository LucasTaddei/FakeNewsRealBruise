window.onload=function(){
    var game = new Phaser.Game(config);
}

var config = {
    width: 1280,
    height: 720,
    backgroundColor: "#65FF99",
    scene: [titleScene,gameplayScene,ifNoClicks,resultScene,learnMore,endScene],
    audio:{disableWebAudio: false}
    
}

game.onload(
    this.load.audio("war","assets/sounds/war.wav"),
        this.load.audio("trump","assets/sounds/trump.wav")
)