import {getPokemonsByType, getPokemonsByAttack, sortPokemonsByName, sortPokemonsByStamina, getAttacksByType} from "../data/class_pokemon.js";

let formGetType = document.getElementById('form-get-type');
formGetType.addEventListener("submit", (e) => {
    e.preventDefault()

    let typeName = document.getElementById("get-type").value.toLowerCase()

    if(typeName){
        typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1)
        console.table(getPokemonsByType(typeName))
    }
})

let formGetAttack = document.getElementById('form-get-attack');
formGetAttack.addEventListener("submit", (e) => {
    e.preventDefault()

    let attackName = document.getElementById("get-attack").value

    if(attackName){
        attackName = attackName.charAt(0).toUpperCase() + attackName.slice(1)
        console.table(getPokemonsByAttack(attackName))
    }
})

let formGetAttackByType = document.getElementById('form-get-attack-type');
formGetAttackByType.addEventListener("submit", (e) => {
    e.preventDefault()

    let attackType = document.getElementById("get-attack-type").value.toLowerCase()

    if(attackType){
        attackType = attackType.charAt(0).toUpperCase() + attackType.slice(1)
        console.table(getAttacksByType(attackType))
    }
})

let formSortName = document.getElementById('form-sort-name');
formSortName.addEventListener("submit", (e) => {
    e.preventDefault()
    console.table(sortPokemonsByName())
})

let formSortStamina = document.getElementById('form-sort-stamina');
formSortStamina.addEventListener("submit", (e) => {
    e.preventDefault()
    console.table(sortPokemonsByStamina())
})

console.log(getAttacksByType("Fire"))