import { Player } from "./Player.js";


export class Game {

    constructor(p1=null, p2=null){
        this.firstPlayer = p1 ? p1 : new Player()
        this.secondPlayer = p2 ? p2 : new Player()
        this.initDOM()
    }

    initDOM(){
        this.updateDOM()
        this.initEvent()
    }

    updateDOM(){
        this.getPlayers().forEach((player, index) =>{
            const position = index + 1
            const playerClassName = ".player"+position
            if(player.isCurrentPlayer){
                document.querySelector(playerClassName).classList.add("active")
            }else{
                document.querySelector(playerClassName).classList.remove("active")

            }
            document.querySelector(playerClassName+" h2").innerText = player.name
            document.querySelector(playerClassName+" .score_global").innerText = player.scoreGlobal
            document.querySelector(playerClassName+" .score").innerText = player.scoreRound
        })
        const fileUrl = "assets/images/face"+Player.rollValue+".png"
        document.querySelector(".game_option_item img").src = fileUrl
    }

    initEvent(){
        document.getElementById("roll").addEventListener("click", ()=>{
            this.getCurrentPlayer()?.play()
            this.updateDOM()
        })
        document.getElementById("hold").addEventListener("click", ()=>{
            this.getCurrentPlayer()?.hold()
            this.updateDOM()
            this.displayModal()
        })
        document.getElementById("newGame").addEventListener("click", ()=>{
            this.firstPlayer?.resetScore()
            this.secondPlayer?.resetScore()
            
            this.updateDOM()
        })
    }

    getPlayers(){
        return [this.firstPlayer, this.secondPlayer]
    }

    getCurrentPlayer(){
        if(this.firstPlayer.isCurrentPlayer){
            return this.firstPlayer
        }
        if(this.secondPlayer.isCurrentPlayer){
            return this.secondPlayer
        }
        return null
    }

    getWinner(){
        if(this.firstPlayer.isWin()){
            return this.firstPlayer
        }
        if(this.secondPlayer.isWin()){
            return this.secondPlayer
        }
        return null
    }

    displayModal(){
        const player = this.getWinner()
        if(player){
            document.querySelector(".modal-body").innerText = "Bravo : "+player.name+" a gagné avec "+player.scoreGlobal+" points."
            document.querySelector(".modal").classList.remove("none")
            document.querySelector(".modal button").onclick = this.resetGame.bind(this)

        }
    }

    resetGame (){
        this.firstPlayer.resetScore()
        this.secondPlayer.resetScore()
        this.updateDOM()
        document.querySelector(".modal").classList.add("none")
    }

   
}