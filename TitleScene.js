class TitleScene extends Phaser.Scene {
    constructor(){
        super("title");
    }
    create(){
    this.add.text(20, 20, "Fake News, Real Bruise");
}
}