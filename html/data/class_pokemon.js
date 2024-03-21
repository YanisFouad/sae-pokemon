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
    toString(){ let poke = '';
                poke += "Id : " + this._pokemon_id + "\n"
                poke += "Name : " + this._pokemon_name + "\n"
                poke += "Form : " + this._form + "\n"
                poke += "Base attack : " + this._base_attack + "\n"
                poke += "Base defense : " + this._base_defense + "\n"
                poke += "Base stamina : " + this._base_stamina + "\n"
                
                poke += "Type : "
                for (let type in this._type) {  
                    poke += this._type[type].toString() + " "
                }
                poke += "\nAttack :\n    chargedMove : "
                for (let charged in this._chargedMove){
                    poke += this._chargedMove[charged].toString() + " "
                }
                poke += "\n     fastMove : "
                for (let fast in this._fastMove){
                    poke += this._fastMove[fast] + " "
                }
                
                
        return   poke}

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
        console.log(attack);
        if (attack._attack.type == attackType) {
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


export function getWeakestEnemies(attack){
    let pokemonEffectiveness = [];

    let attackType = Object.values(Attack.allAttacks).filter((currentAttack) => {
        if(currentAttack._attack.name == attack){
            return attack;
        }
    })[0]._attack.type;

    for (const [key,poke] of Object.entries(Pokemon.allPokemons)){
        let effectiveness = 1;
        for (let type in poke._type){
            console.log(Type.allTypes[type]);
            effectiveness *= Type.allTypes[type]._type.effectiveness[attackType];
        }
        effectiveness = effectiveness.toFixed(2);
        pokemonEffectiveness.push({effectiveness: effectiveness, pokemon: poke});
    }
    const maxValueEffectiveness = Math.max(...pokemonEffectiveness.map(o => o.effectiveness), 0);

    pokemonEffectiveness = pokemonEffectiveness.filter((currentPokemon) => {
        if(currentPokemon.effectiveness == maxValueEffectiveness) {
            return currentPokemon;
        }
    });

    return pokemonEffectiveness;
}

export function getBestAttackTypesForEnemy(name){
    let pokemonEffectiveness = new Object();

    let pokemonAttack = Object.values(Pokemon.allPokemons).filter((currentPokemon) => {
        if(currentPokemon._pokemon_name == name){
            return currentPokemon;
        }
    })[0].getAttacks();

    for (const [key,attack] of Object.entries(pokemonAttack)){
        let effectiveness = Type.allTypes[attack._attack.type]._type.effectiveness[attack._attack.type]
        
        if(!pokemonEffectiveness[attack._attack.type]) {
            pokemonEffectiveness[attack._attack.type] = effectiveness;
        }
    }

    const maxValueEffectiveness = Object.values(pokemonEffectiveness).reduce((lastValue, currentValue) => {
        return currentValue > lastValue ? currentValue : lastValue;
    })

    return Object.fromEntries(Object.entries(pokemonEffectiveness).filter(([type, typeEffectiveness]) => {
        return  typeEffectiveness == maxValueEffectiveness
    }));
}