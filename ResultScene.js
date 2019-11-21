class resultScene extends Phaser.Scene {

    init(score){
        this.score = score;
    }

    constructor(data){
        console.log(data);
        super("result");
    }

    preload(){
        //test animation, ne pas enlever svp
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
    }

    create(){
       //test animation, ne pas enlever svp
       this.anims.create({
        key: 'test',
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
        frameRate: 9,
        repeat: 0,
    });
    this.add.sprite(640, 360, 'bomb1').setOrigin(0.5).play('test');        


    this.time.addEvent({
        delay: 1000,
        callback: ()=>{
            var congrats = this.add.text(640,100, "Congrats!", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5);
            var scoreText = this.add.text(640, 200, "Catched: " + this.score.catchedArrows, {font: "30px jack", fill: "#112b1a"}).setOrigin(0.5)
            var failText = this.add.text(640, 240, "Missed: " + this.score.missedArrows, {font: "30px jack", fill: "#112b1a"}).setOrigin(0.5)
        }
    })

    this.time.addEvent({
        delay: 2000,
        callback: ()=>{
            var next = this.add.text(640,570, "Next", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive();
        }
        
    })

        next.on('pointerdown', () => this.scene.start("not"));
    }
}