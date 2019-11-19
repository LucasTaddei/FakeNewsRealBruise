class endScene extends Phaser.Scene {
    constructor(){
        super("end");
    }

    create(){
        
        var retry = this.add.text(640,570, "Retry", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive();

        //fonction pour rejouer ne pas fonctionnante
        retry.on('pointerdown', () => this.restart("gameplay"));
    }
}