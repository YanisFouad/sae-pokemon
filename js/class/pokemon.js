import pokemon from "../../JSON/pokemon.js"
import { Type } from "./Type.js";
import pokemon_types from "../../JSON/pokemon_type.js";


export class Pokemon{
    static allPokemons;
    constructor(id,name,form,attack,defense,stamina,type){
        this._pokemon_id = id,
        this._pokemon_name = name, 
        this._form = form,
        this._base_attack = attack, 
        this._base_defense = defense,
        this._base_stamina = stamina,
        this._type = type
    }
    getTypes(){return this._type;}

}

function importPokemon() {
    Pokemon.allPokemons = new Object ();
    pokemon.forEach(poke => {
        if (poke.form == "Normal") {
            let p = new Pokemon(poke.pokemon_id,poke.pokemon_name,poke.form,poke.base_attack,poke.defense,poke.base_stamina,getPokemonType(poke.pokemon_id));
            Pokemon.allPokemons[p._pokemon_id] = p;
        }
        
    })};

function getPokemonType(id) {
    let types;
    pokemon_types.forEach(typePoke =>{
        if (typePoke.form == "Normal" && typePoke.pokemon_id == id) {
            types = typePoke.type;
            types.forEach(type => {
                new Type(type)
            });
        }})
        return types;
}
importPokemon();

console.log(Pokemon.allPokemons)

function getPokemonByType(typeName) {
    let tab = [];
    allPokemons.forEach(poke => {
        poke.getTypes().forEach(type =>{
            if (type = typeName ){
                tab.push(poke);
            }
        })
    })
    return tab;
}