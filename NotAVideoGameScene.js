class notAVideoGameScene extends Phaser.Scene {
    constructor(){
        super("not");
    }

    preload(){
        //CECI EST UN TEST, POUR MONTRER A QUOI L'ANIMATION RESSEMBLE EN ENTIER (l'explication de la structure est sur la page résultat)
        this.load.path = 'assets/animations/';

        this.load.image('bomb1', 'Bomb1.png');
        this.load.image('bomb2', 'Bomb2.png');
        this.load.image('bomb3', 'Bomb3.png');
        this.load.image('bomb4', 'Bomb4.png');
        this.load.image('bomb5', 'Bomb5.png');
        this.load.image('bomb6', 'Bomb6.png');
        this.load.image('bomb6.1', 'Bomb6.1.png');
        this.load.image('bomb7', 'Bomb7.png');
        this.load.image('bomb8', 'Bomb8.png');
        this.load.image('bomb9', 'Bomb9.png');
        this.load.image('bomb10', 'Bomb10.png');
        this.load.image('bomb11', 'Bomb11.png');
        this.load.image('bomb12', 'Bomb12.png');
        this.load.image('bomb13', 'Bomb13.png');
        this.load.image('bomb14', 'Bomb14.png');
        
    }

    create(){
        this.anims.create({
            key: 'bombPart2',
            frames: [
                { key: 'bomb1' },
                { key: 'bomb2' },
                { key: 'bomb3' },
                { key: 'bomb4' },
                { key: 'bomb5' },
                { key: 'bomb6' },
                { key: 'bomb6.1' },
                { key: 'bomb7' },
                { key: 'bomb8' },
                { key: 'bomb9' },
                { key: 'bomb10' },
                { key: 'bomb11' },
                { key: 'bomb12' },
                { key: 'bomb13' },
                { key: 'bomb14', duration: 5 },
            ],
            frameRate: 10,
            repeat: 0,
        });
        this.add.sprite(640, 360, 'bomb9').setOrigin(0.5).play('bombPart2');

    }
}

