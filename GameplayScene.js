class gameplayScene extends Phaser.Scene {

    constructor() {
        super("gameplay");
    }

    preload() {

        // création d'un tableau vide pour les flèches qui défilent
        this.fallingArrows = [];

        // création d'un tableau vide pour les flèches capturées
        this.capturedArrows = [];

        // initialisation des variables utilisées
        this.fallingSpeed = 5;
        this.fallingDelay = 500;

        this.keyDownDelay = 100;

        // type de la dernière flèche créée afin d'éviter une superposition de flèches identiques
        this.lastArrowType = 0;

        // capture le score de flèches manquées depuis la dernière accélération de la vitesse
        this.lastScoreMissedArrows = 0;

        // variable du jeu en pause
        this.setToPause = false;

        this.hasRainStarted = false;
        this.hasStrongRainStarted = false;

        // définition des compteurs de score
        this.catchedArrows = 0;
        this.missedArrows = 0;
        this.consecutiveArrows = 0;
        this.consecutiveMissedArrows = 0;
        this.sharedNews = 0;
        this.level = 1;

        this.currentNotification = 0;

        this.scoreLabel;
        this.failLabel;
        this.sharedLabel;

        this.newArrowsTimer; 
        this.currentNews = 0;

        // variables de gestion des délais de frappe
        this.isANewKeyPressed = false;
        this.lastKeyPressedAt =  0;
        this.lastSpaceBarPressedAt = 0;

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

        this.load.audio("realBruise4","assets/sounds/realbruise4.m4a");
        this.load.audio("chants","assets/sounds/chants.m4a");
        this.load.audio("mall","assets/sounds/mall.m4a");
        this.load.audio("screams","assets/sounds/screams.m4a");
        this.load.audio("war","assets/sounds/war.m4a");
        this.load.audio("trump","assets/sounds/trump.m4a");
        this.load.audio("bombDrop", "assets/sounds/bombDrop.m4a");
        this.load.audio("impact","assets/sounds/impact.m4a");
        this.load.audio("woop","assets/sounds/woop.m4a");

        this.load.image("flame1","assets/animations/flame1.png");
        this.load.image("flame2","assets/animations/flame2.png");
        this.load.image("flame3","assets/animations/flame3.png");
        this.load.image("flame4","assets/animations/flame4.png");
        this.load.image("flame5","assets/animations/flame5.png");

        this.load.image('heart', 'assets/images/reactions/heart.png');
        this.load.image('like', 'assets/images/reactions/like.png');
        this.load.image('skullHeart', 'assets/images/reactions/skullHeart.png');

        this.load.image('rain', 'assets/images/rain.png');

        this.load.json('newsData', 'assets/json/fakeNews2.json');
    }
    
    resume() {

        this.resumeAllAudio();
        this.lastSpaceBarPressedAt = new Date().getTime() + 750;
    }

    create() {

        this.cameras.main.backgroundColor = "#65FF99";

        this.events.on('resume', this.resume, this);

        this.time.addEvent({
            delay: 189000,
            callback: ()=>{
                this.stopAllAudio();
                this.scene.start("result", {catchedArrows: this.catchedArrows, missedArrows: this.missedArrows, sharedNews: this.sharedNews, level: this.level, backgroundColor: this.resultSceneBackgroundColor, isRain: this.hasRainStarted, isStrongRain: this.hasStrongRainStarted});
            }
        })

        // passage à la scène suivante (EVENT DE FOUFOU, surtout les lignes 128 à 133 !)
        this.time.addEvent({
            delay: 188500,
            callback: ()=>{

                // récupération de la couleur actuelle du masque
                var maskColor = Phaser.Display.Color.ValueToColor(this.backgroundMask.fillColor);

                // alpha actuel du masque
                var maskColorAlpha = this.backgroundMask.alpha;
                
                // récupération de la couleur actuelle du fond
                var backgroundColor = Phaser.Display.Color.HexStringToColor(this.cameras.main.backgroundColor);
                
                // alpha blending de la couleur de fond et de celle du masque (https://en.wikipedia.org/wiki/Alpha_compositing#Alpha_blending)
                var red = Math.round(((1-maskColorAlpha)*backgroundColor.red + (maskColorAlpha * maskColor.red)) / 1);
                var green = Math.round(((1-maskColorAlpha)*backgroundColor.green + (maskColorAlpha * maskColor.green)) / 1);
                var blue = Math.round(((1-maskColorAlpha)*backgroundColor.blue + (maskColorAlpha * maskColor.blue)) / 1);

                // création de la nouvelle couleur, résultante de la combinaison des deux autres (trop super)
                var finalBackgroundColor = Phaser.Display.Color.GetColor32(red, green, blue, maskColorAlpha);

                // passage de la couleur de fond actuelle à la scène suivante
                this.resultSceneBackgroundColor = finalBackgroundColor;

                // désactivation du masque devenu inutile
                this.backgroundMask.alpha = 0;

                // le fond a désormais la couleur du masque
                this.cameras.main.setBackgroundColor(finalBackgroundColor);

                // faire trembler la caméra juste avant le passage à la scène suivante
                this.cameras.main.shake(500, 0.03, 0.01); // duration, intensity, force 
            } 
        })

        // ajouter bruit de bombe
        this.time.addEvent({
            delay: 180000,
            callback: ()=>{
                this.bombSound.play({loop: false});
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

                if (this.missedArrows - this.lastScoreMissedArrows < 10) {

                    // ajuste la vitesse en fonction du nombre de flèches capturées par le joueur
                    this.fallingSpeed *= 1.025;
                    this.fallingDelay /= 1.025;

                    this.level++;
                    
                    // première notification
                    if (this.level < 7) {
                        this.updateNotification(1, "You have " + (this.level * 5) + " new followers");   
                        // this.updateNotification(1, "You have " + Math.pow(10, this.level) + " new followers");    
                    }

                    if (this.level >= 8) {
                        this.updateNotification(1, "You have " + (this.level * 50) + " new followers");
                        //this.updateNotification(1, "You have " + eval(100000 + (this.level*100000)) + " new followers");
                    }

                    if (this.level >= 14) {
                        this.updateNotification(1, "You have " + eval(100000 + (this.level*100000)) + " new followers");
                    }
                }
                
                this.lastScoreMissedArrows = this.missedArrows;

                this.newArrowsTimer = this.time.addEvent({
                    delay: this.fallingDelay,
                    loop: true,
                    callback: ()=>{
                        this.addArrow();

                        // ajoute une flèche supplémentaire à capturer
                        if (this.level >= 10) {
                        
                            if (Math.random() < (this.level / 100)) {
                        
                                this.addArrow(true);
                            }
                        }
                    }
                })
            }
        })

        this.mainSong = this.sound.add("realBruise4");
        
        // ajout de sons qui vont servir pour les événements 
        this.warSound = this.sound.add('war', {loop: false});
        this.mallSound = this.sound.add("mall", {loop: false})
        this.screamsSound = this.sound.add("screams", {loop: false});
        this.chantsSound = this.sound.add("chants", {loop: false});
        this.trumpSound = this.sound.add("trump",{loop: false});
        this.bombSound = this.sound.add("bombDrop",{loop: false});
        this.impactSound = this.sound.add("impact",{loop: false});

        this.mainSong.play();

        // fond blanc "zone de jeu"
        var backgroundRectangle = this.add.rectangle(640,360,580,700,0xFFFFFF).setOrigin(0.5);
        backgroundRectangle.depth = -4;

        // titre de la page 
        var home = this.add.text(350,20,'HOME', {font:'45px jack', fill: 'black'});

        this.backgroundNews = this.add.rectangle(640,135,580,130,0xE5E5E5).setOrigin(0.5);
        this.backgroundNews.depth = -2;
        
        this.backgroundNews2 = this.add.rectangle(640,135,580,130,0xE5E5E5).setOrigin(0.5);
        this.backgroundNews2.depth = -2;
        this.alpha = 0;

        /* ||| NEWS PRINCIPALES ||| */

        this.newsData = this.cache.json.get('newsData');

        this.titleNews = this.add.text(360,90, this.newsData["fakeNews"][0]["newspaperTitle"], {font:'25px jack', fill: 'black'}).setVisible(true);
        this.textNews = this.add.text(360,120, this.newsData["fakeNews"][0]["content"], {font:'20px imperator', fill: 'black'}).setVisible(true);

        this.titleNews.depth = -1;
        this.textNews.depth = -1;

        // pour que le texte ne dépasse pas le fond de la News
        this.textNews.setWordWrapWidth(570, false);

        this.titleNews2 = this.add.text(360,90, this.newsData["fakeNews"][0]["newspaperTitle"], {font:'25px jack', fill: 'black'}).setAlpha(0);
        this.textNews2 = this.add.text(360,120, this.newsData["fakeNews"][0]["content"], {font:'20px imperator', fill: 'black'}).setAlpha(0);

        this.titleNews2.depth = -1;
        this.textNews2.depth = -1;

        // pour que le texte ne dépasse pas le fond de la News
        this.textNews2.setWordWrapWidth(570, false);

        //ajout d'un masque
        this.backgroundMask = this.add.rectangle(640,360,1280,720,0x68786D).setOrigin(0.5).setAlpha(0);

        this.backgroundMask.depth = -25;

        /* ||| TEXTE AVANT BOMBE||| */

        var wellText = this.add.text(550, 300, "Well, how do you feel now?", {font:'25px jack', fill: 'grey'}).setOrigin(0.5).setAlpha(0);
        var wellText2 = this.add.text(640, 400, "...", {font:'25px jack', fill: 'grey'}).setOrigin(0.5).setAlpha(0);
        var wellText3 = this.add.text(730, 450, "Is that really fun?", {font:'25px jack', fill: 'grey'}).setOrigin(0.5).setAlpha(0);
        // si le joueur partage moins de dix news
        var wellText4 = this.add.text(700, 460, "Isn't the life beautiful?", {font:'25px jack', fill: 'grey'}).setOrigin(0.5).setAlpha(0);
        // Si le joueur monte des niveaux sans partager de news
        var wellText5 = this.add.text(700, 460, "Eheh, you're a smart boy.", {font:'25px jack', fill: 'grey'}).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: [wellText],
            alpha: {value: 1, duration: 1000, ease: 'Power1'},
            hold: 5000, 
            yoyo: true, // effet miroir de l'animation
            loop: false,
            delay: 140000,
        });

        this.tweens.add({
            targets: [wellText2],
            alpha: {value: 1, duration: 1000, ease: 'Power1'},
            hold: 5000, 
            yoyo: true, // effet miroir de l'animation
            loop: false,
            delay: 155000,
        });

        this.time.addEvent({

            delay: 170000,
            loop: false,
            callback: ()=>{
                
                // si le joueur a partagé moins de dix news sans monter de niveaux (il n'a pas joué le jeu)
                if (this.level <= 10 && this.sharedNews <= 10) {
                    this.tweens.add({
                        targets: [wellText4],
                        alpha: {value: 1, duration: 1000, ease: 'Power1'},
                        hold: 5000, // temps avant que la notification disparaisse
                        yoyo: true, // effet miroir de l'animation
                        loop: false,
                    });

                // si le joueur comprend qu'il est possible de monter de niveaux sans partager de news pour autant
                } else if (this.level > 10 && this.sharedNews <= 10) {
                    this.tweens.add({
                        targets: [wellText5],
                        alpha: {value: 1, duration: 1000, ease: 'Power1'},
                        hold: 5000, // temps avant que la notification disparaisse
                        yoyo: true, // effet miroir de l'animation
                        loop: false,
                    });

                // si le joueur joue le jeu normalement
                } else {
                    this.tweens.add({
                        targets: [wellText3],
                        alpha: {value: 1, duration: 1000, ease: 'Power1'},
                        hold: 5000, // temps avant que la notification disparaisse
                        yoyo: true, // effet miroir de l'animation
                        loop: false,
                    });
                }
            }
        })

        /* ||| COLONNE DE GAUCHE ||| */

        this.add.image(160, 100, 'logo').setOrigin(0.5).setScale(0.4);
        this.add.text(160, 220, 'Notifications', {font:'35px jack', fill: 'black'}).setOrigin(0.5);

        // prototype "Notifications"
        this.backgroundNotifications1 = this.add.rectangle(170,300,330,90,0xE5E5E5).setOrigin(0.5).setAlpha(0);
        this.notifications1 = this.add.text(170,300, "", {font:'20px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        this.notifications1.setWordWrapWidth(300, false);

        this.backgroundNotifications2 = this.add.rectangle(170,420,330,90,0xE5E5E5).setOrigin(0.5).setAlpha(0);
        this.notifications2 = this.add.text(170,420, "", {font:'20px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        this.notifications2.setWordWrapWidth(300, false);

        this.backgroundNotifications3 = this.add.rectangle(170,540,330,90,0xE5E5E5).setOrigin(0.5).setAlpha(0);
        this.notifications3 = this.add.text(170,540, "", {font:'20px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        this.notifications3.setWordWrapWidth(300, false);

        // première et dernière notifications
        this.time.addEvent({

            delay: 8000,
            loop: true,
            callback: ()=>{

                // seconde notification
                this.time.addEvent({

                    delay: 1000,
                    callback: ()=>{
        
                        this.updateNotification(2, this.getNextRandomNotification());
                    }
                })
        
                // troisième notificiation
                this.time.addEvent({
        
                    delay: 2000,
                    callback: ()=>{
        
                        this.updateNotification(3, this.getNextRandomNotification());
                    }
                })
            }
        })

        /* ||| COLONNE DE DROITE ||| */

        this.add.text(1100, 100, 'Hot', {font:'50px jack', fill: 'black'}).setOrigin(0.5);
        
        this.anims.create({
            key: 'flames',
            frames: [
                {key: 'flame1'},
                {key: 'flame2'},
                {key: 'flame3'},
                {key: 'flame4'},
                {key: 'flame5'}
            ],
            frameRate: 10,
            repeat: -1
        });
    
        this.add.sprite(1180, 80, 'flame1').setScale(3.4).play('flames');

        this.hashtag1 = this.add.text(1100,200, this.newsData["fakeNews"][0]["hashtag"][0], {font:'23px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        this.hashtag2 = this.add.text(1100,270, this.newsData["fakeNews"][0]["hashtag"][1], {font:'23px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        this.hashtag3 = this.add.text(1100,340, this.newsData["fakeNews"][0]["hashtag"][2], {font:'23px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        this.hashtag4 = this.add.text(1100,410, this.newsData["fakeNews"][0]["hashtag"][3], {font:'23px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);
        this.hashtag5 = this.add.text(1100,480, this.newsData["fakeNews"][0]["hashtag"][4], {font:'23px imperator', fill: 'black'}).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: [this.hashtag1,this.hashtag4],
            alpha: {value: 1, duration: 700, ease: 'Power1'},
            hold: 2500, // temps avant que la notification disparaisse
            yoyo: true, // effet miroir de l'animation
            loop: -1,   
        });

        this.tweens.add({
            targets: [this.hashtag2,this.hashtag5],
            alpha: {value: 1, duration: 700, ease: 'Power1'},
            hold: 2500, // temps avant que la notification disparaisse
            yoyo: true, // effet miroir de l'animation
            loop: -1,  
            delay: 1500, 
        });

        this.tweens.add({
            targets: [this.hashtag3],
            alpha: {value: 1, duration: 700, ease: 'Power1'},
            hold: 2500, // temps avant que la notification disparaisse
            yoyo: true, // effet miroir de l'animation
            loop: -1,   
            delay: 2000,
        });

        // labels
        this.levelLabel = this.add.text(1050, 610, this.catchedArrows, {font: '25px jack', fill: "black"});
        this.sharedLabel = this.add.text(930, 650, this.sharedNews, {font: "35px jack", fill: "black", align: 'center', backgroundColor: "white"});

        // text "Shared!"
        this.shared = this.add.text(640,200,"SHARED!",{font: "50px jack", fill: "#da3e52"}).setOrigin(0.5);
        this.shared.visible = false;
        this.shared.setAngle(-15);

        this.shared.depth = 3;

        var label = this.add.text(0, 0, '', {font: "48px Arial Black", fill: "#c51b7d" });
        label.setStroke('#de77ae', 8);

        // création de la zones de collision des flèches
        var leftColl = this.add.image(490,600,'leftOutline').setOrigin(0.5);
        var upColl = this.add.image(590,600,'upOutline').setOrigin(0.5);
        var downColl = this.add.image(690,600,'downOutline').setOrigin(0.5);
        var rightColl = this.add.image(790,600,'rightOutline').setOrigin(0.5);

        this.input.on('gameobjectdown', function (pointer, gameObject) {
            label.setText(gameObject.name);
            label.x = gameObject.x;
            label.y = gameObject.y;
        });
    }
    
    update(time, delta) {

        // récupération de la touche enfoncée lors de l'update
        var cursorKeys = this.input.keyboard.createCursorKeys();

        var isSpaceKeyPressed = cursorKeys.space.isDown;
        var isUpKeyPressed = cursorKeys.up.isDown;
        var isDownKeyPressed = cursorKeys.down.isDown;
        var isLeftKeyPressed = cursorKeys.left.isDown;
        var isRightKeyPressed = cursorKeys.right.isDown;

        // si une touche est pressée qui ne l'était pas avant (évite de pouvoir laisser appuyé les touches pour capturer les flèches)
        if (!this.isANewKeyPressed && (isUpKeyPressed || isDownKeyPressed || isLeftKeyPressed || isRightKeyPressed)) {
            this.lastKeyPressedAt = new Date().getTime();
            this.isANewKeyPressed = true;

        } else if (!(isUpKeyPressed || isDownKeyPressed || isLeftKeyPressed || isRightKeyPressed)) {
            this.isANewKeyPressed = false;
        }

        if (isSpaceKeyPressed && (new Date().getTime() - this.lastSpaceBarPressedAt >= this.keyDownDelay)) {

            this.lastSpaceBarPressedAt = new Date().getTime();

            // le jeu se met en pause
            this.time.addEvent({
                callback: ()=>{

                    this.pauseAllAudio();

                    this.scene.pause();
                    this.scene.launch('pause');
                }
            });
        }

        // pour chaque flèche affichée actuellement
        this.fallingArrows.forEach((currentArrow) => {

            /* ||| RULES ||| */

            // flèche correctement capturée par le clic
            if ((new Date().getTime() - this.lastKeyPressedAt <= this.keyDownDelay) && currentArrow.y >= 600 && currentArrow.y <= 650) {

                if (isLeftKeyPressed && currentArrow.name == "left") {
                    this.sound.play('impact', {volume:0.5});
                    this.catchedArrows++;
                    this.consecutiveArrows++;
                    this.consecutiveMissedArrows = 0;
                    this.moveArrowToCapturedArray(currentArrow);

                } else if (isUpKeyPressed && currentArrow.name == "up") {
                    this.sound.play('impact', {volume:0.5});
                    this.catchedArrows++;
                    this.consecutiveArrows++;
                    this.consecutiveMissedArrows = 0;
                    this.moveArrowToCapturedArray(currentArrow);

                } else if (isDownKeyPressed && currentArrow.name == "down") {
                    this.sound.play('impact', {volume:0.5});
                    this.catchedArrows++;
                    this.consecutiveArrows++;
                    this.consecutiveMissedArrows = 0;
                    this.moveArrowToCapturedArray(currentArrow);

                } else if (isRightKeyPressed && currentArrow.name == "right") {
                    this.sound.play('impact', {volume:0.5});
                    this.catchedArrows++;
                    this.consecutiveArrows++;
                    this.consecutiveMissedArrows = 0;
                    this.moveArrowToCapturedArray(currentArrow);
                }

                // enregistrement des combos + "Share" visible après combo
                if (this.consecutiveArrows == 5 && this.sharedNews <26) {
                    this.sharedNews++;
                    this.consecutiveArrows = 0;
                    this.shared.visible = true;
                    this.sound.play('woop', {volume:0.3});

                    // assombri progressivement la couleur des colonnes droite et gauche
                    this.backgroundMask.alpha += 0.01;

                    this.showNextNews();

                    // ajouter des petits like-particules
                    let particles = this.add.particles("like");

                    let emitter = particles.createEmitter({
                        x: currentArrow.x,
                        y: 600,
                        frequency: 100,
                        alpha: 0.4,
                        angle: {min: -180, max: 0},
                        speed: 250,       
                        lifespan: {min: 1000, max: 2000},
                    });

                    // limiter la durée de l'effet like
                    this.time.delayedCall(700, ()=>{
                        emitter.frequency = -1;
                    });

                } else if (this.consecutiveArrows == 5 && this.sharedNews >= 26 && this.sharedNews < 44) {
                    this.sharedNews++;
                    this.consecutiveArrows = 0;
                    this.shared.visible = true;
                    this.shared.setText("DISORDER!");
                    this.sound.play('woop', {volume:0.5});

                    // assombri progressivement la couleur des colonnes droite et gauche
                    this.backgroundMask.alpha += 0.01;

                    this.showNextNews();

                    // ajouter des petits coeur-particules
                    let particles = this.add.particles("heart");

                    let emitter = particles.createEmitter({
                        x: currentArrow.x,
                        y: 600,
                        frequency: 100,
                        alpha: 0.4,
                        angle: {min: -180, max: 0},
                        speed: 250,       
                        lifespan: {min: 1000, max: 2000},
                    });

                    // limiter la durée des petits coeurs
                    this.time.delayedCall(700, ()=>{
                        emitter.frequency = -1;
                    });

                } else if (this.consecutiveArrows == 5 && this.sharedNews >= 44){
                    this.sharedNews++;
                    this.consecutiveArrows = 0;
                    this.shared.visible = true;
                    this.shared.setText("DEATH!");
                    this.sound.play('woop', {volume:0.5});

                    // assombri progressivement la couleur des colonnes droite et gauche
                    this.backgroundMask.alpha += 0.01;

                    this.showNextNews();

                    // ajouter des petits skull-particules
                    let particles = this.add.particles("skullHeart");

                    let emitter = particles.createEmitter({
                        x: currentArrow.x,
                        y: 600,
                        frequency: 100,
                        alpha: 0.4,
                        angle: {min: -180, max: 0},
                        speed: 250,       
                        lifespan: {min: 1000, max: 2000},
                    });

                    // limiter la durée des petits skulls
                    this.time.delayedCall(700, ()=>{
                        emitter.frequency = -1;
                    });
                }

                /* ||| SOUND ||| */

                // musique progressive : ajout de sons d'ambiance après un certain nombre de news partagées
                if (this.sharedNews == 5 && this.consecutiveArrows == 4) {
                    this.mallSound.play({loop: false, volume: 0.5});
                }

                if (this.sharedNews == 15 && this.consecutiveArrows == 4) {
                    this.chantsSound.play({loop: false, volume: 0.5});
                }

                if (this.sharedNews == 27 && this.consecutiveArrows == 4) {
                    this.screamsSound.play({volume: 0.5}, {loop: false, volume: 0.1});
                }

                if (this.sharedNews == 36 && this.consecutiveArrows == 4) {
                    this.trumpSound.play({detune: 0.5}, {loop: false});
                }

                if (this.sharedNews == 42 && this.consecutiveArrows == 4) {
                    this.warSound.play({loop: false});
                }
            }

            // suppression de la flèche du tableau une fois au-dehors de la zone pour éviter une saturation de la mémoire
            if (currentArrow.y > 720) {
                this.missedArrows++;
                this.consecutiveMissedArrows++;
                this.consecutiveArrows = 0;
                this.removeArrow(currentArrow);

                // le jeu termine en l'absence de clic
                if ((this.level < 10 && this.consecutiveMissedArrows == 20) || (this.level >= 10 && this.consecutiveMissedArrows == 50)) {
                    this.add.text(640,360,"THAT'S THE SPIRIT", {font: "40px jack", fill: "#da3e52"}).setOrigin(0.5);
                    this.time.addEvent({
                        delay: 3000,
                        callback: ()=>{
                            this.scene.start('ifNoClicks');
                            this.mainSong.stop();
                        }
                    });
                }
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

            } else {
                this.removeCapturedArrow(currentArrow);
            }
        });

        // s'il ne pleut pas encore
        if (!this.hasRainStarted && this.sharedNews == 30) {

            this.itsRaingingMan();
            this.hasRainStarted = true;
        }

        // s'il ne pleut pas encore fort
        if (!this.hasStrongRainStarted && this.sharedNews == 55) {

            this.itsRaingingMan(false);
            this.itsRaingingMen();
            this.hasStrongRainStarted = true;
        }

        // actualisation des scores
        this.levelLabel.setText('Level : ' + this.level);
        this.sharedLabel.setText(' Shared News : ' + this.sharedNews + '  ');
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
    addArrow(isDoubleArrowTime = false) {

        // sort une flèche entre 0 et 3 qui définit sa position
        var randomArrow = Math.floor(Math.random() * Math.floor(4));
        var newImage;

        // s'il est nécessaire de doubler les flèches…
        if (isDoubleArrowTime) {

            //… on vérifie qu'on ne recrée pas la même flèche que la précédente
            while (this.lastArrowType == randomArrow || (this.lastArrowType == 1 && randomArrow == 2) || (this.lastArrowType == 2 && randomArrow == 1)) {
                randomArrow = Math.floor(Math.random() * Math.floor(4));
            }
        }

        // on garde une trace du type de la dernière flèche créée (pour comparer dans la boucle précédente)
        this.lastArrowType = randomArrow;

        // ajout d'une flèche aléatoire dans le tableau selon sa position (0 = left, 1 = up, 2 = down, 3 = right)
        if (randomArrow == 0) {
            newImage = this.add.image(490, 210, 'leftFilled').setOrigin(0.5);
            newImage.name = 'left';
            this.fallingArrows.push(newImage);

        } else if (randomArrow == 1) {
            newImage = this.add.image(590, 210, 'upFilled').setOrigin(0.5);
            newImage.name = 'up';
            this.fallingArrows.push(newImage);

        } else if (randomArrow == 2) {
            newImage = this.add.image(690, 210, 'downFilled').setOrigin(0.5);
            newImage.name = 'down';
            this.fallingArrows.push(newImage);

        } else if (randomArrow == 3) {
            newImage = this.add.image(790, 210, 'rightFilled').setOrigin(0.5);
            newImage.name = 'right';
            this.fallingArrows.push(newImage);
        }

        newImage.depth = -3;
    };

    pauseAllAudio() {
        this.mainSong.pause();
        this.mallSound.pause();
        this.chantsSound.pause();
        this.screamsSound.pause();
        this.trumpSound.pause();
        this.warSound.pause();
        this.bombSound.pause();
    }

    resumeAllAudio() {
        this.mainSong.resume();
        this.mallSound.resume();
        this.chantsSound.resume();
        this.screamsSound.resume();
        this.trumpSound.resume();
        this.warSound.resume();
        this.bombSound.resume();
    }

    stopAllAudio() {
        this.mainSong.stop();
        this.mallSound.stop();
        this.chantsSound.stop();
        this.screamsSound.stop();
        this.trumpSound.stop();
        this.warSound.stop();
    }

    getNextRandomNotification() {

        // retour au début du tableau
        if (this.currentNotification >= this.newsData["notifications"].length) {

            this.currentNotification = 0;
        }

        if (this.currentNotification == 0) {

            // création d'un tableau contenant les index des notifications
            this.randomNotifications = [];

            for (var i = 0; i < this.newsData["notifications"].length; i++) {

                this.randomNotifications[i] = i;
            }

            // mélange le tableau où sont indexées les notifications (optionnel)
            for (var i = this.randomNotifications.length - 1; i > 0; i--)
            {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = this.randomNotifications[i];
                this.randomNotifications[i] = this.randomNotifications[j];
                this.randomNotifications[j] = temp;
            }
        }

        // retourne le texte de la notification à l'index this.currentNotification avant de l'incrémenter
        return this.newsData["notifications"][this.randomNotifications[this.currentNotification++]]["notif"];
    }

    // modifie le texte de la notification sélectionnée
    updateNotification(notification, text) {

        let currentNotification;
        let currentBackground;

        if (notification == 1) {

            currentNotification = this.notifications1;
            currentBackground = this.backgroundNotifications1;
        }

        else if (notification == 2) {

            currentNotification = this.notifications2;
            currentBackground = this.backgroundNotifications2;
        }

        else if (notification == 3) {

            currentNotification = this.notifications3;
            currentBackground = this.backgroundNotifications3;
        }

        // estompage de la notification précédement affichée
        this.tweens.add({
            targets: [currentNotification, currentBackground],
            alpha: {value: 0, duration: 1000, ease: 'Power1'}, 
        });

        // event qui retarde la modification du texte de la news jusqu'à qu'elle soit estompée
        this.time.addEvent({

            delay: 1000,
            callback: ()=>{

                // modification du texte de la notification
                currentNotification.setText(text);
            }
        })

        // affichage progressif de la nouvelle notification
        this.tweens.add({
            targets: [currentNotification, currentBackground],
            alpha: {value: 1, duration: 1000, ease: 'Power1'},
            delay: 1000
        });

    }

    // animation lorsqu'il commence à pleuvoir        
    itsRaingingMan() {

        this.rain = this.add.particles('rain');

        this.rain.setDepth(25);
    
        this.rain.createEmitter({
            
            x: { min: -200, max: 1200 },
            y: 0,
            rotate: -10,
            alpha: 0.1,
            lifespan: { min: 1500, max: 2000 },
            speedY: { min: 50, max: 150 },
            gravityY: 400,
            gravityX: Phaser.Math.Between(50, 100),
            frequency: 80
        });
    }

    itsRaingingMen() {

        this.rain = this.add.particles('rain');

        this.rain.setDepth(25);

        this.rain.createEmitter({
            
            x: { min: -200, max: 1200 },
            y: 0,
            rotate: -10,
            alpha: 0.2,
            lifespan: { min: 1500, max: 2000 },
            speedY: { min: 50, max: 150 },
            gravityY: 400,
            gravityX: Phaser.Math.Between(50, 100),
            frequency: 50
        });
    }

    // animation du passage à la news suivante
    showNextNews() {
 
        this.currentNews++;

        // le tableau se réinitialise lorsqu'on arrive à la dernière news
        if (this.currentNews == this.newsData["notifications"].length) {
            this.currentNews = 0;
        }

        // création d'une copie de la news afin qu'elle demeure à sa place initiale malgré l'animation qui suit
        this.shared.alpha = 1;
        this.shared.y = 200;

        this.backgroundNews2.y = this.backgroundNews.y;
        this.titleNews2.y = this.titleNews.y;
        this.textNews2.y = this.textNews.y;

        this.titleNews2.setText(this.titleNews.text);
        this.textNews2.setText(this.textNews.text);
        
        this.backgroundNews2.alpha = 1;
        this.titleNews2.alpha = 1;
        this.textNews2.alpha = 1;

        this.backgroundNews.alpha = 0;
        this.titleNews.alpha = 0;
        this.textNews.alpha = 0;

        this.titleNews.setText(this.newsData["fakeNews"][this.currentNews]["newspaperTitle"]);
        this.textNews.setText(this.newsData["fakeNews"][this.currentNews]["content"]);

        // les éléments visés tombent en s'estompant
        this.tween = this.tweens.add({

            targets: [this.backgroundNews, this.titleNews, this.textNews],
            duration: 2000,
            alpha: 1,
            ease: "Power1",
        });

        this.tween = this.tweens.add({

            targets: [this.shared],
            y: {
                getStart: () => this.shared.y,
                getEnd: () => this.shared.y + 350,
            },
            duration: 1000,
            alpha: 0,
            ease: "Power1",
        });

        this.tween = this.tweens.add({

            targets: [this.backgroundNews2],
            y: {
                getStart: () => this.backgroundNews2.y,
                getEnd: () => this.backgroundNews2.y + 350,
            },
            duration: 1000,
            alpha: 0,
            ease: "Power1",
        });

        this.tween = this.tweens.add({

            targets: [this.titleNews2],
            y: {
                getStart: () => this.titleNews2.y,
                getEnd: () => this.titleNews2.y + 350,
            },
            duration: 1000,
            alpha: 0,
            ease: "Power1",
        });

        this.tween = this.tweens.add({

            targets: [this.textNews2],
            y: {
                getStart: () => this.textNews2.y,
                getEnd: () => this.textNews2.y + 350,
            },
            duration: 1000,
            alpha: 0,
            ease: "Power1",
        });

        // si le nombre de hashtag n'est pas suffisant, le jeu ne plante pas
        if (this.newsData["fakeNews"][this.currentNews]["hashtag"][0]) {
            this.hashtag1.setText(this.newsData["fakeNews"][this.currentNews]["hashtag"][0]);
        }

        if (this.newsData["fakeNews"][this.currentNews]["hashtag"][1]) {
            this.hashtag2.setText(this.newsData["fakeNews"][this.currentNews]["hashtag"][1]);
        }

        if (this.newsData["fakeNews"][this.currentNews]["hashtag"][2]) {
            this.hashtag3.setText(this.newsData["fakeNews"][this.currentNews]["hashtag"][2]);
        }

        if (this.newsData["fakeNews"][this.currentNews]["hashtag"][3]) {
            this.hashtag4.setText(this.newsData["fakeNews"][this.currentNews]["hashtag"][3]);
        }
        
        if (this.newsData["fakeNews"][this.currentNews]["hashtag"][4]) {
            this.hashtag5.setText(this.newsData["fakeNews"][this.currentNews]["hashtag"][4]);
        }
    } 
}