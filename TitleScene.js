class titleScene extends Phaser.Scene {

    constructor(){
        super("title");
    }

    preload(){
        this.load.image('logo','assets/images/LOGO.png')
        this.load.image('skyline', 'assets/images/Skyline.png')
        this.load.image ('cloud1', 'assets/images/cloud1.png')
        this.load.image ('cloud2', 'assets/images/cloud2.png')
        this.load.image ('cloud3', 'assets/images/cloud3.png')
    }

   create(){
    //ajouter le nuages
    this.cloud1 = this.add.image( 50, 100, 'cloud1');
    this.cloud2 = this.add.image(500, 300, 'cloud2');
    this.cloud3 = this.add.image(1000, 200, 'cloud3');

    var titleTextLine1 = this.add.text(200, 80,"Fake News", {font: '90px jack', fill: "#112b1a"});
    var titleTextLine2 = this.add.text(550, 150,"Real Bruise", {font: '90px jack', fill: "#112b1a"});
    var logo = this.add.image(640,330,'logo').setScale(0.45);
    var gameExplanation = this.add.text(640, 450, "Share the posts swiftly and in rhythms", {font: '35px jack', fill: "white"}).setOrigin(0.5);
    var gameExplanation = this.add.text(640, 490, "with the key arrows", {font: '35px jack', fill: "white"}).setOrigin(0.5);
    var start = this.add.text(640,570, "Start", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive();
    var skyline = this.add.image(640, 360, 'skyline').setOrigin(0.5);
    

        
    start.on('pointerdown', () => this.scene.start("gameplay"));


    }
    //faire bouger les nuages
    update(){
        this.moveClouds(this.cloud1, 0.4);
        this.moveClouds(this.cloud2, 0.1);
        this.moveClouds(this.cloud3, 0.3);
    }


        moveClouds (cloud, speed) {
            cloud.x += speed;
            if (cloud.x > config.width+150){
            this.resetCloudPos(cloud);
            }
        }
    
        resetCloudPos (cloud) {
            cloud.x = -200;
            var randomY = Phaser.Math.Between(50, 400)
            cloud.y = randomY;
        }
}