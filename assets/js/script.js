import { Game } from "./Models/Game.js"
import { Player } from "./Models/Player.js"


const p1 = new Player("Julien")
const p2 = new Player("Anne")
p1.addSecondPlayer(p2)

const game = new Game(p1, p2)