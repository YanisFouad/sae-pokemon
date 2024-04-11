import pokemon from "../data/pokemon.js";
import generation from "../data/generation.js";
import pokemon_types from "../data/pokemon_type.js";
import pokemon_moves from "../data/pokemon_moves.js";
import fast_moves from "../data/fast_moves.js";
import charged_moves from "../data/charged_moves.js";

let page = 0;
let precLink = document.getElementById("prec");
let suivLink = document.getElementById("suiv");
let firstIndex = page * 25;
let lastIndex = firstIndex + 25;
const numPage = document.getElementById("page");

const tbody = document.getElementById("tbody");

const popup = document.getElementById("pop-up");
const overlay = document.getElementById("overlay");
const closePopupButton = document.getElementById("close-popup");
const popupPokemonName = document.getElementById("popup-pokemon-name");
const popupPokemonId = document.getElementById("popup-pokemon-id");
const popupPokemonGeneration = document.getElementById(
  "popup-pokemon-generation"
);
const popupPokemonTypes = document.getElementById("popup-pokemon-types");
const popupPokemonEndurance = document.getElementById(
  "popup-pokemon-endurance"
);
const popupPokemonAttaque = document.getElementById("popup-pokemon-attaque");
const popupPokemonDefence = document.getElementById("popup-pokemon-defence");
const popupPokemonImage = document.getElementById("popup-pokemon-image");


// Initialisation des pokemons
let pokemonNormal = Object.values(pokemon).filter((currentPokemon) => {
  if (currentPokemon.form == "Normal") {
    return currentPokemon;
  }
});

////////////////////////////////////////////
/* Pagination des pokemons */
////////////////////////////////////////////

if (page <= 0) {
  precLink.hidden = true;
  numPage.innerText = parseInt(page + 1);
}

precLink.addEventListener("click", (e) => {
  e.preventDefault();
  page--;
  if (page == 0) {
    numPage.innerText = parseInt(page + 1);
    display();
    precLink.hidden = true;
  } else {
    suivLink.hidden = false;
    numPage.innerText = parseInt(page + 1);
    display();
  }
});

suivLink.addEventListener("click", (e) => {
  e.preventDefault();
  page++;
  firstIndex = page * 25;
  lastIndex = firstIndex + 25;
  if (lastIndex + 1 >= pokemonNormal.length) {
    suivLink.hidden = true;
    numPage.innerText = parseInt(page + 1);
    display();
  } else {
    precLink.hidden = false;
    numPage.innerText = parseInt(page + 1);
    display();
  }
});

// Ajout des variables manquantes dans nos pokemons
for (let index = 0; index < pokemonNormal.length; index++) {
  pokemonNormal[index].pokemon_generation = getGen(
    pokemonNormal[index].pokemon_id
  );
  pokemonNormal[index].pokemon_type = getType(pokemonNormal[index].pokemon_id);
  pokemonNormal[index].pokemon_imageptt =
    "../webp/thumbnails/" +
    addZero(pokemonNormal[index].pokemon_id.toString()) +
    ".webp";
  pokemonNormal[index].pokemon_imagegrd =
    "../webp/images/" +
    addZero(pokemonNormal[index].pokemon_id.toString()) +
    ".webp";

    const pokeAttack = pokemon_moves.filter((attack) => {
      if (attack.pokemon_id == pokemonNormal[index].pokemon_id) {
        return attack;
      }
    })[0];
  
    pokemonNormal[index].fast_attack = [...fast_moves.filter((attack) => {
      if(pokeAttack.fast_moves.find((attackName) => {return attackName == attack.name;})){
        return attack;
      }
    })];
  
    pokemonNormal[index].charged_attack = [...charged_moves.filter((attack) => {
      if(pokeAttack.charged_moves.find((attackName) => {return attackName == attack.name;})){
        return attack;
      }
    })];
}

display();

////////////////////////////////////////////
/* Affichage des pokemons dans le tableau */
////////////////////////////////////////////

