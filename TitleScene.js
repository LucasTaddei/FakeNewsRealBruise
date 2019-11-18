class titleScene extends Phaser.Scene {

    constructor(){
        super("title");
    }

    preload(){

        this.load.image('logo','assets/images/LOGO.png')
    }

   create(){
    var titleTextLine1 = this.add.text(200, 100,"Fake News", {font: '90px jack', fill: "black"});
    var titleTextLine2 = this.add.text(550, 170,"Real Bruise", {font: '90px jack', fill: "black"});
    var logo = this.add.image(640,370,'logo').setScale(0.5);
    var gameExplanation = this.add.text(640, 500, "Share the posts swiftly and in rhythms", {font: '35px jack', fill: "white"}).setOrigin(0.5);
    var gameExplanation = this.add.text(640, 540, "with the key arrows", {font: '35px jack', fill: "white"}).setOrigin(0.5);
    var start = this.add.text(640,650, "Start", {font: "60px jack", fill: "black"}).setOrigin(0.5).setInteractive();
        
    start.on('pointerdown', () => this.scene.start("gameplay"));
    }
}