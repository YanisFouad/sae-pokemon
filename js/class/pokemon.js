import pokemon from "../../JSON/pokemon.js"
import { Type } from "./Type.js";
import { Attack } from "./Attack.js";
import pokemon_types from "../../JSON/pokemon_type.js";
import pokemon_moves from "../../JSON/pokemon_moves.js";


export class Pokemon{
    static allPokemons;
    constructor(id,name,form,attack,defense,stamina,type,fast,charged){
        this._pokemon_id = id,
        this._pokemon_name = name, 
        this._form = form,
        this._base_attack = attack, 
        this._base_defense = defense,
        this._base_stamina = stamina,
        this._type = type,
        this.fastMove = fast,
        this.chargedMove =charged
    }
    getTypes(){return this._type;}

}

function importPokemon() {
    Pokemon.allPokemons = new Object ();
    pokemon.forEach(poke => {
        if (poke.form == "Normal") {
            let p = new Pokemon(poke.pokemon_id,poke.pokemon_name,poke.form,poke.base_attack,poke.defense,poke.base_stamina,
                                getPokemonType(poke.pokemon_id),getPokemonAttack(poke.pokemon_id)[0],getPokemonAttack(poke.pokemon_id)[1]);
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
function getPokemonAttack(id) {
    let fast;
    let charged;
    pokemon_moves.forEach(movePoke =>{
        if (typePoke.form == "Normal" && movePoke.pokemon_id == id) {
            fast = movePoke.fast_moves;
            charged = typePoke.charged_moves;
            fast.forEach(move => {
                new Attack(move)
            });
            charged.forEach(move => {
                new Attack(move)
            });
        }})
        return fast,charged;
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