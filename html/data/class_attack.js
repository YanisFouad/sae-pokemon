import fast_moves from "./fast_moves.js";
import charged_moves from "./charged_moves.js";

export class Attack {

    static allAttacks = new Object();

    constructor(attackName) {
        this._attackName = attackName;
        this._attack = this.initAttack();
        this.initAllAttacks();
    }

    initAttack() {
        for (let [key, move] of Object.entries(fast_moves)) {
            if(move.name == this._attackName){
                return move;
            }
        }
        
        for (let [key, move] of Object.entries(charged_moves)) {
            if(move.name == this._attackName){
                return move;
            }
        }
    }

    initAllAttacks() {
        if(!Attack.allAttacks[this._attack.move_id]){
            Attack.allAttacks[this._attack.move_id] = this._attack
        }
    }

    get attack() {
        return this._attack;
    }
}
