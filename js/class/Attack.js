import fast_moves from "../../JSON/fast_moves.js";
import charged_moves from "../../JSON/charged_moves.js";

export class Attack {

    static allAttacks;

    constructor(attackId) {
        this._attackId = attackId;
        this._attack = this.initAttack();
        Attack.allAttacks = new Object();
        this.initAllAttacks();
    }

    initAttack() {
        for (let [key, move] of Object.entries(fast_moves)) {
            if(move.move_id == this._attackId){
                return move;
            }
        }
        
        for (let [key, move] of Object.entries(charged_moves)) {
            if(move.move_id == this._attackId){
                return move;
            }
        }
    }

    initAllAttacks() {
        for (let [key, move] of Object.entries(fast_moves)) {
            Attack.allAttacks[move.move_id] = move;
        }
        
        for (let [key, move] of Object.entries(charged_moves)) {
            Attack.allAttacks[move.move_id] = move;
        }
    }

    get attack() {
        return this._attack;
    }
}

let a = new Attack(45)

console.log(a.attack);