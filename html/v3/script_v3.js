import pokemon from '../data/pokemon.js';
import generation from '../data/generation.js'
import pokemon_types from '../data/pokemon_type.js'

let pokemonNormal = Object.values(pokemon).filter((currentPokemon) => {
    if(currentPokemon.form == "Normal") {
        return currentPokemon;
    }
});

console.log(pokemonNormal);

const urlParams = new URLSearchParams(window.location.search);
let page = urlParams.get('page');
let precButton = document.getElementById('prec');
let suivButton = document.getElementById('suiv');
let numPage = document.getElementById("page");
let precLink = precButton.children[0];
let suivLink = suivButton.children[0];
let popup = document.getElementById("pop-up");


if (!page) {
    page = 0;
}
const firstIndex = page * 25;
const lastIndex = firstIndex + 25;

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
const tbody = document.getElementById("tbody");
console.log(firstIndex, lastIndex);
for (let i = firstIndex ; i < lastIndex ; i++) {
    // console.log(i);
        let tr = document.createElement("tr");

        let tdSta = document.createElement("td");
        tdSta.innerText = pokemonNormal[i].base_stamina;
    
        let tdBa = document.createElement("td");
        tdBa.innerText = pokemonNormal[i].base_attack;
    
        let tdBd = document.createElement("td");
        tdBd.innerText = pokemonNormal[i].base_defense;
    
        let tdType = document.createElement("td");
        tdType.innerText = getType(pokemonNormal[i].pokemon_id);
    
        let tdGen = document.createElement("td");
        tdGen.innerText = getGen(pokemonNormal[i].pokemon_id);
    
        let tdName = document.createElement("td");
        tdName.innerText = pokemonNormal[i].pokemon_name;
    
        let tdId = document.createElement("td");
        tdId.innerText = pokemonNormal[i].pokemon_id;
    
        let tdImg = document.createElement("td");
        tdImg.innerHTML ='<img src = "../webp/images/'+addZero(pokemonNormal[i].pokemon_id.toString())+'.webp" width = 15%>  </img>';
    
        tr.append(tdId, tdName, tdGen, tdType, tdSta, tdBa, tdBd,tdImg);
        tr.addEventListener("click", (e) => pokemonPopup(e));

        tbody.appendChild(tr);
}


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

function pokemonPopup(e) {
    console.log(e);
    popup.style.display = "block";

}

