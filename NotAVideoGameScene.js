class notAVideoGameScene extends Phaser.Scene {
    constructor(){
        super("not");
    }

    create(){
 
        //Text
        this.add.text(640,570, "Next", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive();
        next2.on('pointerdown', () => this.scene.start("end"));


    }
}