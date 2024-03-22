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
        return "\n          Attack name : " + this._attackName + 
        "\n             Critical Chance : " + this._attack.critical_chance +
        "\n             Duration : " + this._attack.duration +
        "\n             Energy Delta  : " + this._attack.energy_delta +
        "\n             Move ID : " + this._attack.move_id +
        "\n             Power : " + this._attack.power +
        "\n             Stamina Loss Scaler : " + this._attack.stamina_loss_scaler +
        "\n             Duration : " + this._attack.duration +
        "\n             Type : " + this._attack.type;
    }
}
