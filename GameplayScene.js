class GameplayScene extends Phaser.Scene {
    constructor(){
        super("gameplay");
    }
    

    preload(){
        this.load.image("left","assets/UIpack/PNG/yellow_sliderLeft.png");
        this.load.image("up","assets/UIpack/PNG/yellow_sliderUp.png");
        this.load.image("down","assets/UIpack/PNG/yellow_sliderDown.png");
        this.load.image("right","assets/UIpack/PNG/yellow_sliderRight.png");
        this.load.image("background", "assets/images/network.jpg");
        this.load.audio("mainsong", "assets/sounds/realbruise.m4a");
        
    }

    create(){

        this.time.addEvent({
            delay: 184800,
            callback: ()=>{
                this.scene.start("result")
            }
        })
        
        let mainsong = this.sound.add("mainsong");
        mainsong.play();
       
        this.background = this.add.image(0,0, "background").setOrigin(0);
        this.background.setOrigin(0,0);
        this.add.text(20, 20, "Game Scene", {font: "25px Arial", fill: "black"});

        var label = this.add.text(0, 0, '', { font: "48px Arial Black", fill: "#c51b7d" });
        label.setStroke('#de77ae', 8);

         
        //création des 4 zones de collision des flèches
         this.add.image(400,600,'left').setOrigin(0.5);
         this.add.image(500,600,'up').setOrigin(0.5);
         this.add.image(600,600,'down').setOrigin(0.5);
         this.add.image(700,600,'right').setOrigin(0.5);

         var zone1 = this.add.zone(400, 600, 50, 50).setOrigin(0.5).setName('left').setInteractive();
         var zone2 = this.add.zone(500, 600, 50, 50).setOrigin(0.5).setName('up').setInteractive();
         var zone3 = this.add.zone(600, 600, 50, 50).setOrigin(0.5).setName('down').setInteractive();
         var zone4 = this.add.zone(700, 600, 50, 50).setOrigin(0.5).setName('down').setInteractive();

    
         this.input.on('gameobjectdown', function (pointer, gameObject) {

            label.setText(gameObject.name);
            label.x = gameObject.x;
            label.y = gameObject.y;
    
        });

        //ajout de flèches du clavier comme opérateurs

        



        
        
    }

}