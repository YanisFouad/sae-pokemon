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
            Attack.allAttacks[this._attack.move_id] = this
        }
    }

    get attack() {
        return this._attack;
    }
    
    toString() {
        return "Attack name : " + this._attackName + 
        "\nCritical Chance : " + this._attack.critical_chance +
        "\nDuration : " + this._attack.duration +
        "\nEnergy Delta  : " + this._attack.energy_delta +
        "\nMove ID : " + this._attack.move_id +
        "\nPower : " + this._attack.power +
        "\nStamina Loss Scaler : " + this._attack.stamina_loss_scaler +
        "\nDuration : " + this._attack.duration +
        "\nType : " + this._attack.type;
    }
}
