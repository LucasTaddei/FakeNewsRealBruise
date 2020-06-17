class ifNoClicks extends Phaser.Scene {

    constructor(){
        super("ifNoClicks");
    }

    preload(){
        this.load.image('logo','assets/images/LOGO.png');
        this.load.image('skyline', 'assets/images/Skyline.png');
        this.load.image('cloud1', 'assets/images/cloud1.png');
        this.load.image('cloud2', 'assets/images/cloud2.png');
        this.load.image('cloud3', 'assets/images/cloud3.png');
    }

   create(){
    // ajouter les nuages
    this.cloud1 = this.add.image(50, 100, 'cloud1');
    this.cloud2 = this.add.image(500, 300, 'cloud2');
    this.cloud3 = this.add.image(1000, 200, 'cloud3');

    // ajouter les textes et images fixes
    var bravo = this.add.text(640, 200,"You're a hero", {font: '80px jack', fill: '#112b1a'}).setOrigin(0.5);
    var congratulations1 = this.add.text(640, 300, "It seems you don't play by the rules... ", {font: '35px imperator', fill:'#112b1a'}).setOrigin(0.5);
    var congratulations2 = this.add.text(640, 350, "Good for you! You didn't let the system fool you into sharing fake news.", {font: '35px imperator', fill:'#112b1a'}).setOrigin(0.5);
    var congratulations3 = this.add.text(640, 400, "You might just have saved the world from a dreadful faith.", {font: '35px imperator', fill:'#112b1a'}).setOrigin(0.5);
    var skyline = this.add.image(640, 360, 'skyline').setOrigin(0.5);

    var next = this.add.text(640,570, "Next", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive();
    next.on('pointerdown', function() {
        this.scene.start('end')
    }, this);
    }

    // faire se déplacer les nuages
    update(){
        this.moveClouds(this.cloud1, 0.4);
        this.moveClouds(this.cloud2, 0.1);
        this.moveClouds(this.cloud3, 0.3);
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