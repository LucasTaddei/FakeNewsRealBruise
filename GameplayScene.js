class gameplayScene extends Phaser.Scene {

    constructor(){
        super("gameplay");

        // création d'un tableau vide pour les flèches qui défilent
        this.fallingArrows = [];

        // initialisation des variables utilisées
        this.fallingSpeed = 5;
        this.fallingDelay = 500;

        // définition des compteurs de score
        this.catchedArrows = 0;
        this.missedArrows = 0;
        this.consecutiveArrows = 0;
        this.sharedNews = 0;

        this.scoreLabel;
        this.failLabel;
        this.sharedLabel;

        this.newArrowsTimer;
    }

    preload(){
        this.load.image("left","assets/UIpack/PNG/yellow_sliderLeft.png");
        this.load.image("up","assets/UIpack/PNG/yellow_sliderUp.png");
        this.load.image("down","assets/images/arrows/arrowDownFilled.png");
        this.load.image("right","assets/UIpack/PNG/yellow_sliderRight.png");
        
        this.load.image('logo','assets/images/LOGO.png')

        this.load.audio("mouseClick","assets/sounds/mouseClick.m4a");
        this.load.audio("realBruise3","assets/sounds/realbruise3.m4a");
        this.load.audio("chants","assets/sounds/chants.wav");
        this.load.audio("mall","assets/sounds/mall.wav");
        this.load.audio("screams","assets/sounds/screams.wav");
        this.load.audio("war","assets/sounds/war.wav");
        this.load.audio("trump","assets/sounds/trump.wav");
        this.load.audio("bombDrop", "assets/sounds/bombDrop.wav")

        this.load.json("news", "fakeNews.json")
    }

    create(){

        // var trump=this.add.sound('trump');
        // var war=this.add.sound('war');
        // var screams=this.add.sound('screams');


        this.time.addEvent({
            delay: 189000,
            callback: ()=>{
                this.scene.start("result", {catchedArrows: this.catchedArrows, missedArrows: this.missedArrows});

            //reset les scores et la vitesse lors d'un nouveau jeu
            this.catchedArrows = 0;
            this.missedArrows = -4;
            this.consecutiveArrows = 0;
            this.sharedNews = 0;
            this.fallingSpeed = 5;
            this.fallingDelay = 500;
            // trump.stop();
            // war.stop();
            // screams.stop();
            }
        })
        //ajouter un event pour faire trembler la caméra juste avant le passage à la scène suivante
        this.time.addEvent({
            delay: 188000,
            callback: ()=>{
                this.cameras.main.shake(500, 0.03, 0.01); //Duration, intensity, force 
            } 
        })
        //Ajouter bruit de bombe,timing à règler
        this.time.addEvent({
            delay: 188000,
            callback: ()=>{
                this.sound.play("bombDrop",{loop: false});
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
        
        var mainsong = this.sound.add("realBruise3");
        mainsong.play({volume: 0.7});

        


        //Fond blanc "zone de jeu"
        var backgroundRectangle = this.add.rectangle(640,360,600,720,0xffffff).setOrigin(0.5);

        //titre de la page 
        var home = this.add.text(350,20,'home', {font:'45px jack', fill: '#112b1a'});

        //Prototype "News" => attention le texte s'il est long n'est pas limité, je travaille dessus ;)
        //par contre les flèches passent encore devant...
        //lien qui pourrait aider pour le json: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/text/
        var backgroundNews = this.add.rectangle(640,135,600,130,0xE5E5E5).setOrigin(0.5);
        var titreExample = this.add.text(350,90, 'LEQUASIJOURNAL',{font:'25px jack', fill: '#112b1a'});
        var textExample = this.add.text(350,120, 'PEOPLE: La très célébre écrivaine Léa Keller reçoit un chateau dans la Loire pour son anniversaire',{font:'20px timeless', fill: '#112b1a'});
        //pour que le texte ne dépasse pas le fond de la News
        textExample.setWordWrapWidth(550, false);
       

        //colonne de gauche
        this.add.image(160, 100, 'logo').setOrigin(0.5).setScale(0.6);
        this.add.text(160, 220, 'Notifications', {font:'35px jack', fill: 'black'}).setOrigin(0.5);

        //Prototype "Notifications"
        var backgoundNotifications = this.add.rectangle(170,300,340,100,0xE5E5E5).setOrigin(0.5).setAlpha(0);
        var notifications = this.add.text(170, 300, 'Barack Obama follows you', {font:'20px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        notifications.setWordWrapWidth(300, false);
        //animation des notifications
        this.tweens.add({
            targets: [notifications, backgoundNotifications],
            alpha: { value: 1, duration: 500, ease: 'Power1' },
            hold: 1500, //temps avant que la notification disparaisse
            yoyo: true, //effet miroir de l'animation
            loop: 0,   
        });

        
        //labels
        this.scoreLabel = this.add.text(20, 500, this.catchedArrows, {font: "25px Arial", fill: "white"});
        this.failLabel = this.add.text(20, 530, this.catchedArrows, {font: "25px Arial", fill: "red"});
        this.sharedLabel = this.add.text(20, 560, this.sharedNews, {font: "25px Arial", fill: "green"});

        //Text "Shared!"
        this.shared = this.add.text(640,360,"SHARED!",{font: "40px Arial", fill: "red"}).setOrigin(0.5);
        this.shared.visible=false;

        //Text "disorder!"
        this.disorder = this.add.text(640,360,"DISORDER!",{font: "40px Arial", fill: "red"}).setOrigin(0.5);
        this.disorder.visible=false;

        //Text "death!
        this.death = this.add.text(640,360,"DEATH!",{font: "40px Arial", fill: "red"}).setOrigin(0.5);
        this.death.visible=false;

    

        var label = this.add.text(0, 0, '', { font: "48px Arial Black", fill: "#c51b7d" });
        label.setStroke('#de77ae', 8);

        

        // création des 4 zones de collision des flèches
         this.add.image(490,600,'left').setOrigin(0.5);
         this.add.image(590,600,'up').setOrigin(0.5);
         this.add.image(690,600,'down').setOrigin(0.5);
         this.add.image(790,600,'right').setOrigin(0.5);

    
         this.input.on('gameobjectdown', function (pointer, gameObject) {
            label.setText(gameObject.name);
            label.x = gameObject.x;
            label.y = gameObject.y;
        });  

        //ajout de sons qui vont servir pour les événements 
        this.sound.add('mouseClick', {loop: false});
        this.sound.add('war', {loop: false});
        this.sound.add("mall", {loop: false})
        this.sound.add("screams", {loop: false});
        this.sound.add("chants", {loop: false});
        this.sound.add("trump",{loop: false});

        
    }
    

    update(time, delta){  


        // récupération de la touche enfoncée lors de l'update
        var cursorKeys = this.input.keyboard.createCursorKeys();

        var isUpKeyPressed = cursorKeys.up.isDown;
        var isDownKeyPressed = cursorKeys.down.isDown;
        var isLeftKeyPressed = cursorKeys.left.isDown;
        var isRightKeyPressed = cursorKeys.right.isDown;

        var isUpKeyRelased = cursorKeys.up.isUp;
        var isDownKeyRelased = cursorKeys.down.isUp;
        var isLeftKeyRelased = cursorKeys.left.isUp;
        var isRightKeyRelased = cursorKeys.right.isUp;


        // pour chaque flèche affichée actuellement
        this.fallingArrows.forEach((currentArrow) => {

            // si la flèche est dans la zone de validation et que la touche correspondante est enfoncée: suppression de la flèche
            if (currentArrow.y >= 600 && currentArrow.y <= 650) {

                if (isLeftKeyPressed && currentArrow.name == "left") {
                    this.catchedArrows++;
                    this.consecutiveArrows++
                    this.removeArrow(currentArrow);
                    
                } else if (isUpKeyPressed && currentArrow.name == "up") {
                    this.catchedArrows++;
                    this.consecutiveArrows++
                    this.removeArrow(currentArrow);
                    
                } else if (isDownKeyPressed && currentArrow.name == "down") {
                    this.catchedArrows++;
                    this.consecutiveArrows++
                    this.removeArrow(currentArrow);
                    
                } else if (isRightKeyPressed && currentArrow.name == "right") {
                    this.catchedArrows++;
                    this.consecutiveArrows++
                    this.removeArrow(currentArrow);
                    
                }


                // enregistrement des combos + "Share" visible après la combo
                if (this.consecutiveArrows == 5 && this.sharedNews <26){
                        this.sharedNews++;
                        this.consecutiveArrows = 0;
                        this.shared.visible=true;
                        this.sound.play('mouseClick');

                }
                //"Share" ne plus visible après la combo
                else if(this.consecutiveArrows != 5){
                    this.shared.visible=false;
                    this.disorder.visible=false;
                    this.death.visible=false
                }

                else if(this.consecutiveArrows == 5 && this.sharedNews >=26 && this.sharedNews <44){
                    this.sharedNews++;
                    this.consecutiveArrows = 0;
                    this.disorder.visible=true;
                    this.sound.play('mouseClick')
                }

                else if(this.consecutiveArrows == 5 && this.sharedNews >=44){
                    this.sharedNews++;
                    this.consecutiveArrows = 0;
                    this.death.visible=true;
                    this.sound.play('mouseClick')
                }

            

                // jeu termine si tu ne clique rien
                if(this.catchedArrows==0 && this.missedArrows == 15){
                    this.add.text(640,360,"THAT'S THE SPIRIT", {font: "40px Arial", fill: "red"}).setOrigin(0.5);
                    this.time.addEvent({
                        delay: 3000,
                        callback: ()=>{
                            this.scene.start("ifNoClicks")
                        }
                    });
                }
                




                // musique progressive : ajout de sons d'ambiance après un certain nombre de news partagées
                if(this.sharedNews == 5 && this.consecutiveArrows == 1){
                    this.sound.play('mall',{loop: false});
                }

                if(this.sharedNews == 15 && this.consecutiveArrows == 1){
                    this.sound.play('chants', {loop: false});
                }

                if(this.sharedNews == 27 && this.consecutiveArrows == 1){
                    this.sound.play('screams',{volume: 0.5}, {loop: false});
                    
                }
                
                

                if(this.sharedNews == 40 && this.consecutiveArrows == 1){
                    this.sound.play('trump',{detune: 0.5}, {loop: false});
                }

                if(this.sharedNews == 45 && this.consecutiveArrows == 1){
                    this.sound.play('war',{loop: false});
                }


                            
        }

    //     if (currentArrow.y < 600 && currentArrow.y > 650){

    //         if(isUpKeyPressed){
    //         this.consecutiveArrows=0;
    //         this.missedArrows++;
    //     }
    //     else if(isDownKeyPressed){
    //         this.consecutiveArrows=0;
    //         this.missedArrows++;
    //     }
    //     else if(isLeftKeyPressed){
    //         this.consecutiveArrows=0;
    //         this.missedArrows++;
    //     }
    //     else if(isRightKeyPressed){
    //         this.consecutiveArrows=0;
    //         this.missedArrows++;
    //     }
    // }

            // suppression de la flèche du tableau une fois au-dehors de la zone pour éviter une saturation de la mémoire
            if (currentArrow.y > 720){
                this.missedArrows++;
                this.consecutiveArrows = 0;
                this.removeArrow(currentArrow);
            }

            // déplacement de la flèche
            currentArrow.y += this.fallingSpeed;

            

            
          });

          // actualisation des scores
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
            newImage = this.add.image(490, 170, 'left').setOrigin(0.5);
            newImage.name = 'left';
            this.fallingArrows.push(newImage);
        } else if (randomArrow == 1){
            newImage = this.add.image(590, 170, 'up').setOrigin(0.5);
            newImage.name = 'up';
            this.fallingArrows.push(newImage);
        } else if (randomArrow == 2){
            newImage = this.add.image(690, 170, 'down').setOrigin(0.5);
            newImage.name = 'down';
            this.fallingArrows.push(newImage);
        } else if (randomArrow == 3){
            newImage = this.add.image(790, 170, 'right').setOrigin(0.5);
            newImage.name = 'right';
            this.fallingArrows.push(newImage);
        }

    }
  

}