function display() {
  firstIndex = page * 25;
  lastIndex = firstIndex + 25;

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  for (let i = firstIndex; i < lastIndex; i++) {
    let tr = document.createElement("tr");

    let tdSta = document.createElement("td");
    tdSta.innerText = pokemonNormal[i].base_stamina;

    let tdBa = document.createElement("td");
    tdBa.innerText = pokemonNormal[i].base_attack;

    let tdBd = document.createElement("td");
    tdBd.innerText = pokemonNormal[i].base_defense;

    let tdType = document.createElement("td");
    tdType.innerText = pokemonNormal[i].pokemon_type.toString();

    let tdGen = document.createElement("td");
    tdGen.innerText = pokemonNormal[i].pokemon_generation;

    let tdName = document.createElement("td");
    tdName.innerText = pokemonNormal[i].pokemon_name;

    let tdId = document.createElement("td");
    tdId.innerText = addZero(pokemonNormal[i].pokemon_id.toString());

    let tdImg = document.createElement("td");
    tdImg.innerHTML = `<img src=${pokemonNormal[i].pokemon_imageptt}>`;

    tr.append(tdId, tdName, tdGen, tdType, tdSta, tdBa, tdBd, tdImg);
    tr.addEventListener("click", (e) => pokemonPopup(pokemonNormal[i], e));
    tr.pokemonId = tdId;

    tdImg.addEventListener("mouseover", () => {
      tdImg.innerHTML = `<img src=${pokemonNormal[i].pokemon_imagegrd}>`;
    });

    tdImg.addEventListener("mouseleave", () => {
      tdImg.innerHTML = `<img src=${pokemonNormal[i].pokemon_imageptt}>`;
    });

    tbody.appendChild(tr);
  }
}

function getGen(id) {
  for (const [key, gen] of Object.entries(generation)) {
    for (const [key2, poke] of Object.entries(gen)) {
      if (poke.id == id) {
        return poke.generation_number;
      }
    }
  }
}

function getType(id) {
  for (const [key2, poke] of Object.entries(pokemon_types)) {
    if (poke.pokemon_id == id) {
      return poke.type;
    }
  }
}

// Convertie l'id d'un pokemon en un id à 3 chiffres
function addZero(id) {
  let idZeros;
  if (id.length == 1) {
    idZeros = "00" + id;
  } else if (id.length == 2) {
    idZeros = "0" + id;
  } else {
    idZeros = id;
  }
  return idZeros;
}

///////////////////////////////
/* Popup détail d'un pokemon */
///////////////////////////////
closePopupButton.addEventListener("click", () => closePopup());
overlay.addEventListener("click", () => closePopup());

