import pokemon from "../data/pokemon.js";
import generation from "../data/generation.js";
import pokemon_types from "../data/pokemon_type.js";

const urlParams = new URLSearchParams(window.location.search);
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
  precLink.hidden = true;
  numPage.innerText = parseInt(page + 1);
}

precLink.addEventListener("click", (e) => {
  e.preventDefault();
  page--;
  console.log(page);
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
  console.log(page);
  firstIndex = page * 25;
  lastIndex = firstIndex + 25;
  console.log(firstIndex, lastIndex, pokemonNormal.length);
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

  overlay.classList.add("active");
  popup.classList.add("active");
}

function closePopup() {
  overlay.classList.remove("active");
  popup.classList.remove("active");
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
  display();
}

function sortDefence(sens) {
  sortDefenceBtn = document.getElementById("sort-defence");
  console.log(sortDefenceBtn.classList.contains("sorted-asc"));
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
  display();
}
