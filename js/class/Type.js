import pokemon_type from "../../JSON/pokemon_type.js";
import type_effectiveness from "../../JSON/type_effectiveness.js";

class Type {

    static allTypes;

    constructor(type) {
        this._type = {title: type, type: type_effectiveness[type]};
        Type.allTypes = new Object();
        this.initAllTypes();
    }

    initAllTypes() {
        for (const [key, pokemon] of Object.entries(pokemon_type)) {
            if (pokemon.form === "Normal") {
                for (const type of pokemon.type) {
                    if (!Type.allTypes[type]) {
                        Type.allTypes[type] = [type_effectiveness[this._type]];
                    }
                }
            }
        }
    }

    get type() {
        return this._type;
    }

    toString() {
        let msg = "Title : " + this.type.title + "\nEfficiency : \n";

        for(let [key, efficiency] of Object.entries(this._type.type)) {
            msg += "\t- " + key + " : " + efficiency + "\n";
        }

        return msg;
    }
}