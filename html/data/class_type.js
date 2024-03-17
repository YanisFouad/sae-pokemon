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