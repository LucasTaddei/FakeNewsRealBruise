class resultScene extends Phaser.Scene {

    init(score) {
        this.score = score;

        this.cameras.main.setBackgroundColor(this.score.backgroundColor);
    }

    constructor(data) {
        console.log(data);
        super("result");
    }

    preload() {

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

        this.load.audio("titleBruise","assets/sounds/titleBruise.m4a");

        this.populationDeath = 0;
    }

    create() {

        this.endsong = this.sound.add("titleBruise");
        this.endsong.play();

        this.populationDeath = Math.round(100-((this.score.missedArrows/(this.score.missedArrows + this.score.catchedArrows))*100));
        this.avocadose = Math.round(this.score.level*7.543);

        if (this.score.isRain) {
            this.itsRaingingMan();
        }

        if (this.score.isStrongRain) {
            this.itsRaingingMen();
        }

        // ajout du délai
        this.time.addEvent({

            delay: 1000,
            callback: ()=>{

                var congrats = this.add.text(640,70, "CONGRATS!", {font: "40px jack", fill: "#112b1a"}).setOrigin(0.5);
                var congratsText = this.add.text(640,120, "You've shared " + this.score.sharedNews + " news", {font: "40px jack", fill: "#112b1a"}).setOrigin(0.5);
                
                if (this.score.level <= 10 && this.score.sharedNews <= 10) {
                    var congratsTextWin = this.add.text(640,270, "Thanks to your talent at sharing fake news " + "Birthdays have been celebrated forever, " + this.avocadose + " people ate an avocadoe and trains are used in Switzerland... As a result, the third world war started but only " + this.populationDeath + "% of the population died", {font: "30px imperator", fill: "#112b1a",lineSpacing: 5}).setOrigin(0.5);
                    congratsTextWin.setWordWrapWidth(600, false).setAlign('center');

                } else if (this.score.level > 10 && this.score.sharedNews <= 10) {
                    var congratsTextSurvive = this.add.text(640,270, "Thanks to your talent at sharing fake news " + "Birthdays have been celebrated forever, " + this.avocadose + " people tasted avocadoes and trains are enjoyed in Switzerland... As a result, the third world war started but " + this.populationDeath + "% of the population survived", {font: "30px imperator", fill: "#112b1a",lineSpacing: 5}).setOrigin(0.5);
                    congratsTextSurvive.setWordWrapWidth(600, false).setAlign('center');

                } else {
                    var congratsTextLose = this.add.text(640,270, "Thanks to your talent at sharing fake news " + "Birthdays have been canceled forever, " + this.avocadose + " people overdosed on avocadoes and trains are banned from Switzerland... As a result, the third world war started and " + this.populationDeath + "% of the population died", {font: "30px imperator", fill: "#112b1a",lineSpacing: 5}).setOrigin(0.5);
                    congratsTextLose.setWordWrapWidth(600, false).setAlign('center');
                }

                // afficher les scores bruts
                // var scoreText = this.add.text(20, 370, "Catched arrows: " + this.score.catchedArrows, {font: "30px jack", fill: "#112b1a"});
                // var failText = this.add.text(20, 410, "Missed arrows: " + this.score.missedArrows, {font: "30px jack", fill: "#112b1a"});
                // var sharedText = this.add.text(20, 450, "Shared News: " + this.score.sharedNews, {font: "30px jack", fill: "#112b1a"});
                // var levelText = this.add.text(20, 490, "Level: " + this.score.level, {font: "30px jack", fill: "#112b1a"});

                // créer le bouton next et lancer la phase 2 de l'animation
                var next = this.add.text(640,570, "Next", {font: "50px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive();
                next.on('pointerdown', function() {

                    this.add.sprite(640, 360, 'bomb9').setOrigin(0.5).play('bombPhase2');

                    // supprimer les éléments de la phase 1
                    if (this.score.level <= 10 && this.score.sharedNews <= 10) {
                        phase1.destroy();
                        next.destroy();
                        congrats.destroy();
                        congratsText.destroy();
                        congratsTextWin.destroy();
                        // scoreText.destroy();
                        // failText.destroy();
                        // sharedText.destroy();
                        // levelText.destroy();

                    } else if (this.score.level > 10 && this.score.sharedNews <= 10) {
                        phase1.destroy();
                        next.destroy();
                        congrats.destroy();
                        congratsText.destroy();
                        congratsTextSurvive.destroy();
                        // scoreText.destroy();
                        // failText.destroy();
                        // sharedText.destroy();
                        // levelText.destroy();

                    } else {
                        phase1.destroy();
                        next.destroy();
                        congrats.destroy();
                        congratsText.destroy();
                        congratsTextLose.destroy();
                        // scoreText.destroy();
                        // failText.destroy();
                        // sharedText.destroy();
                        // levelText.destroy();
                    } 

                    this.tweens.add({
                        targets: [congrats],
                        alpha: {value: 1, duration: 300, ease: 'Power1'},
                        delay: 700,
                    });

                    // ajouter le texte de la phase 2 à la fin de l'explosion
                    var lifeIs = this.add.text(450,50,"LIFE IS", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setAlpha(0);
                    var not = this.add.text(640,50,"NOT", {font: "60px jack", fill: "#277D44"}).setOrigin(0.5).setAlpha(0);
                    var AGame = this.add.text(830,50,"A GAME", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setAlpha(0);
                    var lesson = this.add.text(640,160,"There is no timer and no replay. The consequences of your acts are real and can affect people. Don’t act rashly. ", {font: "40px imperator", fill: "#112b1a", lineSpacing:5}).setOrigin(0.5).setAlpha(0);
                    lesson.setWordWrapWidth(800, false).setAlign('center').setAlpha(0);

                    var next3 = this.add.text(640,660, "Next", {font: "50px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive().setAlpha(0);
                    next3.on('pointerdown', function() {
                        this.scene.start('end', {endSong: this.endsong})
                    }, this);

                    // délai pour l'arrivée du texte + fondu d'entrée
                    this.tweens.add({
                        targets: [lifeIs, not, AGame, lesson, next3],
                        alpha: {value: 1, duration: 300, ease: 'Power1'},          
                        delay: 700,  
                    });

                }, this);
            }
        })

        // créer l'animation bombe partie 1
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

        // ajouter la première image puis lancer l'animation
        var phase1 = this.add.sprite(640, 360, 'bomb1').setOrigin(0.5).play('bombPhase1');

        // créer l'animation bombe partie 2
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
    }

    // animation lorsqu'il commence à pleuvoir
    itsRaingingMan() {
        this.rain = this.add.particles('rain');
        this.rain.setDepth(25);
    
        this.rain.createEmitter({
            x: { min: -200, max: 1200 },
            y: 0,
            rotate: -10,
            alpha: 0.1,
            lifespan: { min: 1500, max: 2000 },
            speedY: { min: 50, max: 150 },
            gravityY: 400,
            gravityX: Phaser.Math.Between(50, 100),
            frequency: 80
        });
    }

    itsRaingingMen() {
        this.rain = this.add.particles('rain');
        this.rain.setDepth(25);

        this.rain.createEmitter({
            x: { min: -200, max: 1200 },
            y: 0,
            rotate: -10,
            alpha: 0.2,
            lifespan: { min: 1500, max: 2000 },
            speedY: { min: 50, max: 150 },
            gravityY: 400,
            gravityX: Phaser.Math.Between(50, 100),
            frequency: 50
        });
    }
}