import pokemon_type from "../../JSON/pokemon_type.js";
import type_effectiveness from "../../JSON/type_effectiveness.js";

export class Type {

    static allTypes = new Object();

    constructor(type) {
        this._type = {title: type, effectiveness: type_effectiveness[type]};
        this.addType();
    }

    get type() {
        return this._type;
    }

    addType() {
        if(!Type.allTypes[this._type.title]){
            Type.allTypes[this._type.title] = this._type
        }
    }

    toString() {
        let msg = "Title : " + this.type.title + "\Effectiveness : \n";

        for(let [key, efficiency] of Object.entries(this._type.type)) {
            msg += "\t- " + key + " : " + efficiency + "\n";
        }

        return msg;
    }
}

let a = new Type("Grass");
let b = new Type("Poison");

console.log(Type.allTypes)