class GameplayScene extends Phaser.Scene {
    constructor(){
        super("gameplay");
    }

    preload(){
        this.load.image("background", "assets/images/network.jpg")
    }

    create(){
        this.background = this.add.image(0,0, "background");
        this.background.setOrigin(0,0);
        this.add.text(20, 20, "Game Scene", {font: "25px Arial", fill: "black"})
        
    }
}