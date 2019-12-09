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
        //Arrows filled
        this.load.image("left","assets/images/arrows/leftFilledRed.png");
        this.load.image("up","assets/images/arrows/upFilledYellow.png");
        this.load.image("down","assets/images/arrows/downFilledPurple.png");
        this.load.image("right","assets/images/arrows/rightFilledBlue.png");
        //Arrows outline
        this.load.image("leftOutline","assets/images/arrows/leftOutlineRed.png");
        this.load.image("upOutline","assets/images/arrows/upOutlineYellow.png");
        this.load.image("downOutline","assets/images/arrows/downOutlinePurple.png");
        this.load.image("rightOutline","assets/images/arrows/rightOutlineblue.png");
        
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

        this.load.image("flame1","assets/animations/flame1.png")
        this.load.image("flame2","assets/animations/flame2.png")
        this.load.image("flame3","assets/animations/flame3.png")
        this.load.image("flame4","assets/animations/flame4.png")
        this.load.image("flame5","assets/animations/flame5.png")

        this.load.json("newsData", "fakeNews.json");
    }

    create(){


        // var trump=this.add.sound('trump');
        // var war=this.add.sound('war');
        // var screams=this.add.sound('screams');


        this.time.addEvent({
            delay: 189000,
            callback: ()=>{
                this.scene.start("result", {catchedArrows: this.catchedArrows, missedArrows: this.missedArrows, sharedNews: this.sharedNews});

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
            delay: 188500,
            callback: ()=>{
                this.cameras.main.shake(500, 0.03, 0.01); //Duration, intensity, force 
            } 
        })
        //Ajouter bruit de bombe,timing à règler
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
        
        var mainsong = this.sound.add("realBruise4");
        mainsong.play({volume: 0.7});

        


        //Fond blanc "zone de jeu"
        
        var backgroundRectangle = this.add.rectangle(640,360,600,700,0xFFFFFF).setOrigin(0.5);

        //titre de la page 
        var home = this.add.text(350,20,'HOME', {font:'45px jack', fill: 'black'});

        //Prototype "News" => attention le texte s'il est long n'est pas limité, je travaille dessus ;)
        //par contre les flèches passent encore devant...
        //lien qui pourrait aider pour le json: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/text/
        var backgroundNews = this.add.rectangle(640,135,580,130,0xE5E5E5).setOrigin(0.5);

        //travailler avec les visibles pour les news
        this.title1 = this.add.text(360,90, "Le Temps du Journal",{font:'25px jack', fill: 'black'}).setVisible(true);
        this.text1 = this.add.text(360,120, "Les avocats d'une certaine région du Mexique rendent les cheveux bleus",{font:'20px imperator', fill: 'black'}).setVisible(true);
        //pour que le texte ne dépasse pas le fond de la News
        this.text1.setWordWrapWidth(570, false);

        this.title2 = this.add.text(360,90, "Le Canard Volant",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text2 = this.add.text(360,120, "Les avocats d'une Les billets de mille francs suisse, sous utilisés, vont être distribués par la confédération à ceux et celles qui se présenteront devant le Palais Fédéral",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text2.setWordWrapWidth(570, false);

        this.title3 = this.add.text(360,90, "Le Presque Matin",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text3 = this.add.text(360,120, "Jessica, la très célèbre réalisatrice de humanités numérique: définition a déclaré détester le Ukulélé depuis le succès inespéré de son court-métrage",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text3.setWordWrapWidth(570, false);

        this.title4 = this.add.text(360,90, "The Washington Toast",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text4 = this.add.text(360,120, "Un job de rêve promis par Donald Trump, pour toutes personnes se présentant le premier lundi de chaque mois devant la Maison Blanche",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text4.setWordWrapWidth(570, false);

        this.title5 = this.add.text(360,90, "Le Courriel",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text5 = this.add.text(360,120, "Un chien a été vu remettre des amendes à la Brévine, aux citoyens et citoyennes affirmant ne pas aimer le froid",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text5.setWordWrapWidth(570, false);

        this.title6 = this.add.text(360,90, "LEQUASIJOURNAL",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text6 = this.add.text(360,120, "Selon une étude très sérieuse de l'université de Stafford, les personnes aux grands pieds et aux longs nez seraient suceptibles de trouver plus difficilement chaussures à leurs pieds",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text6.setWordWrapWidth(570, false);

        this.title7 = this.add.text(360,90, "The New York Dime",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text7 = this.add.text(360,120, "D'après une enquête du New York Lost, les Fake news ne constitueraient pas un si grand danger pour nos démocraties",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text7.setWordWrapWidth(570, false);

        this.title8 = this.add.text(360,90, "Daily Bruise",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text8 = this.add.text(360,120, "Le poids total des châteaux de la Loire, représentent la consommation moyenne de vin par habitant de Suisse",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text8.setWordWrapWidth(570, false);

        this.title9 = this.add.text(360,90, "24 Leurres",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text9 = this.add.text(360,120, "Le vacherin fribourgeois, surtout en fondue, aurait des pouvoirs apaisant",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text9.setWordWrapWidth(570, false);

        this.title10 = this.add.text(360,90, "New York Lost",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text10 = this.add.text(360,120, "L'existence de Peter Pan serait véridique selon les dires de la fée Clochette",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text10.setWordWrapWidth(570, false);

        this.title11 = this.add.text(360,90, "Le Temps du Journal",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text11 = this.add.text(360,120, "Après des années d'attentes les trains suisse seront dorénavant gratuits pour toutes personnes désirant les utiliser",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text11.setWordWrapWidth(570, false);

        this.title12 = this.add.text(360,90, "Le Canard Volant",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text12 = this.add.text(360,120, "Avancer sur les mains rejetterait moins de CO2 dans l'atmosphère selon une étude de l'université de la Chaux-de-fonds",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text12.setWordWrapWidth(570, false);

        this.title13 = this.add.text(360,90, "Le presque matin",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text13 = this.add.text(360,120, "Manger cinq carambars par jour donne la banane",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text13.setWordWrapWidth(570, false);

        this.title14 = this.add.text(360,90, "The Washington Toast",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text14 = this.add.text(360,120, "La pollution des eaux et des sols, serait une invention de plus de notre 21ème siècle afin de créer la panique",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text14.setWordWrapWidth(570, false);

        this.title15 = this.add.text(360,90, "Le Courriel",{font:'25px jack', fill: 'black'}).setVisible(false);
        this.text15 = this.add.text(360,120, "La fatigue exprimé par les étudiants d'université ne serait qu'un prétexte pour en faire de moins en moins",{font:'20px imperator', fill: 'black'}).setVisible(false);
        this.text15.setWordWrapWidth(570, false);












        //travailler eventuellement avec les tweens pour remplacer le texte des news
        // this.tweens.add({
        //     targets: [title1, text1],
        //     alpha: { value: 1, duration: 300, ease: 'Power1' },
        //     delay: 300,  
        // });    
       

        //colonne de gauche
        this.add.image(160, 100, 'logo').setOrigin(0.5).setScale(0.4);
        this.add.text(160, 220, 'Notifications', {font:'35px jack', fill: 'black'}).setOrigin(0.5);

        //Prototype "Notifications"
        var backgoundNotifications = this.add.rectangle(170,300,330,100,0xE5E5E5).setOrigin(0.5).setAlpha(0);
        var notifications = this.add.text(170, 300, 'Your news was shared ', {font:'20px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        notifications.setWordWrapWidth(300, false);
        //animation des notifications
        this.tweens.add({
            targets: [notifications, backgoundNotifications],
            alpha: { value: 1, duration: 500, ease: 'Power1' },
            hold: 1500, //temps avant que la notification disparaisse
            yoyo: true, //effet miroir de l'animation
            loop: -1,   
        });

        var backgoundNotifications = this.add.rectangle(170,420,330,100,0xE5E5E5).setOrigin(0.5).setAlpha(0);
        var notifications = this.add.text(170, 420, 'Your have 10 new followers', {font:'20px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        notifications.setWordWrapWidth(300, false);
        //animation des notifications
        this.tweens.add({
            targets: [notifications, backgoundNotifications],
            alpha: { value: 1, duration: 500, ease: 'Power1' },
            hold: 1500, //temps avant que la notification disparaisse
            yoyo: true, //effet miroir de l'animation
            delay: 800,
            loop: -1,  
        });

        var backgoundNotifications = this.add.rectangle(170,540,330,100,0xE5E5E5).setOrigin(0.5).setAlpha(0);
        var notifications = this.add.text(170, 540, 'Your news was shared', {font:'20px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        notifications.setWordWrapWidth(300, false);
        //animation des notifications
        this.tweens.add({
            targets: [notifications, backgoundNotifications],
            alpha: { value: 1, duration: 500, ease: 'Power1' },
            hold: 1500, //temps avant que la notification disparaisse
            yoyo: true, //effet miroir de l'animation
            delay: 1600,
            loop: -1,
        });

        //colonne de droite 
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

        var hashtag1 = this.add.text(1100, 200, '#lemondeestbeau', {font:'25px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        var hashtag2 = this.add.text(1100, 270, '#savetheworld', {font:'25px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        var hashtag3 = this.add.text(1100, 340, '#avocat', {font:'25px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        var hashtag4 = this.add.text(1100, 410, '#lovetrump', {font:'25px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        var hashtag5 = this.add.text(1100, 480, '#helloworld', {font:'25px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: [hashtag1,hashtag4],
            alpha: { value: 1, duration: 500, ease: 'Power1' },
            hold: 2500, //temps avant que la notification disparaisse
            yoyo: true, //effet miroir de l'animation
            loop: -1,   
        });

        this.tweens.add({
            targets: [hashtag2,hashtag5],
            alpha: { value: 1, duration: 500, ease: 'Power1' },
            hold: 2500, //temps avant que la notification disparaisse
            yoyo: true, //effet miroir de l'animation
            loop: -1,  
            delay: 1500, 
        });

        this.tweens.add({
            targets: [hashtag3],
            alpha: { value: 1, duration: 500, ease: 'Power1' },
            hold: 2500, //temps avant que la notification disparaisse
            yoyo: true, //effet miroir de l'animation
            loop: -1,   
            delay: 2000,
        });

    
        
        //labels
        this.scoreLabel = this.add.text(1100, 550, this.catchedArrows, {font: "25px imperator", fill: "white"});
        this.failLabel = this.add.text(1100, 580, this.catchedArrows, {font: "25px imperator", fill: "red"});
        this.sharedLabel = this.add.text(1050, 610, this.sharedNews, {font: "25px imperator", fill: "black", align: 'center'});

        //Text "Shared!"
        this.shared = this.add.text(640,200,"SHARED!",{font: "50px jack", fill: "#da3e52"}).setOrigin(0.5);
        this.shared.visible=false;
        this.shared.setAngle(-15);

        //Text "disorder!"
        this.disorder = this.add.text(640,200,"DISORDER!",{font: "40px jack", fill: "red"}).setOrigin(0.5);
        this.disorder.visible=false;
        this.disorder.setAngle(-15);
        //Text "death!
        this.death = this.add.text(640,200,"DEATH!",{font: "40px jack", fill: "red"}).setOrigin(0.5);
        this.death.visible=false;
        this.death.setAngle(-15);

    

        var label = this.add.text(0, 0, '', { font: "48px Arial Black", fill: "#c51b7d" });
        label.setStroke('#de77ae', 8);

        

        // création des 4 zones de collision des flèches
         this.add.image(490,600,'leftOutline').setOrigin(0.5);
         this.add.image(590,600,'upOutline').setOrigin(0.5);
         this.add.image(690,600,'downOutline').setOrigin(0.5);
         this.add.image(790,600,'rightOutline').setOrigin(0.5);

    
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
        this.sound.add("impact");


        
    }
    

    update(time, delta){  


        // récupération de la touche enfoncée lors de l'update
        var cursorKeys = this.input.keyboard.createCursorKeys();

        var isUpKeyPressed = cursorKeys.up.isDown;
        var isDownKeyPressed = cursorKeys.down.isDown;
        var isLeftKeyPressed = cursorKeys.left.isDown;
        var isRightKeyPressed = cursorKeys.right.isDown;




        // var isUpKeyRelased = cursorKeys.up.isUp;
        // var isDownKeyRelased = cursorKeys.down.isUp;
        // var isLeftKeyRelased = cursorKeys.left.isUp;
        // var isRightKeyRelased = cursorKeys.right.isUp;


        // pour chaque flèche affichée actuellement
        this.fallingArrows.forEach((currentArrow) => {


            // si la flèche est dans la zone de validation et que la touche correspondante est enfoncée: suppression de la flèche
            if (currentArrow.y >= 600 && currentArrow.y <= 650) {

                if (isLeftKeyPressed && currentArrow.name == "left") {
                    this.sound.play('impact', {volume:0.2});
                    this.catchedArrows++;
                    this.consecutiveArrows++
                    this.removeArrow(currentArrow);
                    
                    
                } else if (isUpKeyPressed && currentArrow.name == "up") {
                    this.sound.play('impact', {volume:0.2});
                    this.catchedArrows++;
                    this.consecutiveArrows++
                    this.removeArrow(currentArrow);
                    
                    
                } else if (isDownKeyPressed && currentArrow.name == "down") {
                    this.sound.play('impact', {volume:0.2});
                    this.catchedArrows++;
                    this.consecutiveArrows++
                    this.removeArrow(currentArrow);
                    
                    
                } else if (isRightKeyPressed && currentArrow.name == "right") {
                    this.sound.play('impact', {volume:0.2});
                    this.catchedArrows++;
                    this.consecutiveArrows++
                    this.removeArrow(currentArrow);
                }


                // enregistrement des combos + "Share" visible après la combo
                if (this.consecutiveArrows == 5 && this.sharedNews <26){
                        this.sharedNews++;
                        this.consecutiveArrows = 0;
                        this.shared.visible=true;
                        this.sound.play('mouseClick',{volume: 0.2});

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
                    this.sound.play('mouseClick',{volume: 0.2})
                }

                else if(this.consecutiveArrows == 5 && this.sharedNews >=44){
                    this.sharedNews++;
                    this.consecutiveArrows = 0;
                    this.death.visible=true;
                    this.sound.play('mouseClick',{volume: 0.2})
                }

                
                
            

                // jeu termine si tu ne clique rien
                if(this.catchedArrows==0 && this.missedArrows == 15){
                    this.add.text(640,360,"THAT'S THE SPIRIT", {font: "40px jack", fill: "red"}).setOrigin(0.5);
                    this.time.addEvent({
                        delay: 3000,
                        callback: ()=>{
                            this.scene.start("ifNoClicks")
                        }
                    });
                }


                //travailler avec les visibles pour le news
                if(this.sharedNews == 1 || this.sharedNews == 15 || this.sharedNews == 29 || this.sharedNews == 43 || this.sharedNews == 57 || this.sharedNews == 71 || this.sharedNews == 85){
                    this.text1.visible=false;
                    this.title1.visible=false;
                    this.title15.visible=false;
                    this.text15.visible=false;
                    this.text2.visible=true;
                    this.title2.visible=true;
                }

                if(this.sharedNews == 2 || this.sharedNews == 16 || this.sharedNews == 30 || this.sharedNews == 44 || this.sharedNews == 58 || this.sharedNews == 72 || this.sharedNews == 86){
                    this.text2.visible=false;
                    this.title2.visible=false;
                    this.text3.visible=true;
                    this.title3.visible=true;
                }

                if(this.sharedNews == 3 || this.sharedNews == 17 || this.sharedNews == 31 || this.sharedNews == 45 || this.sharedNews == 59 || this.sharedNews == 73 || this.sharedNews == 87){
                    this.text3.visible=false;
                    this.title3.visible=false;
                    this.text4.visible=true;
                    this.title4.visible=true;
                }

                if(this.sharedNews == 4 || this.sharedNews == 18 || this.sharedNews == 32 || this.sharedNews == 46 || this.sharedNews == 60 || this.sharedNews == 74 || this.sharedNews == 88){
                    this.text4.visible=false;
                    this.title4.visible=false;
                    this.text5.visible=true;
                    this.title5.visible=true;
                }
                if(this.sharedNews == 5 || this.sharedNews == 19 || this.sharedNews == 33 || this.sharedNews == 47 || this.sharedNews == 61 || this.sharedNews == 75 || this.sharedNews == 89){
                    this.text5.visible=false;
                    this.title5.visible=false;
                    this.text6.visible=true;
                    this.title6.visible=true;
                }
                if(this.sharedNews == 6 || this.sharedNews == 20 || this.sharedNews == 34 || this.sharedNews == 48 || this.sharedNews == 62 || this.sharedNews == 76 || this.sharedNews == 90){
                    this.text6.visible=false;
                    this.title6.visible=false;
                    this.text7.visible=true;
                    this.title7.visible=true;
                }
                if(this.sharedNews == 7 || this.sharedNews == 21 || this.sharedNews == 35 || this.sharedNews == 49 || this.sharedNews == 63 || this.sharedNews == 77 || this.sharedNews == 91){
                    this.text7.visible=false;
                    this.title7.visible=false;
                    this.text8.visible=true;
                    this.title8.visible=true;
                }
                if(this.sharedNews == 8 || this.sharedNews == 22 || this.sharedNews == 36 || this.sharedNews == 50 || this.sharedNews == 64 || this.sharedNews == 78 || this.sharedNews == 92){
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
                if(this.sharedNews == 10 || this.sharedNews == 24 || this.sharedNews == 38 || this.sharedNews == 52 || this.sharedNews == 66 || this.sharedNews == 80 || this.sharedNews == 94){
                    this.text10.visible=false;
                    this.title10.visible=false;
                    this.text11.visible=true;
                    this.title11.visible=true;
                }
                if(this.sharedNews == 11 || this.sharedNews == 25 || this.sharedNews == 39 || this.sharedNews == 53 || this.sharedNews == 67 || this.sharedNews == 81 || this.sharedNews == 95){
                    this.text11.visible=false;
                    this.title11.visible=false;
                    this.text12.visible=true;
                    this.title12.visible=true;
                }
                if(this.sharedNews == 12 || this.sharedNews == 26 || this.sharedNews == 40 || this.sharedNews == 54 || this.sharedNews == 68 || this.sharedNews == 82 || this.sharedNews == 96){
                    this.text12.visible=false;
                    this.title12.visible=false;
                    this.text13.visible=true;
                    this.title13.visible=true;
                }
                if(this.sharedNews == 13 || this.sharedNews == 27 || this.sharedNews == 41 || this.sharedNews == 55 || this.sharedNews == 69 || this.sharedNews == 83 || this.sharedNews == 97){
                    this.text13.visible=false;
                    this.title13.visible=false;
                    this.text14.visible=true;
                    this.title14.visible=true;
                }
                if(this.sharedNews == 14 || this.sharedNews == 28 || this.sharedNews == 42 || this.sharedNews == 56 || this.sharedNews == 70 || this.sharedNews == 84 || this.sharedNews == 98){
                    this.text14.visible=false;
                    this.title14.visible=false;
                    this.text15.visible=true;
                    this.title15.visible=true;
                }
                
                



            //     if(this.sharedNews == 1){
            //         title1.destroy();
            //         text1.destroy();
            //         this.tweens.add({
            //             targets: [text2, title2],
            //             alpha: { value: 1, duration: 200, ease: 'Power1' },
            //             delay: 200,
            //     })
            // }

                
                



                // musique progressive : ajout de sons d'ambiance après un certain nombre de news partagées
                if(this.sharedNews == 5 && this.consecutiveArrows == 4){
                    this.sound.play('mall',{loop: false, volume: 0.5});
                }

                if(this.sharedNews == 15 && this.consecutiveArrows == 4){
                    this.sound.play('chants', {loop: false, volume: 0.5});
                }

                if(this.sharedNews == 27 && this.consecutiveArrows == 4){
                    this.sound.play('screams',{volume: 0.5}, {loop: false, volume: 0.1});
                    
                }
                
                

                if(this.sharedNews == 36 && this.consecutiveArrows == 4){
                    this.sound.play('trump',{detune: 0.5}, {loop: false});
                }

                if(this.sharedNews == 42 && this.consecutiveArrows == 4){
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
          this.sharedLabel.setText('You shared\n' + this.sharedNews + '\nnews');
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