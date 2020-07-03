class pauseScene extends Phaser.Scene {

    constructor() {
        super("pause");
    }

    preload() {

        this.lastSpaceBarPressedAt = new Date().getTime();

        this.load.image('logo','assets/images/LOGO.png');
        this.load.image('skyline', 'assets/images/Skyline.png');
        this.load.image('cloud1', 'assets/images/cloud1.png');
        this.load.image('cloud2', 'assets/images/cloud2.png');
        this.load.image('cloud3', 'assets/images/cloud3.png');

        this.load.audio("elevator","assets/sounds/elevator.mp3");
    }

    create() {

        // ajouter les nuages
        this.cloud1 = this.add.image(50, 100, 'cloud1');
        this.cloud2 = this.add.image(500, 300, 'cloud2');
        this.cloud3 = this.add.image(1000, 200, 'cloud3');

        // ajouter les textes et images fixes
        this.add.text(640, 300,"Pause", {font: '80px jack', fill: '#112b1a'}).setOrigin(0.5);

        this.elevator = this.sound.add("elevator");
        this.elevator.play({volume: 0.5, loop: true});
    }

    update() {

        // récupération de la touche enfoncée lors de l'update
        var cursorKeys = this.input.keyboard.createCursorKeys();

        var isSpaceKeyPressed = cursorKeys.space.isDown;

        if (isSpaceKeyPressed) {

            this.time.addEvent( {
                callback: ()=>{
                    this.scene.resume("gameplay");
                    this.elevator.stop();
                    this.scene.stop();
                }
            });
        }

        // faire se déplacer les nuages
        this.moveClouds(this.cloud1, 0.4);
        this.moveClouds(this.cloud2, 0.1);
        this.moveClouds(this.cloud3, 0.3);
    }

        moveClouds (cloud, speed) {
            cloud.x += speed;

            if (cloud.x > config.width+150) {
                this.resetCloudPosition(cloud);
            }
        }
        
        resetCloudPosition (cloud) {
            cloud.x = -200;
            var randomY = Phaser.Math.Between(0, 420)
            cloud.y = randomY;
        }
}