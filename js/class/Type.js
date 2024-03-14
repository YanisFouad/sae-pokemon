import pokemon_type from "../../JSON/pokemon_type.js";
import type_effectiveness from "../../JSON/type_effectiveness.js";

class Type {

    static allTypes;

    constructor(type) {
        this._type = type;
        Type.allTypes = new Object();
        this.initAllTypes();
        this._effectiveness = new Object(type_effectiveness[this._type]);;
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

    get effectiveness() {
        return this._effectiveness;
    }
}