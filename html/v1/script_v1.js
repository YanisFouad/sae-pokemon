import pokemon from '../data/pokemon.js';
import generation from '../data/generation.js'
import pokemon_types from '../data/pokemon_type.js'


const tbody = document.getElementById("tbody");
pokemon.forEach(poke => {
    if (poke.form == "Normal") {
        let tr = document.createElement("tr");

        let tdSta = document.createElement("td");
        tdSta.innerText = poke.base_stamina;
    
        let tdBa = document.createElement("td");
        tdBa.innerText = poke.base_attack;
    
        let tdBd = document.createElement("td");
        tdBd.innerText = poke.base_defense;
    
        let tdType = document.createElement("td");
        tdType.innerText = getType(poke.pokemon_id);
    
        let tdGen = document.createElement("td");
        tdGen.innerText = getGen(poke.pokemon_id);
    
        let tdName = document.createElement("td");
        tdName.innerText = poke.pokemon_name;
    
        let tdId = document.createElement("td");
        tdId.innerText = poke.pokemon_id;
    
        let tdImg = document.createElement("td");
        tdImg.innerHTML ='<img src = "../webp/images/'+addZero(poke.pokemon_id.toString())+'.webp" width = 15%>  </img>';
    
        tr.append(tdId, tdName, tdGen, tdType, tdSta, tdBa, tdBd,tdImg)
        tbody.appendChild(tr);
    }
   
});

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

console.log(addZero("5"));

getGen(5);