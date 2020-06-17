class learnMore extends Phaser.Scene {

    constructor(){
        super("learnMore");
    }

    preload(){
        this.load.image('logo','assets/images/LOGO.png');
        this.load.image('skyline', 'assets/images/Skyline.png');
        this.load.image('cloud1', 'assets/images/cloud1.png');
        this.load.image('cloud2', 'assets/images/cloud2.png');
        this.load.image('cloud3', 'assets/images/cloud3.png');
    }

   create(){
    // ajouter les nuages
    this.cloud1 = this.add.image(50, 100, 'cloud1');
    this.cloud2 = this.add.image(500, 300, 'cloud2');
    this.cloud3 = this.add.image(1000, 200, 'cloud3');

    // ajouter la ville
    var skyline = this.add.image(640, 360, 'skyline').setOrigin(0.5);

    // ajouter texte phase 1
    var learnMoreTitle1 = this.add.text(640, 150, "What is a fake news ?", {font: '55px jack', fill: '#112b1a'}).setOrigin(0.5).setAlpha(0);
    var learnMoreText1 = this.add.text(640, 350, 'It is information that is deliberately misleading and is intended to deceive or manipulate the person reading it. The idea of intent, of manipulation, is important.\n  In order to manipulate and with an ideological purpose or a desire to create a buzz, the strength of fake news is to mimic real information. We copy real sites, formatting the news to make it look real.\n Fake news uses very emotional springs that encourage clicks, sharing and engagement.', {font: '25px imperator', fill: '#112b1a', lineSpacing: 10}).setOrigin(0.5);
    learnMoreText1.setWordWrapWidth(1000, false).setAlign('center').setAlpha(0);
    var nextButton1 = this.add.text(640,570, "Next", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive().setAlpha(0);
    this.tweens.add({
        targets: [learnMoreTitle1, learnMoreText1,nextButton1],
        alpha: { value: 1, duration: 300, ease: 'Power1' },          
        delay: 300,  
    });

    // ajouter texte phase 2
    var learnMoreTitle2 = this.add.text(640, 150, 'How dangerous is fake news?', {font: '55px jack', fill: '#112b1a'}).setOrigin(0.5).setAlpha(0);
    var learnMoreText2 = this.add.text(640, 370, "Initially and from an individual perspective, the fake news we share impacts our own credibility and places us in the involuntary manipulation of our loved ones. If we now consider this question of fake news in a global way, everyone is a tool for spreading deliberately false information with a view to manipulation. The danger lies in the wide and rapid dissemination of this fake news, which can in the worst case deeply destabilize democratic processes and affect our societies. Do we really want to be the actors of a disorder that does not serve our interests but the interests of those who wish to manipulate our environment? If you want to stay free and form your own opinion on information that tries to be as close to the facts as possible, then read our little guide!", {font: '25px imperator', fill: '#112b1a', lineSpacing: 10}).setOrigin(0.5);
    learnMoreText2.setWordWrapWidth(1150, false).setAlign('center').setAlpha(0);
    var nextButton2 = this.add.text(640,570, "Next", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive().setAlpha(0);
   
    // ajouter texte phase 3
    var learnMoreTitle3 = this.add.text(640, 150, 'How to hedge against fake news?', {font: '55px jack', fill: '#112b1a'}).setOrigin(0.5).setAlpha(0);
    var learnMoreText3 = this.add.text(640, 350, '1. en cas de doute, ne partagez pas\n 2. lisez les commentaires\n 3. regardez les détails\n 4. copiez/collez le texte \n5. effectuez une recherche inversée \n 6. vérifiez la source\n\n Donc vérifie cette source avant de partager!', {font: '30px imperator', fill: '#112b1a', lineSpacin: 10}).setOrigin(0.5);
    learnMoreText3.setWordWrapWidth(1000, false).setAlign('center').setAlpha(0);
    var returnButton3 = this.add.text(640,570, "Return", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive().setAlpha(0);
    
    // lier les boutons à des fonctions pour lancer la phase suivante ou retourner à la page de fin
    nextButton1.on('pointerdown', function() {
        learnMoreText1.destroy();
        learnMoreTitle1.destroy();
        nextButton1.destroy();    
        this.tweens.add({
        targets: [learnMoreTitle2, learnMoreText2, nextButton2],
        alpha: { value: 1, duration: 200, ease: 'Power1' },          
        delay: 200,  
    });
    }, this);

    nextButton2.on('pointerdown', function() {
        learnMoreText2.destroy();
        learnMoreTitle2.destroy();
        nextButton2.destroy();    
        this.tweens.add({
        targets: [learnMoreTitle3, learnMoreText3, returnButton3],
        alpha: { value: 1, duration: 200, ease: 'Power1' },          
        delay: 200,  
    });
    }, this);

    returnButton3.on('pointerdown', function() {
        this.scene.start('end')
    }, this);
    
    }

    // faire se déplacer les nuages
    update(){
        this.moveClouds(this.cloud1, 0.4);
        this.moveClouds(this.cloud2, 0.1);
        this.moveClouds(this.cloud3, 0.3);
    }
        moveClouds (cloud, speed) {
            cloud.x += speed;
            if (cloud.x > config.width+150){
            this.resetCloudPosition(cloud);
            }
        }
        resetCloudPosition (cloud) {
            cloud.x = -200;
            var randomY = Phaser.Math.Between(0, 420)
            cloud.y = randomY;
        }
}