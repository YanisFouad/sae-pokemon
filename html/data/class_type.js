import type_effectiveness from "./type_effectiveness.js";

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
            Type.allTypes[this._type.title] = this
        }
    }

    toString() {
        let msg = "\nType : " + this._type.title + "\n  Effectiveness : \n";

        for(let [key, efficiency] of Object.entries(this._type.effectiveness)) {
            msg += "\t-  " + key + " : " + efficiency + "\n";
        }

        return msg;
    }
}