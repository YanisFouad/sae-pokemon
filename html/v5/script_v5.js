import pokemon from "../data/pokemon.js";
import generation from "../data/generation.js";
import pokemon_types from "../data/pokemon_type.js";
import pokemon_moves from "../data/pokemon_moves.js";
import fast_moves from "../data/fast_moves.js";
import charged_moves from "../data/charged_moves.js";

let page = 0;
let precLink = document.getElementsByClassName("prec");
let suivLink = document.getElementsByClassName("suiv");
let firstIndex = page * 25;
let lastIndex = firstIndex + 25;
const numPage = document.getElementsByClassName("page");

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

let sortIdBtn = document.getElementById("sort-id");
let sortNameBtn = document.getElementById("sort-name");
let sortGenBtn = document.getElementById("sort-gen");
let sortTypeBtn = document.getElementById("sort-type");
let sortStaminaBtn = document.getElementById("sort-stamina");
let sortAttackBtn = document.getElementById("sort-attack");
let sortDefenceBtn = document.getElementById("sort-defence");

sortIdBtn.addEventListener("click", sortId);
sortNameBtn.addEventListener("click", sortName);
sortGenBtn.addEventListener("click", sortGen);
sortTypeBtn.addEventListener("click", sortType);
sortStaminaBtn.addEventListener("click", sortStamina);
sortAttackBtn.addEventListener("click", sortAttack);
sortDefenceBtn.addEventListener("click", sortDefence);

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
  for(let link of precLink) {
    link.hidden = true;
  }
  for(let indexPage of numPage) {
    indexPage.innerText = parseInt(page + 1);
  }
}

for(let link of precLink) {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    page--;
    if (page == 0) {
      for(let indexPage of numPage) {
        indexPage.innerText = parseInt(page + 1);
      }
      display();
      for(let linkPrec of precLink) {
        linkPrec.hidden = true;
      }
    } else {
      for(let linkSuiv of suivLink) {
        linkSuiv.hidden = false;
      }
      for(let indexPage of numPage) {
        indexPage.innerText = parseInt(page + 1);
      }
      display();
    }
  });
}

for(let link of suivLink) {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    page++;
    firstIndex = page * 25;
    lastIndex = firstIndex + 25;

    if (lastIndex + 1 >= pokemonNormal.length) {
      for(let linkSuiv of suivLink) {
        linkSuiv.hidden = true;
      }
      for(let indexPage of numPage) {
        indexPage.innerText = parseInt(page + 1);
      }
      display();
    } else {
      for(let linkPrec of precLink) {
        linkPrec.hidden = false;
      }
      for(let indexPage of numPage) {
        indexPage.innerText = parseInt(page + 1);
      }
      display();
    }
  });
}

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
function getImageTypes(types){
  let imgTypes ='';
  for (let index = 0; index < types.length; index++) {
    imgTypes += `<img src=../img/Types/${types[index]}.png width= 40% />`;
    if (index == 0 && types.length > 1) {
      imgTypes += `</br>`;
    }
  }
  return imgTypes;
}

display();

////////////////////////////////////////////
/* Affichage des pokemons dans le tableau */
////////////////////////////////////////////

