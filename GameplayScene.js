class GameplayScene extends Phaser.Scene {

    constructor(){
        super("gameplay");

        // création d'un tableau vide pour les flèches qui défilent
        this.fallingArrows = [];
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

        this.time.addEvent({
            delay: 500,
            loop: true,
            callback: ()=>{
                this.addArrow();
            }
        })
        
        let mainsong = this.sound.add("mainsong");
        mainsong.play();
       
        this.background = this.add.image(0,0, "background").setOrigin(0);
        this.background.setOrigin(0,0);
        this.add.text(20, 20, "Game Scene", {font: "25px Arial", fill: "black"});

        var label = this.add.text(0, 0, '', { font: "48px Arial Black", fill: "#c51b7d" });
        label.setStroke('#de77ae', 8);

        // création des 4 zones de collision des flèches
         this.add.image(500,600,'left').setOrigin(0);
         this.add.image(600,600,'up').setOrigin(0);
         this.add.image(700,600,'down').setOrigin(0);
         this.add.image(800,600,'right').setOrigin(0);

         var zone1 = this.add.zone(500, 600, 50, 50).setOrigin(0).setName('left').setInteractive();
         var zone2 = this.add.zone(600, 600, 50, 50).setOrigin(0).setName('up').setInteractive();
         var zone3 = this.add.zone(700, 600, 50, 50).setOrigin(0).setName('down').setInteractive();
         var zone4 = this.add.zone(800, 600, 50, 50).setOrigin(0).setName('down').setInteractive();
    
         this.input.on('gameobjectdown', function (pointer, gameObject) {
            label.setText(gameObject.name);
            label.x = gameObject.x;
            label.y = gameObject.y;
        });  
    }

    update(time, delta){   
        this.fallingArrows.forEach((currentArrow) => {
            currentArrow.y += 5;
            
            // supprime l'objet du tableau une fois au-dehors de la zone pour éviter une saturation de la mémoire
            if (currentArrow.y > 720){
                let arrowToBeDeleted = currentArrow;
                this.fallingArrows.splice(this.fallingArrows.indexOf(arrowToBeDeleted), 1);
                arrowToBeDeleted.destroy();        
            }
          });
    }

    addArrow(){

        let randomArrow = Math.floor(Math.random() * Math.floor(4));

        // ajout d'une flèche aléatoire dans le tableau selon sa position (1 = left, 2 = up, 3 = down, 4 = right)
        if (randomArrow == 0){
            this.fallingArrows.push(this.add.image(500, 60, 'left').setOrigin(0));
        } else if (randomArrow == 1){
            this.fallingArrows.push(this.add.image(600, 60, 'up').setOrigin(0));
        } else if (randomArrow == 2){
            this.fallingArrows.push(this.add.image(700, 60, 'down').setOrigin(0));
        } else if (randomArrow == 3){
            this.fallingArrows.push(this.add.image(800, 60, 'right').setOrigin(0));
        }

    }

}