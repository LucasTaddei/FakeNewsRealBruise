class titleScene extends Phaser.Scene {

    constructor(){
        super("title");
    }

    preload(){
        this.load.image('logo','assets/images/LOGO.png');
        this.load.image('skyline', 'assets/images/Skyline.png');
        this.load.image('cloud1', 'assets/images/cloud1.png');
        this.load.image('cloud2', 'assets/images/cloud2.png');
        this.load.image('cloud3', 'assets/images/cloud3.png');
        this.load.image('arrowKeys', 'assets/images/arrowKeys.png');
        this.load.audio("titleBruise","assets/sounds/titleBruise.m4a")
    }

   create(){
    // ajouter les nuages, skyline et musique
    
    this.cloud1 = this.add.image(50, 100, 'cloud1');
    this.cloud2 = this.add.image(500, 300, 'cloud2');
    this.cloud3 = this.add.image(1000, 200, 'cloud3');

    var skyline = this.add.image(640, 360, 'skyline').setOrigin(0.5);

    var titleBruise = this.sound.add("titleBruise");
        titleBruise.play({volume: 0.7, loop: true});


    // ajouter les textes et images fixes de la page 1.1
    var titleTextLine1 = this.add.text(200, 80,"Fake News", {font: '90px jack', fill: "#112b1a"}).setAlpha(0);
    var titleTextLine2 = this.add.text(550, 150,"Real Bruise", {font: '90px jack', fill: "#112b1a"}).setAlpha(0);
    var logo = this.add.image(640,330,'logo').setScale(0.45).setAlpha(0);
    var gameExplanation = this.add.text(640, 450, "Share the posts in rhythms", {font: '35px jack', fill: "white"}).setOrigin(0.5).setAlpha(0);
    var gameExplanation2 = this.add.text(640, 490, "with the key arrows", {font: '35px jack', fill: "white"}).setOrigin(0.5).setAlpha(0);
    var start = this.add.text(640,570, "Play", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive().setAlpha(0);

    this.tweens.add({
        targets: [titleTextLine1, titleTextLine2,logo, gameExplanation, gameExplanation2, start],
        alpha: { value: 1, duration: 300, ease: 'Power1' },
        delay: 300,  
    });

    // ajouter les flèches du clavier de la page 1.2
    var bravo = this.add.text(640, 100,"How to play", {font: '80px jack', fill: '#112b1a'}).setOrigin(0.5).setAlpha(0);

    var howToText = this.add.text(900, 350, "Click the arrows of your keyboard when the falling arrow is on the right spot. After 5 consecutives right clicks, a NEWS is shared.", {font: '30px jack', fill: '#112b1a', lineSpacing: 10}).setOrigin(0.5).setAlpha(0);
    howToText.setWordWrapWidth(600, false);
    var arrowKeys = this.add.image(300, 350, 'arrowKeys').setAlpha(0);

    var playButton = this.add.text(640,570, "Play", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive().setAlpha(0);

    // changement entre 1.1 et 1.2
    start.on('pointerdown', function() {
        titleTextLine1.destroy();
        titleTextLine2.destroy();
        logo.destroy();
        gameExplanation.destroy();
        gameExplanation2.destroy(); 
        start.destroy(); 
        this.tweens.add({
        targets: [bravo, howToText, playButton, arrowKeys],
        alpha: { value: 1, duration: 200, ease: 'Power1' },          
        delay: 200,  
    });
    }, this);

    playButton.on('pointerdown', function() {
        arrowKeys.destroy();
        howToText.destroy();
        playButton.destroy();
        bravo.destroy(); 
        this.scene.start('gameplay');
        titleBruise.stop();
    }, this);
}

    // faire se déplacer les nuages
    update(){
        this.moveClouds(this.cloud1, 0.3);
        this.moveClouds(this.cloud2, 0.1);
        this.moveClouds(this.cloud3, 0.2);
    }
        moveClouds (cloud, speed) {
            cloud.x += speed;
            if (cloud.x > config.width+150){
            this.resetCloudPosition(cloud);
            }
        }
        resetCloudPosition (cloud) {
            cloud.x = -200;
            var randomY = Phaser.Math.Between(0, 420)
            cloud.y = randomY;
        }
}