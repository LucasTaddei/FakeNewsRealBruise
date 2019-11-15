class GameplayScene extends Phaser.Scene {
    constructor(){
        super("gameplay");
    }

    preload(){
        this.load.image("background", "assets/images/network.jpg")
        this.load.audio("mainsong", "assets/sounds/realbruise.m4a")
    }

    create(){
        this.time.addEvent({
            delay: 184800,
            callback: ()=>{
                this.scene.start("result")
            }
        })
        let mainsong = this.sound.add("mainsong");
        mainsong.play();
        this.background = this.add.image(0,0, "background");
        this.background.setOrigin(0,0);
        this.add.text(20, 20, "Game Scene", {font: "25px Arial", fill: "black"})
        
    }
}