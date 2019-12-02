class hero extends Phaser.Scene {

    constructor(){
        super("hero");
    }

    preload(){
        this.load.image('logo','assets/images/LOGO.png');
        this.load.image('skyline', 'assets/images/Skyline.png');
        this.load.image('cloud1', 'assets/images/cloud1.png');
        this.load.image('cloud2', 'assets/images/cloud2.png');
        this.load.image('cloud3', 'assets/images/cloud3.png');
    }

   create(){
    //ajouter les nuages
    this.cloud1 = this.add.image(50, 100, 'cloud1');
    this.cloud2 = this.add.image(500, 300, 'cloud2');
    this.cloud3 = this.add.image(1000, 200, 'cloud3');

    //ajouter les textes et images fixes
    var youreAHero = this.add.text(640, 200,"Qu'est-ce qu'une Fake News", {font: '80px jack', fill: '#112b1a'}).setOrigin(0.5);
    var whatIsFN = this.add.text(640,300, "C’est une information volontairement mensongère et qui est destinée à tromper ou à manipuler la personne qui la lira. L’idée d’intention, de manipulation, est importante.", {font: '16px jack', fill: '#112b1a'}).setOrigin(0.5);
    whatIsFN.setWordWrapWidth(1000, false).setAlign('center');


    //ajouter la ville
    var skyline = this.add.image(640, 360, 'skyline').setOrigin(0.5);

    var returnButton2 = this.add.text(640,570, "Return", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive();
    returnButton2.on('pointerdown', function() {
        this.scene.start('end')
    }, this);
    }

    //faire se déplacer les nuages
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