import type_effectiveness from "../../JSON/type_effectiveness.js"

class Type {

    static allTypes;

    constructor() {
        Type.allTypes = type_effectiveness;
        console.log(JSON.parse(type_effectiveness))
    }
    
}

new Type();