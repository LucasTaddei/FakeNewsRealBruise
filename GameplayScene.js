class gameplayScene extends Phaser.Scene {

    constructor(){
        super("gameplay");

        // création d'un tableau vide pour les flèches qui défilent
        this.fallingArrows = [];

        this.fallingSpeed = 5;
        this.fallingDelay = 500;

        this.catchedArrows = 0;
        this.missedArrows = 0;
        this.sharedNews= 0;

        this.scoreLabel;
        this.failLabel;
        this.sharedLabel;

        this.newArrowsTimer;
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
            delay: 188000,
            callback: ()=>{
                this.scene.start("result", {catchedArrows: this.catchedArrows, missedArrows: this.missedArrows})
            }
        })

        // création du timer ajoutant de nouvelles flèches périodiquement
        this.newArrowsTimer = this.time.addEvent({
            delay: this.fallingDelay,
            loop: true,
            callback: ()=>{
                this.addArrow();
            }
        })

        // suppression du timer précédent et en ajoute un nouveau qui augmente la vitesse de défilement et réduit le délai d'apparition des nouvelles flèches
        this.time.addEvent({
            delay: 10000,
            loop: true,
            callback: ()=>{

                this.newArrowsTimer.remove();

                this.fallingSpeed *= 1.05;
                this.fallingDelay /= 1.05;

                this.newArrowsTimer = this.time.addEvent({
                    delay: this.fallingDelay,
                    loop: true,
                    callback: ()=>{
                        this.addArrow();
                    }
                })
            }
        })
        
        var mainsong = this.sound.add("mainsong");
        mainsong.play();
       
        this.background = this.add.image(0,0, "background").setOrigin(0);
        this.background.setOrigin(0,0);
        this.add.text(20, 20, "Game Scene", {font: "25px Arial", fill: "black"});

        this.scoreLabel = this.add.text(20, 60, this.catchedArrows, {font: "25px Arial", fill: "white"});
        this.failLabel = this.add.text(20, 90, this.catchedArrows, {font: "25px Arial", fill: "red"});
        this.sharedLabel = this.add.text(20, 120, this.sharedNews, { font: "25px Arial", fill: "green"});

        var label = this.add.text(0, 0, '', { font: "48px Arial Black", fill: "#c51b7d" });
        label.setStroke('#de77ae', 8);

        // création des 4 zones de collision des flèches
         this.add.image(500,600,'left').setOrigin(0);
         this.add.image(600,600,'up').setOrigin(0);
         this.add.image(700,600,'down').setOrigin(0);
         this.add.image(800,600,'right').setOrigin(0);

         var zone1 = this.add.zone(500, 600, 50, 50).setOrigin(0).setName('leftZone').setInteractive();
         var zone2 = this.add.zone(600, 600, 50, 50).setOrigin(0).setName('upZone').setInteractive();
         var zone3 = this.add.zone(700, 600, 50, 50).setOrigin(0).setName('downZone').setInteractive();
         var zone4 = this.add.zone(800, 600, 50, 50).setOrigin(0).setName('downZone').setInteractive();
    
         this.input.on('gameobjectdown', function (pointer, gameObject) {
            label.setText(gameObject.name);
            label.x = gameObject.x;
            label.y = gameObject.y;
        });  
    }

    update(time, delta){  

        // récupération de la touche enfoncée lors de l'update
        var cursorKeys = this.input.keyboard.createCursorKeys();

        var isUpKeyPressed = cursorKeys.up.isDown;
        var isDownKeyPressed = cursorKeys.down.isDown;
        var isLeftKeyPressed = cursorKeys.left.isDown;
        var isRightKeyPressed = cursorKeys.right.isDown;

        // pour chaque flèche affichée actuellement
        this.fallingArrows.forEach((currentArrow) => {

            // si la flèche est dans la zone de validation et que la touche correspondante est enfoncée: suppression de la flèche
            if (currentArrow.y >= 600 && currentArrow.y <= 650) {

                if (isLeftKeyPressed && currentArrow.name == "left") {
                    this.catchedArrows++;
                    this.removeArrow(currentArrow);
                } else if (isUpKeyPressed && currentArrow.name == "up") {
                    this.catchedArrows++;
                    this.removeArrow(currentArrow);
                } else if (isDownKeyPressed && currentArrow.name == "down") {
                    this.catchedArrows++;
                    this.removeArrow(currentArrow);
                } else if (isRightKeyPressed && currentArrow.name == "right") {
                    this.catchedArrows++;
                    this.removeArrow(currentArrow);
                }

                if (this.catchedArrows %5 ===0 && this.catchedArrows++){
                    this.sharedNews++;
                }
                
            }

            

           
            
            // suppression de la flèche du tableau une fois au-dehors de la zone pour éviter une saturation de la mémoire
            if (currentArrow.y > 720){
                this.missedArrows++;
                this.removeArrow(currentArrow);
            }
            

            // déplacement de la flèche
            currentArrow.y += this.fallingSpeed;
            
          });
        

          this.scoreLabel.setText(this.catchedArrows);
          this.failLabel.setText(this.missedArrows);
          this.sharedLabel.setText(this.sharedNews);
    }

    // suppression de la flèche du tableau ainsi que son index
    removeArrow(arrow) {
        var arrowToBeDeleted = arrow;
        this.fallingArrows.splice(this.fallingArrows.indexOf(arrowToBeDeleted), 1);
        arrowToBeDeleted.destroy();      
    }

    // création une flèche
    addArrow(){
        var randomArrow = Math.floor(Math.random() * Math.floor(4));
        var newImage;

        // ajout d'une flèche aléatoire dans le tableau selon sa position (1 = left, 2 = up, 3 = down, 4 = right)
        if (randomArrow == 0){
            newImage = this.add.image(500, 60, 'left').setOrigin(0);
            newImage.name = 'left';
            this.fallingArrows.push(newImage);
        } else if (randomArrow == 1){
            newImage = this.add.image(600, 60, 'up').setOrigin(0);
            newImage.name = 'up';
            this.fallingArrows.push(newImage);
        } else if (randomArrow == 2){
            newImage = this.add.image(700, 60, 'down').setOrigin(0);
            newImage.name = 'down';
            this.fallingArrows.push(newImage);
        } else if (randomArrow == 3){
            newImage = this.add.image(800, 60, 'right').setOrigin(0);
            newImage.name = 'right';
            this.fallingArrows.push(newImage);
        }

    }

}