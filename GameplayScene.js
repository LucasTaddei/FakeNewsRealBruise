class gameplayScene extends Phaser.Scene {

    constructor(){
        super("gameplay");
        
    }

    preload(){

        // création d'un tableau vide pour les flèches qui défilent
        this.fallingArrows = [];

        // création d'un tableau vide pour les flèches capturées
        this.capturedArrows = [];

        // initialisation des variables utilisées
        this.fallingSpeed = 5;
        this.fallingDelay = 500;

        // variable pour doubler le nombre de flèche
        this.isDoubleArrowTime = false;
        // type de la dernière flèche créée afin d'éviter une superposition de flèches identiques
        this.lastArrowType = 0;

        // capture le score de flèches manquées depuis la dernière accélération de la vitesse
        this.lastScoreMissedArrows = 0;

        // définition des compteurs de score
        this.catchedArrows = 0;
        this.missedArrows = 0;
        this.consecutiveArrows = 0;
        this.sharedNews = 0;

        this.scoreLabel;
        this.failLabel
        this.sharedLabel;

        this.newArrowsTimer; 

        // arrows outline
        this.load.image("leftOutline","assets/images/arrows/leftOutlineRed.png");
        this.load.image("upOutline","assets/images/arrows/upOutlineYellow.png");
        this.load.image("downOutline","assets/images/arrows/downOutlinePurple.png");
        this.load.image("rightOutline","assets/images/arrows/rightOutlineblue.png");
        
        // arrows filled
        this.load.image("leftFilled","assets/images/arrows/leftFilledRed.png");
        this.load.image("upFilled","assets/images/arrows/upFilledYellow.png");
        this.load.image("downFilled","assets/images/arrows/downFilledPurple.png");
        this.load.image("rightFilled","assets/images/arrows/rightFilledBlue.png");
        
        this.load.image('logo','assets/images/LOGO.png');

        this.load.audio("mouseClick","assets/sounds/woop2.m4a");
        this.load.audio("realBruise4","assets/sounds/realbruise4.m4a");
        this.load.audio("chants","assets/sounds/chants.wav");
        this.load.audio("mall","assets/sounds/mall.wav");
        this.load.audio("screams","assets/sounds/screams.m4a");
        this.load.audio("war","assets/sounds/war.wav");
        this.load.audio("trump","assets/sounds/trump.wav");
        this.load.audio("bombDrop", "assets/sounds/bombDrop.wav");
        this.load.audio("impact","assets/sounds/impact.m4a");

        this.load.image("flame1","assets/animations/flame1.png");
        this.load.image("flame2","assets/animations/flame2.png");
        this.load.image("flame3","assets/animations/flame3.png");
        this.load.image("flame4","assets/animations/flame4.png");
        this.load.image("flame5","assets/animations/flame5.png");

        this.load.image('heart', 'assets/images/reactions/heart.png');
        this.load.image('like', 'assets/images/reactions/like.png');
        this.load.image('skullHeart', 'assets/images/reactions/skullHeart.png');
    }

    create(){

        this.time.addEvent({
            delay: 189000,
            callback: ()=>{
                this.scene.start("result", {catchedArrows: this.catchedArrows, missedArrows: this.missedArrows, sharedNews: this.sharedNews});
            }
        })

        // ajouter un event pour faire trembler la caméra juste avant le passage à la scène suivante
        this.time.addEvent({
            delay: 188500,
            callback: ()=>{
                this.cameras.main.shake(500, 0.03, 0.01); // duration, intensity, force 
            } 
        })

        // ajouter bruit de bombe, timing à régler
        this.time.addEvent({
            delay: 180000,
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

                // ajoute une flèche supplémentaire à capturer
                if (this.isDoubleArrowTime) {
                    this.addArrow();
                }
            }
        })

        // Deux choses à faire: si le joueur loupe plusieurs flèches, le timer décroit

        // suppression du timer précédent et en ajoute un nouveau qui augmente la vitesse de défilement et réduit le délai d'apparition des nouvelles flèches
        this.time.addEvent({

            delay: 10000,
            loop: true,
            callback: ()=>{

                this.newArrowsTimer.remove();

                if (this.missedArrows - this.lastScoreMissedArrows < 10){

                    // ajuste la vitesse en fonction du nombre de flèches capturées par le joueur
                    this.fallingSpeed *= 1.5;
                    this.fallingDelay /= 1.5;
                }

                this.lastScoreMissedArrows = this.missedArrows;

                this.newArrowsTimer = this.time.addEvent({
                    delay: this.fallingDelay,
                    loop: true,
                    callback: ()=>{
                        this.addArrow();

                        // ajoute une flèche supplémentaire à capturer
                        if (this.isDoubleArrowTime) {
                            this.addArrow();
                        }
                    }
                })
            }
        })

        this.sound.play("realBruise4",{loop: true});

        // fond blanc "zone de jeu"
        var backgroundRectangle = this.add.rectangle(640,360,600,700,0xFFFFFF).setOrigin(0.5);

        // titre de la page 
        var home = this.add.text(350,20,'HOME', {font:'45px jack', fill: 'black'});
        var backgroundNews = this.add.rectangle(640,135,580,130,0xE5E5E5).setOrigin(0.5);

        // travailler avec la visibilité pour les news
        this.title1 = this.add.text(360,90, "Journal of Times",{font:'25px jack', fill: 'black'}).setVisible(true);
        this.text1 = this.add.text(360,120, "Avocadoes from a specific mexican region make hair turn blue",{font:'20px imperator', fill: 'black'}).setVisible(true);
        
        // pour que le texte ne dépasse pas le fond de la News
        this.text1.setWordWrapWidth(570, false);

        this.title2 = this.add.text(360,90, "The Flying Duck",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text2 = this.add.text(360,120, "Swiss 1000CHF banknotes will be distributed by the governement to all who come in front of the Federal Palace in Bern",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text2.setWordWrapWidth(570, false);

        this.title3 = this.add.text(360,90, "The Nightly Telegraph",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text3 = this.add.text(360,120, "Jessica, the famous filmmaker, declared she hates ukulele since the unexpected success of her short film about digital humanities",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text3.setWordWrapWidth(570, false);

        this.title4 = this.add.text(360,90, "The Washington Toast",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text4 = this.add.text(360,120, "Dream jobs promised by Donald Trump for all who present themselves every first Mondays of each month in front of the White House",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text4.setWordWrapWidth(570, false);

        this.title5 = this.add.text(360,90, "The Gardiner",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text5 = this.add.text(360,120, "In the small village of la Brévine, a dog was seen giving finds to people complaining about the cold weather",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text5.setWordWrapWidth(570, false);

        this.title6 = this.add.text(360,90, "Naturally",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text6 = this.add.text(360,120, "According to a very serious study published by the University of Stafford, people with big feet and long noses don't get along with their partner's elephant",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text6.setWordWrapWidth(570, false);

        this.title7 = this.add.text(360,90, "The New York Dime",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text7 = this.add.text(360,120, "According an investigation from the New York Lost, Fake news do NOT constitute a big danger for democraties",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text7.setWordWrapWidth(570, false);

        this.title8 = this.add.text(360,90, "Daily Bruise",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text8 = this.add.text(360,120, "The total weight of all châteaux de la Loire is equivalent to the yearly average wine consumption for swiss residents",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text8.setWordWrapWidth(570, false);

        this.title9 = this.add.text(360,90, "24 Leurres",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text9 = this.add.text(360,120, "The cheese Vacherin fribourgeois has calming attributes, especially when melted in Fondue,",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text9.setWordWrapWidth(570, false);

        this.title10 = this.add.text(360,90, "New York Lost",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text10 = this.add.text(360,120, "According to Tinkerbell, Peter Pan's existence has been proven",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text10.setWordWrapWidth(570, false);

        this.title11 = this.add.text(360,90, "The Minute",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text11 = this.add.text(360,120, "After years of waiting, swiss trains will finally be free for all citizens who will want to use them",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text11.setWordWrapWidth(570, false);

        this.title12 = this.add.text(360,90, "The Flying Duck",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text12 = this.add.text(360,120, "Avancer sur les mains rejetterait moins de CO2 dans l'atmosphère selon une étude de l'université de la Chaux-de-fonds",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text12.setWordWrapWidth(570, false);

        this.title13 = this.add.text(360,90, "The Morning Ghost",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text13 = this.add.text(360,120, "Eating five carambars per day makes you look like a million dollars",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text13.setWordWrapWidth(570, false);

        this.title14 = this.add.text(360,90, "The Washington Toast",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text14 = this.add.text(360,120, "Water and soil pollution could be a 21st century invention created with the sole purpose of generating fear",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text14.setWordWrapWidth(570, false);

        this.title15 = this.add.text(360,90, "The Yearly Mail",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text15 = this.add.text(360,120, "University students' complaints about tiredness seems to be just a pretext to study less and less",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text15.setWordWrapWidth(570, false);

        // colonne de gauche
        this.add.image(160, 100, 'logo').setOrigin(0.5).setScale(0.4);
        this.add.text(160, 220, 'Notifications', {font:'35px jack', fill: 'black'}).setOrigin(0.5);

        // prototype "Notifications"
        var backgoundNotifications = this.add.rectangle(170,300,330,100,0xE5E5E5).setOrigin(0.5).setAlpha(0);
        var notifications = this.add.text(170, 300, 'You have 10 new followers', {font:'20px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        notifications.setWordWrapWidth(300, false);

        // animation des notifications
        this.tweens.add({
            targets: [notifications, backgoundNotifications],
            alpha: { value: 1, duration: 500, ease: 'Power1' },
            hold: 1500, // temps avant que la notification disparaisse
            yoyo: true, // effet miroir de l'animation
            loop: -1,   
        });

        var backgoundNotifications = this.add.rectangle(170,420,330,100,0xE5E5E5).setOrigin(0.5).setAlpha(0);
        var notifications = this.add.text(170, 420, 'Your account is trending', {font:'20px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        notifications.setWordWrapWidth(300, false);

        // animation des notifications
        this.tweens.add({
            targets: [notifications, backgoundNotifications],
            alpha: { value: 1, duration: 500, ease: 'Power1' },
            hold: 1500, // temps avant que la notification disparaisse
            yoyo: true, // effet miroir de l'animation
            delay: 800,
            loop: -1,  
        });

        var backgoundNotifications = this.add.rectangle(170,540,330,100,0xE5E5E5).setOrigin(0.5).setAlpha(0);
        var notifications = this.add.text(170, 540, 'You have 50 new followers', {font:'20px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        notifications.setWordWrapWidth(300, false);

        // animation des notifications
        this.tweens.add({
            targets: [notifications, backgoundNotifications],
            alpha: { value: 1, duration: 500, ease: 'Power1' },
            hold: 1500, // temps avant que la notification disparaisse
            yoyo: true, // effet miroir de l'animation
            delay: 1600,
            loop: -1,
        });

        // colonne de droite 
        this.add.text(1100, 100, 'Hot', {font:'50px jack', fill: 'black'}).setOrigin(0.5);
        
        this.anims.create({
            key: 'flames',
            frames: [
                { key: 'flame1' },
                { key: 'flame2' },
                { key: 'flame3' },
                { key: 'flame4' },
                { key: 'flame5' }
            ],
            frameRate: 10,
            repeat: -1
        });
    
        this.add.sprite(1180, 80, 'flame1').setScale(3.4).play('flames');

        var hashtag1 = this.add.text(1100, 200, '#sharingiscaring', {font:'25px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        var hashtag2 = this.add.text(1100, 270, '#savetheworld', {font:'25px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        var hashtag3 = this.add.text(1100, 340, '#avocado', {font:'25px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        var hashtag4 = this.add.text(1100, 410, '#lovetrump', {font:'25px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        var hashtag5 = this.add.text(1100, 480, '#helloworld', {font:'25px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: [hashtag1,hashtag4],
            alpha: { value: 1, duration: 500, ease: 'Power1' },
            hold: 2500, // temps avant que la notification disparaisse
            yoyo: true, // effet miroir de l'animation
            loop: -1,   
        });

        this.tweens.add({
            targets: [hashtag2,hashtag5],
            alpha: { value: 1, duration: 500, ease: 'Power1' },
            hold: 2500, // temps avant que la notification disparaisse
            yoyo: true, // effet miroir de l'animation
            loop: -1,  
            delay: 1500, 
        });

        this.tweens.add({
            targets: [hashtag3],
            alpha: { value: 1, duration: 500, ease: 'Power1' },
            hold: 2500, // temps avant que la notification disparaisse
            yoyo: true, // effet miroir de l'animation
            loop: -1,   
            delay: 2000,
        });

        // labels
        this.scoreLabel = this.add.text(1015, 580, this.catchedArrows, {font: "22px imperator", fill: "white"});
        this.failLabel = this.add.text(1015, 610, this.catchedArrows, {font: "22px imperator", fill: "red"});
        this.sharedLabel = this.add.text(990, 650, this.sharedNews, {font: "35px imperator bold", fill: "black", align: 'center', backgroundColor: "white"});

        // text "Shared!"
        this.shared = this.add.text(640,200,"SHARED!",{font: "50px jack", fill: "#da3e52"}).setOrigin(0.5);
        this.shared.visible=false;
        this.shared.setAngle(-15);

        // text "disorder!"
        this.disorder = this.add.text(640,200,"DISORDER!",{font: "40px jack", fill: "#da3e52"}).setOrigin(0.5);
        this.disorder.visible=false;
        this.disorder.setAngle(-15);

        // text "death!
        this.death = this.add.text(640,200,"DEATH!",{font: "40px jack", fill: "#da3e52"}).setOrigin(0.5);
        this.death.visible=false;
        this.death.setAngle(-15);

        var label = this.add.text(0, 0, '', {font: "48px Arial Black", fill: "#c51b7d" });
        label.setStroke('#de77ae', 8);

        // création de la zones de collision des flèches
        var leftColl = this.add.image(490,600,'leftOutline').setOrigin(0.5);
        var upColl = this.add.image(590,600,'upOutline').setOrigin(0.5);
        var downColl = this.add.image(690,600,'downOutline').setOrigin(0.5);
        var rightColl = this.add.image(790,600,'rightOutline').setOrigin(0.5);

       //this.add.rectangle(640,601,580,60,0xF7F7F7).setOrigin(0.5);

        this.input.on('gameobjectdown', function (pointer, gameObject) {
            label.setText(gameObject.name);
            label.x = gameObject.x;
            label.y = gameObject.y;
        });  

        // ajout de sons qui vont servir pour les événements 
        this.sound.add('mouseClick', {loop: false});
        this.sound.add('war', {loop: false});
        this.sound.add("mall", {loop: false})
        this.sound.add("screams", {loop: false});
        this.sound.add("chants", {loop: false});
        this.sound.add("trump",{loop: false});
        this.sound.add("impact");   
    
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

            /* ||| RULES ||| */

            // flèche correctement capturée par le clic
            if (currentArrow.y >= 600 && currentArrow.y <= 650) {

                if (isLeftKeyPressed && currentArrow.name == "left") {
                    this.sound.play('impact', {volume:0.2});
                    this.catchedArrows++;
                    this.consecutiveArrows++
                    this.moveArrowToCapturedArray(currentArrow);
                    
                } else if (isUpKeyPressed && currentArrow.name == "up") {
                    this.sound.play('impact', {volume:0.2});
                    this.catchedArrows++;
                    this.consecutiveArrows++
                    this.moveArrowToCapturedArray(currentArrow);
                    
                } else if (isDownKeyPressed && currentArrow.name == "down") {
                    this.sound.play('impact', {volume:0.2});
                    this.catchedArrows++;
                    this.consecutiveArrows++
                    this.moveArrowToCapturedArray(currentArrow);
                    
                } else if (isRightKeyPressed && currentArrow.name == "right") {
                    this.sound.play('impact', {volume:0.2});
                    this.catchedArrows++;
                    this.consecutiveArrows++
                    this.moveArrowToCapturedArray(currentArrow);
                }

                // enregistrement des combos + "Share" visible après combo
                if (this.consecutiveArrows == 5 && this.sharedNews <26){
                    this.sharedNews++;
                    this.consecutiveArrows = 0;
                    this.shared.visible=true;
                    this.sound.play('mouseClick',{volume: 0.2});

                    //ajouter des petits like-particules
                    let particles = this.add.particles("like");
        
                    let emitter = particles.createEmitter({
                        x: 640,
                        y: 600,
                        frequency: 100,
                        alpha: 0.4,
                        angle: { min: -180, max: 0 },
                        speed: 250,       
                        lifespan: { min: 1000, max: 2000 },
                    });
                    //limiter la durée de l'effet like
                    this.time.delayedCall(700, ()=>{
                        emitter.frequency = -1;
                    });
                    


                } else if (this.consecutiveArrows != 5){
                    // "Share" n'est plus visible après combo
                    this.shared.visible=false;
                    this.disorder.visible=false;
                    this.death.visible=false

                } else if (this.consecutiveArrows == 5 && this.sharedNews >=26 && this.sharedNews <44){
                    this.sharedNews++;
                    this.consecutiveArrows = 0;
                    this.disorder.visible=true;
                    this.sound.play('mouseClick',{volume: 0.2})

                    //ajouter des petits coeur-particules
                    let particles = this.add.particles("heart");
        
                    let emitter = particles.createEmitter({
                        x: 640,
                        y: 600,
                        frequency: 100,
                        alpha: 0.4,
                        angle: { min: -180, max: 0 },
                        speed: 250,       
                        lifespan: { min: 1000, max: 2000 },
                    });
                    //limiter la durée des petits coeurs
                    this.time.delayedCall(700, ()=>{
                        emitter.frequency = -1;
                    });

                } else if (this.consecutiveArrows == 5 && this.sharedNews >=44){
                    this.sharedNews++;
                    this.consecutiveArrows = 0;
                    this.death.visible=true;
                    this.sound.play('mouseClick',{volume: 0.2})

                    //ajouter des petits skull-particules
                    let particles = this.add.particles("skullHeart");
        
                    let emitter = particles.createEmitter({
                        x: 640,
                        y: 600,
                        frequency: 100,
                        alpha: 0.4,
                        angle: { min: -180, max: 0 },
                        speed: 250,       
                        lifespan: { min: 1000, max: 2000 },
                    });
                    //limiter la durée des petits skulls
                    this.time.delayedCall(700, ()=>{
                        emitter.frequency = -1;
                    });

                }

                // le jeu termine en l'absence de clic
                if(this.catchedArrows==0 && this.missedArrows == 15){
                    this.add.text(640,360,"THAT'S THE SPIRIT", {font: "40px jack", fill: "#da3e52"}).setOrigin(0.5);
                    this.time.addEvent({
                        delay: 3000,
                        callback: ()=>{
                            this.scene.start("ifNoClicks")
                        }
                    });
                }

                /* ||| NEWS TEXT ||| */

                // travailler avec la visibilité pour les news
                if (this.sharedNews == 1 || this.sharedNews == 15 || this.sharedNews == 29 || this.sharedNews == 43 || this.sharedNews == 57 || this.sharedNews == 71 || this.sharedNews == 85){
                    this.text1.visible=false;
                    this.title1.visible=false;
                    this.title15.visible=false;
                    this.text15.visible=false;
                    this.text2.visible=true;
                    this.title2.visible=true;
                }

                if (this.sharedNews == 2 || this.sharedNews == 16 || this.sharedNews == 30 || this.sharedNews == 44 || this.sharedNews == 58 || this.sharedNews == 72 || this.sharedNews == 86){
                    this.text2.visible=false;
                    this.title2.visible=false;
                    this.text3.visible=true;
                    this.title3.visible=true;
                }

                if (this.sharedNews == 3 || this.sharedNews == 17 || this.sharedNews == 31 || this.sharedNews == 45 || this.sharedNews == 59 || this.sharedNews == 73 || this.sharedNews == 87){
                    this.text3.visible=false;
                    this.title3.visible=false;
                    this.text4.visible=true;
                    this.title4.visible=true;
                }

                if (this.sharedNews == 4 || this.sharedNews == 18 || this.sharedNews == 32 || this.sharedNews == 46 || this.sharedNews == 60 || this.sharedNews == 74 || this.sharedNews == 88){
                    this.text4.visible=false;
                    this.title4.visible=false;
                    this.text5.visible=true;
                    this.title5.visible=true;
                }
                if (this.sharedNews == 5 || this.sharedNews == 19 || this.sharedNews == 33 || this.sharedNews == 47 || this.sharedNews == 61 || this.sharedNews == 75 || this.sharedNews == 89){
                    this.text5.visible=false;
                    this.title5.visible=false;
                    this.text6.visible=true;
                    this.title6.visible=true;
                }
                if (this.sharedNews == 6 || this.sharedNews == 20 || this.sharedNews == 34 || this.sharedNews == 48 || this.sharedNews == 62 || this.sharedNews == 76 || this.sharedNews == 90){
                    this.text6.visible=false;
                    this.title6.visible=false;
                    this.text7.visible=true;
                    this.title7.visible=true;
                }
                if (this.sharedNews == 7 || this.sharedNews == 21 || this.sharedNews == 35 || this.sharedNews == 49 || this.sharedNews == 63 || this.sharedNews == 77 || this.sharedNews == 91){
                    this.text7.visible=false;
                    this.title7.visible=false;
                    this.text8.visible=true;
                    this.title8.visible=true;
                }
                if (this.sharedNews == 8 || this.sharedNews == 22 || this.sharedNews == 36 || this.sharedNews == 50 || this.sharedNews == 64 || this.sharedNews == 78 || this.sharedNews == 92){
                    this.text8.visible=false;
                    this.title8.visible=false;
                    this.text9.visible=true;
                    this.title9.visible=true;
                }
                if(this.sharedNews == 9 || this.sharedNews == 23 || this.sharedNews == 37 || this.sharedNews == 51 || this.sharedNews == 65 || this.sharedNews == 79 || this.sharedNews == 93){
                    this.text9.visible=false;
                    this.title9.visible=false;
                    this.text10.visible=true;
                    this.title11.visible=true;
                }
                if (this.sharedNews == 10 || this.sharedNews == 24 || this.sharedNews == 38 || this.sharedNews == 52 || this.sharedNews == 66 || this.sharedNews == 80 || this.sharedNews == 94){
                    this.text10.visible=false;
                    this.title10.visible=false;
                    this.text11.visible=true;
                    this.title11.visible=true;
                }
                if (this.sharedNews == 11 || this.sharedNews == 25 || this.sharedNews == 39 || this.sharedNews == 53 || this.sharedNews == 67 || this.sharedNews == 81 || this.sharedNews == 95){
                    this.text11.visible=false;
                    this.title11.visible=false;
                    this.text12.visible=true;
                    this.title12.visible=true;
                }
                if (this.sharedNews == 12 || this.sharedNews == 26 || this.sharedNews == 40 || this.sharedNews == 54 || this.sharedNews == 68 || this.sharedNews == 82 || this.sharedNews == 96){
                    this.text12.visible=false;
                    this.title12.visible=false;
                    this.text13.visible=true;
                    this.title13.visible=true;
                }
                if (this.sharedNews == 13 || this.sharedNews == 27 || this.sharedNews == 41 || this.sharedNews == 55 || this.sharedNews == 69 || this.sharedNews == 83 || this.sharedNews == 97){
                    this.text13.visible=false;
                    this.title13.visible=false;
                    this.text14.visible=true;
                    this.title14.visible=true;
                }
                if (this.sharedNews == 14 || this.sharedNews == 28 || this.sharedNews == 42 || this.sharedNews == 56 || this.sharedNews == 70 || this.sharedNews == 84 || this.sharedNews == 98){
                    this.text14.visible=false;
                    this.title14.visible=false;
                    this.text15.visible=true;
                    this.title15.visible=true;
                }

            /* ||| SOUND ||| */

                // musique progressive : ajout de sons d'ambiance après un certain nombre de news partagées
                if (this.sharedNews == 5 && this.consecutiveArrows == 4){
                    this.sound.play('mall',{loop: false, volume: 0.5});
                }

                if (this.sharedNews == 15 && this.consecutiveArrows == 4){
                    this.sound.play('chants', {loop: false, volume: 0.5});
                }

                if (this.sharedNews == 27 && this.consecutiveArrows == 4){
                    this.sound.play('screams',{volume: 0.5}, {loop: false, volume: 0.1});
                }
                
                if (this.sharedNews == 36 && this.consecutiveArrows == 4){
                    this.sound.play('trump',{detune: 0.5}, {loop: false});
                }

                if (this.sharedNews == 42 && this.consecutiveArrows == 4){
                    this.sound.play('war',{loop: false});
                }    
        }

            /* ||| GAMEPLAY ||| */

            // suppression de la flèche du tableau une fois au-dehors de la zone pour éviter une saturation de la mémoire
            if (currentArrow.y > 720){
                this.missedArrows++;
                this.consecutiveArrows = 0;
                this.removeArrow(currentArrow);
            }

            // déplacement de la flèche
            currentArrow.y += this.fallingSpeed;
        });

        // pour chaque flèche capturée
        this.capturedArrows.forEach((currentArrow) => {

            var currentScale = currentArrow.scale;
            var currentAlpha = currentArrow.alpha;

            if (currentScale < 4) {

                currentScale *= 1.2;
                currentAlpha -= 0.1;

                currentArrow.setScale(currentScale, currentScale);
                currentArrow.setAlpha(currentAlpha);
            }

            else {

                this.removeCapturedArrow(currentArrow);
            }

        });

        // actualisation des scores
        this.scoreLabel.setText('Catched Arrows : ' + this.catchedArrows);
        this.failLabel.setText('Missed Arrows : ' + this.missedArrows);
        this.sharedLabel.setText(' Shared News : ' + this.sharedNews + ' ');
    }

    // suppression de la flèche du tableau ainsi que son index
    removeArrow(arrow) {

        var arrowToBeDeleted = arrow;
        this.fallingArrows.splice(this.fallingArrows.indexOf(arrowToBeDeleted), 1);
        arrowToBeDeleted.destroy();
    }

    removeCapturedArrow(arrow) {

        var arrowToBeDeleted = arrow;
        this.capturedArrows.splice(this.capturedArrows.indexOf(arrowToBeDeleted), 1);
        arrowToBeDeleted.destroy();
    }

    moveArrowToCapturedArray(arrow) {

        // la flèche capturée
        var arrowToBeDeleted = arrow;

        // on la retire du tableau des flèches actives
        this.fallingArrows.splice(this.fallingArrows.indexOf(arrowToBeDeleted), 1);

        // on l'insère dans le tableau des flèches capturées
        this.capturedArrows.push(arrowToBeDeleted);

        //arrowToBeDeleted.destroy();
    }

    // création une flèche
    addArrow(){

        // sort une flèche entre 0 et 3 qui définit sa position
        var randomArrow = Math.floor(Math.random() * Math.floor(4));
        var newImage;

        // s'il est nécessaire de doubler les flèches…
        if (this.isDoubleArrowTime) {

            //… on vérifie qu'on ne recrée pas la même flèche que la précédente
            while (this.lastArrowType == randomArrow) {

               randomArrow = Math.floor(Math.random() * Math.floor(4));
            }
        }

        // on garde une trace du type de la dernière flèche créée (pour comparer dans la boucle précédente)
        this.lastArrowType = randomArrow;

        // ajout d'une flèche aléatoire dans le tableau selon sa position (0 = left, 1 = up, 2 = down, 3 = right)
        if (randomArrow == 0){
            newImage = this.add.image(490, 170, 'leftFilled').setOrigin(0.5);
            newImage.name = 'left';
            this.fallingArrows.push(newImage);

        } else if (randomArrow == 1){
            newImage = this.add.image(590, 170, 'upFilled').setOrigin(0.5);
            newImage.name = 'up';
            this.fallingArrows.push(newImage);

        } else if (randomArrow == 2){
            newImage = this.add.image(690, 170, 'downFilled').setOrigin(0.5);
            newImage.name = 'down';
            this.fallingArrows.push(newImage);

        } else if (randomArrow == 3){
            newImage = this.add.image(790, 170, 'rightFilled').setOrigin(0.5);
            newImage.name = 'right';
            this.fallingArrows.push(newImage);
        }
    }
}