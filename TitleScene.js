
class TitleScene extends Phaser.Scene {
    constructor(){
        super("title");
    }

    preload(){
        this.load.image('start','assets/UIpack/PNG/grey_button02.png');
    }

   create(){
    var start = this.add.image(640,500,'start').setInteractive();
    var startText = this.add.text(640,500, "Start", {font: "20px Times", fill: "black"}).setOrigin(0.5);
    var titleText = this.add.text(640, 200,"Fake News, Real Bruise", {font: "60px Times", fill: "black"}).setOrigin(0.5);
    

   
    start.on('pointerdown', () => this.scene.start("gameplay"));
    
}

}

