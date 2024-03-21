import {getPokemonsByType, getPokemonsByAttack, sortPokemonsByName, sortPokemonsByStamina, getAttacksByType, getWeakestEnemies, getBestAttackTypesForEnemy, Pokemon} from "../data/class_pokemon.js";

let submitGetType = document.getElementById('submit-get-type');
submitGetType.addEventListener("click", (e) => {
    e.preventDefault()

    let typeName = document.getElementById("get-type").value.toLowerCase()

    if(typeName){
        typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1)
        console.table(getPokemonsByType(typeName))
    }
})

let submitGetAttackByType = document.getElementById('submit-get-attack-type');
submitGetAttackByType.addEventListener("click", (e) => {
    e.preventDefault()

    let attackType = document.getElementById("get-type").value.toLowerCase()

    if(attackType){
        attackType = attackType.charAt(0).toUpperCase() + attackType.slice(1)
        console.table(getAttacksByType(attackType))
    }
})

let submitGetAttack = document.getElementById('submit-get-attack');
submitGetAttack.addEventListener("click", (e) => {
    e.preventDefault()

    let attackName = document.getElementById("get-attack").value.toLowerCase()

    if(attackName){
        attackName = attackName.charAt(0).toUpperCase() + attackName.slice(1)
        console.table(getPokemonsByAttack(attackName))
    }
})
let submitGetWeakest = document.getElementById('submit-get-weakest');
submitGetWeakest.addEventListener("click", (e) => {
    e.preventDefault()

    let attackName = document.getElementById("get-attack").value.toLowerCase()

    if(attackName){
        attackName = attackName.charAt(0).toUpperCase() + attackName.slice(1)
        console.table(getWeakestEnemies(attackName))
    }
})

let submitBestAttackType = document.getElementById('submit-best-attack');
submitBestAttackType.addEventListener("click", (e) => {
    e.preventDefault()

    let name = document.getElementById("get-name").value.toLowerCase()

    if(name){
        name = name.charAt(0).toUpperCase() + name.slice(1)
        console.table(getBestAttackTypesForEnemy(name))
    }
})

let submitSortName = document.getElementById('submit-sort-name');
submitSortName.addEventListener("click", (e) => {
    e.preventDefault()
    console.table(sortPokemonsByName())
})

let submitSortStamina = document.getElementById('submit-sort-stamina');
submitSortStamina.addEventListener("click", (e) => {
    e.preventDefault()
    console.table(sortPokemonsByStamina())
})

let pokemon = Pokemon.allPokemons[4].toString();

console.log(pokemon)

console.log(getAttacksByType("Fire"))