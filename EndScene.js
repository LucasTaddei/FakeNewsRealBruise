class endScene extends Phaser.Scene {

    init(song) {
        this.song = song;
    }

    constructor() {
        super("end");
    }

    preload() {
    }

    create() {    
        var rectangle = this.add.rectangle(640,250,1200,150,0xffffff).setOrigin(0.5);
        var thinkBefore = this.add.text(640,250, "Think before you share",{font: "90px jack", fill: '#112b1a'}).setOrigin(0.5);
        var saveLives = this.add.text(640,360, "Save lives, don't spread fake news.",{font: "50px jack", fill: '#112b1a'}).setOrigin(0.5);
        var retry = this.add.text(640,580, "Retry", {font: "70px jack", fill: 'white'}).setOrigin(0.5).setInteractive();


        //création du bouton qui renvoit à la page Hero
        var hero = this.add.text(1100,650, "Be a hero", {font: "35px jack", fill: 'white'}).setOrigin(0.5).setInteractive();
        hero.on('pointerdown', function () {

            this.scene.start('learnMore');
        },this)

        // fonction pour rejouer
        retry.on('pointerdown', function () {

            this.song.endSong.stop();

            this.scene.start('gameplay');
        },this);
    }
}
