class endScene extends Phaser.Scene {
    constructor(){
        super("end");
    }

    create(){    
        var rectangle = this.add.rectangle(640,250,1200,150,0xffffff).setOrigin(0.5);
        var thinkBefore = this.add.text(640,250, "Think before you share",{font: "90px jack", fill: '#112b1a'}).setOrigin(0.5);
        var saveLives = this.add.text(640,360, "Save lives, don't spread fake news.",{font: "50px jack", fill: '#112b1a'}).setOrigin(0.5);
        var retry = this.add.text(640,620, "Retry", {font: "70px jack", fill: 'white'}).setOrigin(0.5).setInteractive();
        //fonction pour rejouer ne pas fonctionnante

        retry.on('pointerdown', () => this.restart("gameplay"));
    }
}