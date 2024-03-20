import pokemon from "./pokemon.js"
import { Type } from "./class_type.js";
import { Attack } from "./class_attack.js";
import pokemon_types from "./pokemon_type.js";
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
    getAttacks(){return {...this._fastMove, ...this._chargedMove}}

}

importPokemon();

function importPokemon() {
    Pokemon.allPokemons = new Object ();
    pokemon.forEach(poke => {
        if (poke.form == "Normal") {
            let p = new Pokemon(poke.pokemon_id,poke.pokemon_name,poke.form,poke.base_attack,poke.base_defense,poke.base_stamina,
                                getPokemonType(poke.pokemon_id),getPokemonFastAttack(poke.pokemon_id),getPokemonChargedAttack(poke.pokemon_id));
            Pokemon.allPokemons[p._pokemon_id] = p;
        }
        
    })};

function getPokemonType(id) {
    let types;
    let pokemonTypes = new Object();
    let pokemonType;

    pokemon_types.forEach(typePoke =>{
        if (typePoke.form == "Normal" && typePoke.pokemon_id == id) {
            types = typePoke.type;
            types.forEach(type => {
                pokemonType = new Type(type);
                pokemonTypes[pokemonType.type.title] = pokemonType;
            });
        }})
        return pokemonTypes;
}

function getPokemonFastAttack(id) {
    let fast;
    let attacks = new Object();
    let attack;
    pokemon_moves.forEach(movePoke =>{
        if (movePoke.form == "Normal" && movePoke.pokemon_id == id) {
            fast = movePoke.fast_moves;
            fast.forEach(move => {
                attack = new Attack(move)
                attacks[attack._attack.move_id] = attack;
            });
        }})
        return attacks;
}


function getPokemonChargedAttack(id) {
    let charged;
    let attacks = new Object();
    let attack;
    pokemon_moves.forEach(movePoke =>{
        if (movePoke.form == "Normal" && movePoke.pokemon_id == id) {
            charged = movePoke.charged_moves;

            charged.forEach(move => {
                attack = new Attack(move)
                attacks[attack._attack.move_id] = attack;
            });
        }})
        return attacks;
}

export function getPokemonsByType(typeName) {
    return Object.values(Pokemon.allPokemons).filter((pokemon) => {
        return pokemon.getTypes().hasOwnProperty(typeName);
    });
}

export function getPokemonsByAttack(attackName) {
    return Object.values(Pokemon.allPokemons).filter((pokemon) => {
        for(const [key, attack] of Object.entries(pokemon.getAttacks())) {
            if (attack._attack.name == attackName) {
                return pokemon;
            }
        }
    })
}

export function getAttacksByType(attackType) {
    return Object.values(Attack.allAttacks).filter((attack) => {
        if (attack.type == attackType) {
            return attack;
        }
    })
}

export function sortPokemonsByName(){
    return Object.values(Pokemon.allPokemons).sort((lastPokemon, currentPokemon) => {
        if (lastPokemon._pokemon_name < currentPokemon._pokemon_name) {
            return -1;
        }

        if (lastPokemon._pokemon_name > currentPokemon._pokemon_name) {
            return 1;
        }

        return 0;
    })
}

export function sortPokemonsByStamina(){
    return Object.values(Pokemon.allPokemons).sort((lastPokemon, currentPokemon) => {
        if (lastPokemon._base_stamina > currentPokemon._base_stamina) {
            return -1;
        }
        
        if (lastPokemon._base_stamina < currentPokemon._base_stamina) {
            return 1;
        }

        return 0;
    })
}