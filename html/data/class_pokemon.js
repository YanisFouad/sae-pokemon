import pokemon from "./pokemon.js"
import { Type } from "./class_type.js";
import { Attack } from "./class_attack.js";
import pokemon_types from "./JSON/pokemon_type.js";
import pokemon_moves from "./pokemon_moves.js";


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
        this._fastMove = fast,
        this._chargedMove =charged
    }
    getTypes(){return this._type;}
    getAttacks(){return [].concat(this._chargedMove, this._fastMove)}

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
        if (movePoke.form == "Normal" && movePoke.pokemon_id == id) {
            fast = movePoke.fast_moves;
            charged = movePoke.charged_moves;
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

/*
function getPokemonByType(typeName) {
    let tab = [];
    Pokemon.allPokemons.forEach(poke => {
        poke.id.getTypes().forEach(type =>{
            if (type = typeName ){
                tab.push(poke);
            }
        })
    })
    return tab;
}

function getPokemonByAttack(attackName) {
    let tab = [];
    Pokemon.allPokemons.forEach(poke => {
        poke.id.getAttacks().forEach(attack =>{
            if (attack.name = attackName ){
                tab.push(poke);
            }
        })
    })
    return tab;
}
console.log(getPokemonByAttack("Wrap"))

function sortPokemonByName(){
    Pokemon.allPokemons.sort((a, b) => {
        const nameA = a._pokemon_name.toUpperCase(); // ignore upper and lowercase
        const nameB = b._pokemon_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
}

function sortPokemonByStamina(){
    Pokemon.allPokemons.sort((a,b) => a.value - b.value);
}

*/