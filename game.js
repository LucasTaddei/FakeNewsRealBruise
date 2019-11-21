window.onload=function(){
    var game = new Phaser.Game(config);
}

var config = {
    width: 1280,
    height: 720,
    backgroundColor: "#65FF99",
    dom: {
        createContainer: true
    },
    scene: [gameplayScene,resultScene,notAVideoGameScene,endScene,titleScene]
}