window.onload=function(){
    var game = new Phaser.Game(config);
}
var config = {
    width: 800,
    height: 600,
    backgroundColor: "#65FF99",
    scene: [EndScene,TitleScene,ResultScene,NotAVideoGameScene,GameplayScene]
}