function display() {
  firstIndex = page * 25;
  lastIndex = firstIndex + 25;

  if (page == 0) {
    for(let linkPrec of precLink) {
      linkPrec.hidden = true;
    }
  } else {
    for(let linkSuiv of suivLink) {
      linkSuiv.hidden = false;
    }
  }

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
    tdType.innerHTML = getImageTypes(pokemonNormal[i].pokemon_type);

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

    tdImg.addEventListener("mouseenter", () => {
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
  for(let indexPage of numPage) {
    indexPage.innerText = parseInt(page + 1);
  }
  display();
}

////////////////////////////
/* Trie des pokemons */ ////
//////////////////////////

function sortId(sens) {
  sortIdBtn = document.getElementById("sort-id");
  if (
    sortIdBtn.classList.contains("sorted-asc") ||
    !sortIdBtn.classList.contains("sorted-desc")
  ) {
    sortIdBtn.classList.add("sorted-desc");
    sortIdBtn.classList.remove("sorted-asc");
    pokemonNormal = pokemonNormal.sort((lastPokemon, currentPokemon) => {
      if (lastPokemon.pokemon_id > currentPokemon.pokemon_id) {
        return -1;
      }

      if (lastPokemon.pokemon_id < currentPokemon.pokemon_id) {
        return 1;
      }

      return 0;
    });
  } else {
    sortIdBtn.classList.remove("sorted-desc");
    sortIdBtn.classList.add("sorted-asc");
    pokemonNormal = pokemonNormal.sort((lastPokemon, currentPokemon) => {
      if (lastPokemon.pokemon_id < currentPokemon.pokemon_id) {
        return -1;
      }

      if (lastPokemon.pokemon_id > currentPokemon.pokemon_id) {
        return 1;
      }
      return 0;
    });
  }

  page = 0;
  for(let indexPage of numPage) {
    indexPage.innerText = parseInt(page + 1);
  }
  display();
}

function sortName(sens) {
  sortNameBtn = document.getElementById("sort-name");
  if (
    sortNameBtn.classList.contains("sorted-asc") ||
    !sortNameBtn.classList.contains("sorted-desc")
  ) {
    sortNameBtn.classList.add("sorted-desc");
    sortNameBtn.classList.remove("sorted-asc");
    pokemonNormal = pokemonNormal.sort((lastPokemon, currentPokemon) => {
      if (lastPokemon.pokemon_name > currentPokemon.pokemon_name) {
        return -1;
      }

      if (lastPokemon.pokemon_name < currentPokemon.pokemon_name) {
        return 1;
      }

      return 0;
    });
  } else {
    sortNameBtn.classList.add("sorted-asc");
    sortNameBtn.classList.remove("sorted-desc");
    pokemonNormal = pokemonNormal.sort((lastPokemon, currentPokemon) => {
      if (lastPokemon.pokemon_name < currentPokemon.pokemon_name) {
        return -1;
      }

      if (lastPokemon.pokemon_name > currentPokemon.pokemon_name) {
        return 1;
      }
      return 0;
    });
  }

  page = 0;
  for(let indexPage of numPage) {
    indexPage.innerText = parseInt(page + 1);
  }
  display();
}

function sortGen(sens) {
  sortGenBtn = document.getElementById("sort-gen");
  if (
    sortGenBtn.classList.contains("sorted-asc") ||
    !sortGenBtn.classList.contains("sorted-desc")
  ) {
    sortGenBtn.classList.remove("sorted-asc");
    sortGenBtn.classList.add("sorted-desc");
    pokemonNormal = pokemonNormal.sort((lastPokemon, currentPokemon) => {
      if (lastPokemon.pokemon_generation > currentPokemon.pokemon_generation) {
        return -1;
      }

      if (lastPokemon.pokemon_generation < currentPokemon.pokemon_generation) {
        return 1;
      }

      return 0;
    });
  } else {
    sortGenBtn.classList.add("sorted-asc");
    sortGenBtn.classList.remove("sorted-desc");
    pokemonNormal = pokemonNormal.sort((lastPokemon, currentPokemon) => {
      if (lastPokemon.pokemon_generation < currentPokemon.pokemon_generation) {
        return -1;
      }

      if (lastPokemon.pokemon_generation > currentPokemon.pokemon_generation) {
        return 1;
      }
      return 0;
    });
  }
  page = 0;
  for(let indexPage of numPage) {
    indexPage.innerText = parseInt(page + 1);
  }
  display();
}

function sortStamina(sens) {
  sortStaminaBtn = document.getElementById("sort-stamina");
  if (
    sortStaminaBtn.classList.contains("sorted-asc") ||
    !sortStaminaBtn.classList.contains("sorted-desc")
  ) {
    sortStaminaBtn.classList.remove("sorted-asc");
    sortStaminaBtn.classList.add("sorted-desc");
    pokemonNormal = pokemonNormal.sort((lastPokemon, currentPokemon) => {
      if (lastPokemon.base_stamina > currentPokemon.base_stamina) {
        return -1;
      }

      if (lastPokemon.base_stamina < currentPokemon.base_stamina) {
        return 1;
      }

      return 0;
    });
  } else {
    sortStaminaBtn.classList.add("sorted-asc");
    sortStaminaBtn.classList.remove("sorted-desc");
    pokemonNormal = pokemonNormal.sort((lastPokemon, currentPokemon) => {
      if (lastPokemon.base_stamina < currentPokemon.base_stamina) {
        return -1;
      }

      if (lastPokemon.base_stamina > currentPokemon.base_stamina) {
        return 1;
      }
      return 0;
    });
  }
  page = 0;
  for(let indexPage of numPage) {
    indexPage.innerText = parseInt(page + 1);
  }
  display();
}

function sortAttack(sens) {
  sortAttackBtn = document.getElementById("sort-attack");
  if (
    sortAttackBtn.classList.contains("sorted-asc") ||
    !sortAttackBtn.classList.contains("sorted-desc")
  ) {
    sortAttackBtn.classList.remove("sorted-asc");
    sortAttackBtn.classList.add("sorted-desc");
    pokemonNormal = pokemonNormal.sort((lastPokemon, currentPokemon) => {
      if (lastPokemon.base_attack > currentPokemon.base_attack) {
        return -1;
      }

      if (lastPokemon.base_attack < currentPokemon.base_attack) {
        return 1;
      }

      return 0;
    });
  } else {
    sortAttackBtn.classList.add("sorted-asc");
    sortAttackBtn.classList.remove("sorted-desc");
    pokemonNormal = pokemonNormal.sort((lastPokemon, currentPokemon) => {
      if (lastPokemon.base_attack < currentPokemon.base_attack) {
        return -1;
      }

      if (lastPokemon.base_attack > currentPokemon.base_attack) {
        return 1;
      }
      return 0;
    });
  }
  page = 0;
  for(let indexPage of numPage) {
    indexPage.innerText = parseInt(page + 1);
  }
  display();
}

function sortDefence(sens) {
  sortDefenceBtn = document.getElementById("sort-defence");
  if (
    sortDefenceBtn.classList.contains("sorted-asc") ||
    !sortDefenceBtn.classList.contains("sorted-desc")
  ) {
    sortDefenceBtn.classList.remove("sorted-asc");
    sortDefenceBtn.classList.add("sorted-desc");
    pokemonNormal = pokemonNormal.sort((lastPokemon, currentPokemon) => {
      if (lastPokemon.base_defense > currentPokemon.base_defense) {
        return -1;
      }

      if (lastPokemon.base_defense < currentPokemon.base_defense) {
        return 1;
      }

      return 0;
    });
  } else {
    sortDefenceBtn.classList.add("sorted-asc");
    sortDefenceBtn.classList.remove("sorted-desc");
    pokemonNormal = pokemonNormal.sort((lastPokemon, currentPokemon) => {
      if (lastPokemon.base_defense < currentPokemon.base_defense) {
        return -1;
      }

      if (lastPokemon.base_defense > currentPokemon.base_defense) {
        return 1;
      }
      return 0;
    });
  }
  page = 0;
  for(let indexPage of numPage) {
    indexPage.innerText = parseInt(page + 1);
  }
  display();
}

function sortType(sens) {
  sortTypeBtn = document.getElementById("sort-type");
  if (
    sortTypeBtn.classList.contains("sorted-asc") ||
    !sortTypeBtn.classList.contains("sorted-desc")
  ) {
    sortTypeBtn.classList.add("sorted-desc");
    sortTypeBtn.classList.remove("sorted-asc");
    pokemonNormal = pokemonNormal.sort((lastPokemon, currentPokemon) => {
      if (
        lastPokemon.pokemon_type.toString() >
        currentPokemon.pokemon_type.toString()
      ) {
        return -1;
      }

      if (
        lastPokemon.pokemon_type.toString() <
        currentPokemon.pokemon_type.toString()
      ) {
        return 1;
      }

      return 0;
    });
  } else {
    sortTypeBtn.classList.add("sorted-asc");
    sortTypeBtn.classList.remove("sorted-desc");
    pokemonNormal = pokemonNormal.sort((lastPokemon, currentPokemon) => {
      if (
        lastPokemon.pokemon_type.toString() <
        currentPokemon.pokemon_type.toString()
      ) {
        return -1;
      }
      
      if (
        lastPokemon.pokemon_type.toString() >
        currentPokemon.pokemon_type.toString()
      ) {
        return 1;
      }
      return 0;
    });
  }

  page = 0;
  for(let indexPage of numPage) {
    indexPage.innerText = parseInt(page + 1);
  }
  display();
}
