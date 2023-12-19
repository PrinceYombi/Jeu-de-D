import { lose_score, scores, winScore } from "../Variables/variables.js"


export class Player {

    static position = 0 
    static rollValue = 1 

    constructor(name=null, secondPlayer= null){
        Player.position ++
        this.name = name ? name : "Joueur "+Player.position
        this.scoreGlobal = 0
        this.scoreRound = 0
        this.isCurrentPlayer = false
        this.secondPlayer = secondPlayer
    }

    play(){

        if(this.isCurrentPlayer){
            Player.rollValue = Math.floor(Math.random()*6)+1
    
            if(lose_score.includes(Player.rollValue)){
                this.audios("lose")
                // perdu
                if(this.scoreRound <0){
                    this.scoreGlobal += this.scoreRound
                }
                this.scoreRound = 0
                this.changePlayer()
            }else{
                this.audios("success")
                // gagné ou perdu des points
                this.scoreRound += scores[Player.rollValue]
            }

        }
    }
    hold(){
        this.audios("change")
        this.scoreGlobal += this.scoreRound 
        this.scoreRound = 0
        this.changePlayer()
    }
    addSecondPlayer(player){
        this.secondPlayer = player
        player.secondPlayer = this
        if(!this.isCurrentPlayer && !player.isCurrentPlayer){
            this.isCurrentPlayer = true
        }
    }
    changePlayer(){
        if(this.secondPlayer){
            this.isCurrentPlayer = false 
            this.secondPlayer.isCurrentPlayer = true
        }
    }
    isWin(){
        return this.scoreGlobal >= winScore
    }
    resetScore(){
        this.scoreGlobal = 0
        this.scoreRound = 0
    }
    audios(name="success"){
        const audio = document.createElement("audio")
        audio.src = "assets/audios/"+name+".wav" 
        audio.play()
    }
}