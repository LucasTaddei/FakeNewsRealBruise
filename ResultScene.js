class resultScene extends Phaser.Scene {

    init(score){
        this.score = score;
    }

    constructor(data){
        console.log(data);
        super("result");
    }

    preload(){
        //Ajouts pour toutes les animations
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
        this.load.audio("war","assets/sounds/war.wav");
        
    }

    create(){


        this.sound.add('war', {loop: false});


        
    // Ajout du texte
    this.time.addEvent({
            delay: 1000,
            callback: ()=>{
                var congrats = this.add.text(640,100, "Congrats!", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5);
                var scoreText = this.add.text(640, 200, "Catched: " + this.score.catchedArrows, {font: "30px jack", fill: "#112b1a"}).setOrigin(0.5)
                var failText = this.add.text(640, 240, "Missed: " + this.score.missedArrows, {font: "30px jack", fill: "#112b1a"}).setOrigin(0.5)
            }
    })

    // Créer l'animation bombe partie 1
       this.anims.create({
        key: 'bombPhase1',
        frames: [
            { key: 'bomb1' },
            { key: 'bomb2' },
            { key: 'bomb3' },
            { key: 'bomb4' },
            { key: 'bomb5' },
            { key: 'bomb6' },
            { key: 'bomb6.1' },
            { key: 'bomb7' },
            { key: 'bomb8', duration: 5 },
        ],
        frameRate: 10,
        repeat: 0,
    });

    //Ajouter la première image puis lancer l'animation
    var phase1 = this.add.sprite(640, 360, 'bomb1').setOrigin(0.5).play('bombPhase1');

    // Créer l'animation bombe partie 2
   this.anims.create({
    key: 'bombPhase2',
    frames: [
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

/* Keep that, on pourra utiliser ça après, ça ça marche!
this.time.addEvent({
    delay: 2000,
    callback: ()=>{
    }
})
*/

//Créer le bouton next et lancer la phase 2 de l'animation
var next = this.add.text(640,570, "Next", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive();
next.on('pointerdown', function() {
    this.add.sprite(640, 360, 'bomb9').setOrigin(0.5).play('bombPhase2');
    phase1.destroy();
    next.destroy();
}, this);
    }

}