import pokemon from "../../JSON/pokemon.js"

export class Pokemon{
    static allPokemons;
    constructor(id,name,form,attack,defense,stamina){
        this._pokemon_id = id,
        this._pokemon_name = name, 
        this._form = form,
        this._base_attack = attack, 
        this._base_defense = defense,
        this._base_stamina = stamina
    }

}

function importPokemon() {
    Pokemon.allPokemons = new Object ();
    pokemon.forEach(poke => {
        if (poke.form == "Normal") {
            let p = new Pokemon(poke.pokemon_id,poke.pokemon_name,poke.form,poke.base_attack,poke.defense,poke.base_stamina);
            Pokemon.allPokemons[p._pokemon_id] = p;
        }
        
    })};

importPokemon();

console.log(Pokemon.allPokemons)