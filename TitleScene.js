class titleScene extends Phaser.Scene {

    constructor(){
        super("title");
    }

    preload(){
        
        this.load.image('start','assets/UIpack/PNG/grey_button02.png');
        this.load.image('logo','assets/images/LOGO.png')
    }

   create(){
    var start = this.add.image(640,500,'start').setInteractive();
    var logo = this.add.image(640,400,'logo').setScale(0.6);
    var startText = this.add.text(640,500, "Start", {font: "20px jack", fill: "black"}).setOrigin(0.5);
    var titleTextLine1 = this.add.text(200, 100,"Fake News", {font: '90px jack', fill: "black"});
    var titleTextLine2 = this.add.text(550, 170,"Real Bruise", {font: '90px jack', fill: "black"});
    var gameExplanation = this.add.text(640, 450, "Share the posts swiftly and in rythms", {font: '50px jack', fill:white})
        
    start.on('pointerdown', () => this.scene.start("gameplay"));
    }
}