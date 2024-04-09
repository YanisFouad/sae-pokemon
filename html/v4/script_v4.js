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

for (let index = 0; index < pokemonNormal.length; index++) {

    pokemonNormal[index].pokemon_generation = getGen(pokemonNormal[index].pokemon_id);
    pokemonNormal[index].pokemon_type = getType(pokemonNormal[index].pokemon_id);
    pokemonNormal[index].pokemon_image = '../webp/thumbnails/' + addZero(pokemonNormal[index].pokemon_id.toString()) + '.webp'

    
}


function display(tabPokemon){
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    for (let i = firstIndex ; i < lastIndex ; i++) {
        let tr = document.createElement("tr");

        let tdSta = document.createElement("td");
        tdSta.innerText = tabPokemon[i].base_stamina;
    
        let tdBa = document.createElement("td");
        tdBa.innerText = tabPokemon[i].base_attack;
    
        let tdBd = document.createElement("td");
        tdBd.innerText = tabPokemon[i].base_defense;
    
        let tdType = document.createElement("td");
        tdType.innerText = tabPokemon[i].pokemon_type.toString();
    
        let tdGen = document.createElement("td");
        tdGen.innerText = tabPokemon[i].pokemon_generation;
    
        let tdName = document.createElement("td");
        tdName.innerText = tabPokemon[i].pokemon_name;
    
        let tdId = document.createElement("td");
        tdId.innerText = addZero(tabPokemon[i].pokemon_id.toString());
    
        let tdImg = document.createElement("td");
        tdImg.innerHTML = `<img src=${tabPokemon[i].pokemon_image}>`;
    
        tr.append(tdId, tdName, tdGen, tdType, tdSta, tdBa, tdBd,tdImg);
        tr.addEventListener("click", (e) => pokemonPopup(tabPokemon[i], e));
        tr.pokemonId = tdId;

        tbody.appendChild(tr);
}
}
display(pokemonNormal);

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
            return poke.type;
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
    popupPokemonId.innerText = "#"+addZero(currentPokemon.pokemon_id.toString());
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

let selectGen = document.getElementById('gen-select');
selectGen.addEventListener("change", (e) => {
    let gen = e.target.value;
    if (gen) {
        filterGen(gen);
    }
})

function filterGen(gen){
    let pokemonGeneration = pokemonNormal.filter((currentPokemon) => {
        if(currentPokemon.pokemon_generation == gen) {
            return currentPokemon;
        }
    });
    display(pokemonGeneration);
}

let selectType = document.getElementById('type-select');
selectType.addEventListener("change", (e) => {
    let type = e.target.value;
    if (type) {
        display(filterType(type));
    }
})

function filterType(type){
    let pokemonType = pokemonNormal.filter((currentPokemon) => {
        for (let index = 0; index < currentPokemon.pokemon_type.length; index++) {
            if(currentPokemon.pokemon_type[index] == type) {
                return currentPokemon;
            }
        }
    });
    return pokemonType;
}

let filterName = document.getElementById('filter-name');
let inputFilterName = document.getElementById('input-filter-name');
filterName.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = inputFilterName.value;
    if (name) {
        display(filterByName(name));
    }
})

function filterByName(name){
    let pokemonName= pokemonNormal.filter((currentPokemon) => {
        if(currentPokemon.pokemon_name.toUpperCase().includes(name.toUpperCase())) {
            return currentPokemon;
        }
    });
    return pokemonName;
}
