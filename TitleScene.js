
class TitleScene extends Phaser.Scene {
    constructor(){
        super("title");
    }

    //preload(){
    //    game.load.spritesheet('start','assets/UIpack/PNG/grey_button02.png', 193, 71);
    //}

   create(){
    //this.start = this.add.spritesheet(0,0, "start");
    //this.start.setOrigin(0,0);    ;
    this.add.text(20, 20, "Fake News, Real Bruise");
    

    this.scene.start("gameplay");
}
}

