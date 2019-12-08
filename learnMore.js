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
    //ajouter les nuages
    this.cloud1 = this.add.image(50, 100, 'cloud1');
    this.cloud2 = this.add.image(500, 300, 'cloud2');
    this.cloud3 = this.add.image(1000, 200, 'cloud3');


    //ajouter la ville
    var skyline = this.add.image(640, 360, 'skyline').setOrigin(0.5);

    //ajouter texte phase 1
    var learnMoreTitle1 = this.add.text(640, 150, "Qu'est-ce qu'une fake news", {font: '55px jack', fill: '#112b1a'}).setOrigin(0.5).setAlpha(0);
    var learnMoreText1 = this.add.text(640, 350, 'C’est une information volontairement mensongère et qui est destinée à tromper ou à manipuler la personne qui la lira. L’idée d’intention, de manipulation, est importante.Dans le but de manipuler et dans une finalité idéologique ou une volonté de faire le buzz, la force des fake news est de mimer une véritable information. On copie de vrais sites en formatant les infos pour qu’elles puissent passer pour vraies.', {font: '30px imperator', fill: '#112b1a', lineSpacing: 10}).setOrigin(0.5);
    learnMoreText1.setWordWrapWidth(1000, false).setAlign('center').setAlpha(0);
    var nextButton1 = this.add.text(640,570, "Next", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive().setAlpha(0);
    this.tweens.add({
        targets: [learnMoreTitle1, learnMoreText1,nextButton1],
        alpha: { value: 1, duration: 300, ease: 'Power1' },          
        delay: 300,  
    });

    //ajouter texte phase 2
    var learnMoreTitle2 = this.add.text(640, 150, 'Quel danger représentent les fake news?', {font: '55px jack', fill: '#112b1a'}).setOrigin(0.5).setAlpha(0);
    var learnMoreText2 = this.add.text(640, 370, "Dans un premier temps et dans une optique individuelle, la fake news que l'on partage impact notre crédibilité propre et nous place dans la manipulation involontaire de nos proches. Si à présent nous considérons cette question des fake news de manière globale chacun/ne se fait l'outil de diffusion d'informations volontairement mensongères dans une optique de manipulation. Le danger se situe ainsi dans une diffusion large et rapide de ces fake news qui peuvent dans le pire des cas profondément destabiliser les processus démocratiques et affecter nos sociétés. Souhaitons-nous vraiment être les acteurs d'un désordre qui ne sert pas nos intérêts mais les intérêts de ceux qui souhaitent manipuler notre environnement? Si vous souhaitez demeurer libres et vous faire votre opinions sur des informations qui tentent de se rapprocher le plus des faits, alors lisez notre petit guide!", {font: '25px imperator', fill: '#112b1a', lineSpacing: 10}).setOrigin(0.5);
    learnMoreText2.setWordWrapWidth(1150, false).setAlign('center').setAlpha(0);
    var nextButton2 = this.add.text(640,570, "Next", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive().setAlpha(0);
   
    //ajouter texte phase 3
    var learnMoreTitle3 = this.add.text(640, 150, 'Comment se prémunir contre les fake news?', {font: '55px jack', fill: '#112b1a'}).setOrigin(0.5).setAlpha(0);
    var learnMoreText3 = this.add.text(640, 300, 'texte', {font: '30px imperator', fill: '#112b1a', lineSpacin: 10}).setOrigin(0.5);
    learnMoreText3.setWordWrapWidth(1000, false).setAlign('center').setAlpha(0);
    var returnButton3 = this.add.text(640,570, "Return", {font: "60px jack", fill: "#112b1a"}).setOrigin(0.5).setInteractive().setAlpha(0);
    
    //Lier les boutons à des fonctions pour lancer la phase suivante ou retourner à la page de fin
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



    //faire se déplacer les nuages
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