function pokemonPopup(currentPokemon, e) {
  popupPokemonImage.src = currentPokemon.pokemon_imagegrd;
  popupPokemonName.innerText = currentPokemon.pokemon_name;
  popupPokemonId.innerText =
    "#" + addZero(currentPokemon.pokemon_id.toString());
  popupPokemonGeneration.innerText = currentPokemon.pokemon_generation;
  popupPokemonEndurance.innerText = currentPokemon.base_stamina;
  popupPokemonDefence.innerText = currentPokemon.base_defense;
  popupPokemonAttaque.innerText = currentPokemon.base_attack;
  popupPokemonTypes.innerText = currentPokemon.pokemon_type;

  const tableFastAttack = document.getElementById('table-fast-attack')
  const tbodyFastAttack = tableFastAttack.querySelector("tbody");

  currentPokemon.fast_attack.forEach(attack => {
    let trBody = document.createElement("tr");
    let tdDurationBody = document.createElement("td");
    let tdEnergyDeltaBody = document.createElement("td");
    let tdMoveIdBody = document.createElement("td");
    let tdNameBody = document.createElement("td");
    let tdPowerBody = document.createElement("td");
    let tdStaminaLossScalerBody = document.createElement("td");
    let tdTypeBody = document.createElement("td");
    tdDurationBody.innerText = attack.duration;
    tdEnergyDeltaBody.innerText = attack.energy_delta;
    tdMoveIdBody.innerText = attack.move_id;
    tdNameBody.innerText = attack.name;
    tdPowerBody.innerText = attack.power;
    tdStaminaLossScalerBody.innerText = attack.stamina_loss_scaler;
    tdTypeBody.innerText = attack.type;

    trBody.append(tdMoveIdBody, tdNameBody, tdPowerBody, tdTypeBody, tdStaminaLossScalerBody, tdDurationBody, tdEnergyDeltaBody);
    tbodyFastAttack.append(trBody);
  });

  const tableChargedAttack = document.getElementById('table-charged-attack')
  const tbodyChargedAttack = tableChargedAttack.querySelector("tbody");
  currentPokemon.charged_attack.forEach(attack => {
    let trBody = document.createElement("tr");
    let tdDurationBody = document.createElement("td");
    let tdEnergyDeltaBody = document.createElement("td");
    let tdMoveIdBody = document.createElement("td");
    let tdNameBody = document.createElement("td");
    let tdPowerBody = document.createElement("td");
    let tdStaminaLossScalerBody = document.createElement("td");
    let tdTypeBody = document.createElement("td");
    tdDurationBody.innerText = attack.duration;
    tdEnergyDeltaBody.innerText = attack.energy_delta;
    tdMoveIdBody.innerText = attack.move_id;
    tdNameBody.innerText = attack.name;
    tdPowerBody.innerText = attack.power;
    tdStaminaLossScalerBody.innerText = attack.stamina_loss_scaler;
    tdTypeBody.innerText = attack.type;

    trBody.append(tdMoveIdBody, tdNameBody, tdPowerBody, tdTypeBody, tdStaminaLossScalerBody, tdDurationBody, tdEnergyDeltaBody);
    tbodyChargedAttack.append(trBody);
  });

  overlay.classList.add("active");
  popup.classList.add("active");
}

function closePopup() {
  overlay.classList.remove("active");
  popup.classList.remove("active");

  const tableChargedAttack = document.getElementById('table-charged-attack')
  const tbodyChargedAttack = tableChargedAttack.querySelector("tbody");

  const tableFastAttack = document.getElementById('table-fast-attack')
  const tbodyFastAttack = tableFastAttack.querySelector("tbody");

  tbodyFastAttack.innerHTML = "";
  tbodyChargedAttack.innerHTML = "";

}


////////////////////////////
/* Filtrage des pokemons */
//////////////////////////

const selectGen = document.getElementById("gen-select");
const selectType = document.getElementById("type-select");
const inputFilterName = document.getElementById("input-filter-name");

selectGen.addEventListener("change", () => updatePokemonFilter());
selectType.addEventListener("change", () => updatePokemonFilter());
inputFilterName.addEventListener("input", () => updatePokemonFilter());

function filterGen(poke, gen) {
  return poke.filter((currentPokemon) => {
    if (gen != 0) {
      if (currentPokemon.pokemon_generation == gen) {
        return currentPokemon;
      }
    } else {
      return currentPokemon;
    }
  });
}

function filterType(poke, type) {
  return poke.filter((currentPokemon) => {
    if (type != 0) {
      for (let index = 0; index < currentPokemon.pokemon_type.length; index++) {
        if (currentPokemon.pokemon_type[index] == type) {
          return currentPokemon;
        }
      }
    } else {
      return currentPokemon;
    }
  });
}

function filterByName(poke, name) {
  return poke.filter((currentPokemon) => {
    if (name) {
      if (
        currentPokemon.pokemon_name.toUpperCase().includes(name.toUpperCase())
      ) {
        return currentPokemon;
      }
    } else {
      return currentPokemon;
    }
  });
}

function updatePokemonFilter() {
  pokemonNormal = Object.values(pokemon).filter((currentPokemon) => {
    if (currentPokemon.form == "Normal") {
      return currentPokemon;
    }
  });

  pokemonNormal = filterGen(pokemonNormal, selectGen.value);
  pokemonNormal = filterType(pokemonNormal, selectType.value);
  pokemonNormal = filterByName(pokemonNormal, inputFilterName.value);
  page = 0;
  display();
}
