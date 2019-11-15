class ResultScene extends Phaser.Scene {
    constructor(){
        super("result");
    }


    create(){
        var titleText = this.add.text(640, 200,"Resultat", {font: "60px Times", fill: "black"}).setOrigin(0.5)
    }
}