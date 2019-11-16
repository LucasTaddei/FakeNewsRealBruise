class ResultScene extends Phaser.Scene {

    init(score){
        
        this.score = score;
    }

    constructor(data){

        console.log(data);

        super("result");
    }


    create(){
        var titleText = this.add.text(640, 200,"Resultat", {font: "60px Times", fill: "black"}).setOrigin(0.5)

        var scoreText = this.add.text(640, 300, "Catched: " + this.score.catchedArrows, {font: "60px Times", fill: "white"}).setOrigin(0.5)
        
        var failText = this.add.text(640, 400, "Missed: " + this.score.missedArrows, {font: "60px Times", fill: "red"}).setOrigin(0.5)
    
    }
}