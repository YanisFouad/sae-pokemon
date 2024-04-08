import pokemon from '../data/pokemon.js';
import generation from '../data/generation.js'
import pokemon_types from '../data/pokemon_type.js'

const urlParams = new URLSearchParams(window.location.search);
let page = urlParams.get('page');
let precButton = document.getElementById('prec');
let suivButton = document.getElementById('suiv');
let numPage = document.getElementById("page");
let precLink = precButton.children[0];
let suivLink = suivButton.children[0];
const firstIndex = page * 25;
const lastIndex = firstIndex + 25;
const tbody = document.getElementById("tbody");

const popup = document.getElementById("pop-up");
const overlay = document.getElementById('overlay');
const closePopupButton = document.getElementById('close-popup');
const popupPokemonName = document.getElementById("popup-pokemon-name");
const popupPokemonId = document.getElementById("popup-pokemon-id");
const popupPokemonGeneration = document.getElementById("popup-pokemon-generation");
const popupPokemonTypes = document.getElementById("popup-pokemon-types");
const popupPokemonEndurance = document.getElementById("popup-pokemon-endurance");
const popupPokemonAttaque = document.getElementById("popup-pokemon-attaque");
const popupPokemonDefence = document.getElementById("popup-pokemon-defence");
const popupPokemonImage = document.getElementById("popup-pokemon-image")

let pokemonNormal = Object.values(pokemon).filter((currentPokemon) => {
    if(currentPokemon.form == "Normal") {
        return currentPokemon;
    }
});

if (!page) {
    page = 0;
}


if(page <= 0) {
    precButton.hidden = true;
    suivLink.href = window.location.href+"?page="+(page+1);
} else {
    suivLink.href = window.location.href.split("?")[0]+"?page="+(parseInt(page)+1);
    precLink.href = window.location.href.split("?")[0]+"?page="+(page-1);
}
if(lastIndex + 1 >= pokemonNormal.length) {
    suivButton.hidden = true;
}
numPage.innerText = parseInt(page) +1;

for (let i = firstIndex ; i < lastIndex ; i++) {
        let tr = document.createElement("tr");

        let tdSta = document.createElement("td");
        tdSta.innerText = pokemonNormal[i].base_stamina;
    
        let tdBa = document.createElement("td");
        tdBa.innerText = pokemonNormal[i].base_attack;
    
        let tdBd = document.createElement("td");
        tdBd.innerText = pokemonNormal[i].base_defense;
    
        let tdType = document.createElement("td");
        pokemonNormal[i].pokemon_type = getType(pokemonNormal[i].pokemon_id);
        tdType.innerText = pokemonNormal[i].pokemon_type;
    
        let tdGen = document.createElement("td");
        pokemonNormal[i].pokemon_generation = getGen(pokemonNormal[i].pokemon_id);
        tdGen.innerText = pokemonNormal[i].pokemon_generation;
    
        let tdName = document.createElement("td");
        tdName.innerText = pokemonNormal[i].pokemon_name;
    
        let tdId = document.createElement("td");
        tdId.innerText = pokemonNormal[i].pokemon_id;
    
        let tdImg = document.createElement("td");
        pokemonNormal[i].pokemon_image = '../webp/images/' + addZero(pokemonNormal[i].pokemon_id.toString()) + '.webp'
        tdImg.innerHTML = `<img src=${pokemonNormal[i].pokemon_image} width = 15%>`;
    
        tr.append(tdId, tdName, tdGen, tdType, tdSta, tdBa, tdBd,tdImg);
        tr.addEventListener("click", (e) => pokemonPopup(pokemonNormal[i], e));
        tr.pokemonId = tdId;

        tbody.appendChild(tr);
}

closePopupButton.addEventListener("click", () => closePopup());
overlay.addEventListener("click", () => closePopup());

function getGen(id) {
    for(const[key,gen] of Object.entries(generation)){
        for(const[key2,poke] of Object.entries(gen)){
            if(poke.id ==id){
                return poke.generation_number;
            }
        }
    }
}

function getType(id) {
    
    for(const[key2,poke] of Object.entries(pokemon_types)){
        if(poke.pokemon_id == id){
            return poke.type.toString();
        }
    }
    
}

function addZero(id) {
    let idZeros;
    if (id.length == 1) {
        idZeros = "00"+id;
    }else if (id.length == 2){
        idZeros = "0"+id;
    }else{
        idZeros = id;
    }
    return idZeros;
}

function pokemonPopup(currentPokemon, e) {
    popupPokemonImage.src = currentPokemon.pokemon_image;
    popupPokemonName.innerText = currentPokemon.pokemon_name;
    popupPokemonId.innerText = currentPokemon.pokemon_id;
    popupPokemonGeneration.innerText = currentPokemon.pokemon_generation;
    popupPokemonEndurance.innerText = currentPokemon.base_stamina;
    popupPokemonDefence.innerText = currentPokemon.base_defense;
    popupPokemonAttaque.innerText = currentPokemon.base_attack;
    popupPokemonTypes.innerText = currentPokemon.pokemon_type;

    overlay.classList.add("active")
    popup.classList.add("active")
}

function closePopup() {
    overlay.classList.remove("active");
    popup.classList.remove("active")
}