//Returns a JSON dict where each key is the attacking type and the value is a dict of defender types and the damage multiplier.
// PoGoAPI.net/api/v1/type_effectiveness.json
let type_effectiveness = {
    "Bug": {
        "Bug": 1.0,
        "Dark": 1.6,
        "Dragon": 1.0,
        "Electric": 1.0,
        "Fairy": 0.625,
        "Fighting": 0.625,
        "Fire": 0.625,
        "Flying": 0.625,
        "Ghost": 0.625,
        "Grass": 1.6,
        "Ground": 1.0,
        "Ice": 1.0,
        "Normal": 1.0,
        "Poison": 0.625,
        "Psychic": 1.6,
        "Rock": 1.0,
        "Steel": 0.625,
        "Water": 1.0
    },
    "Dark": {
        "Bug": 1.0,
        "Dark": 0.625,
        "Dragon": 1.0,
        "Electric": 1.0,
        "Fairy": 0.625,
        "Fighting": 0.625,
        "Fire": 1.0,
        "Flying": 1.0,
        "Ghost": 1.6,
        "Grass": 1.0,
        "Ground": 1.0,
        "Ice": 1.0,
        "Normal": 1.0,
        "Poison": 1.0,
        "Psychic": 1.6,
        "Rock": 1.0,
        "Steel": 1.0,
        "Water": 1.0
    },
    "Dragon": {
        "Bug": 1.0,
        "Dark": 1.0,
        "Dragon": 1.6,
        "Electric": 1.0,
        "Fairy": 0.390625,
        "Fighting": 1.0,
        "Fire": 1.0,
        "Flying": 1.0,
        "Ghost": 1.0,
        "Grass": 1.0,
        "Ground": 1.0,
        "Ice": 1.0,
        "Normal": 1.0,
        "Poison": 1.0,
        "Psychic": 1.0,
        "Rock": 1.0,
        "Steel": 0.625,
        "Water": 1.0
    },
    "Electric": {
        "Bug": 1.0,
        "Dark": 1.0,
        "Dragon": 0.625,
        "Electric": 0.625,
        "Fairy": 1.0,
        "Fighting": 1.0,
        "Fire": 1.0,
        "Flying": 1.6,
        "Ghost": 1.0,
        "Grass": 0.625,
        "Ground": 0.390625,
        "Ice": 1.0,
        "Normal": 1.0,
        "Poison": 1.0,
        "Psychic": 1.0,
        "Rock": 1.0,
        "Steel": 1.0,
        "Water": 1.6
    },
    "Fairy": {
        "Bug": 1.0,
        "Dark": 1.6,
        "Dragon": 1.6,
        "Electric": 1.0,
        "Fairy": 1.0,
        "Fighting": 1.6,
        "Fire": 0.625,
        "Flying": 1.0,
        "Ghost": 1.0,
        "Grass": 1.0,
        "Ground": 1.0,
        "Ice": 1.0,
        "Normal": 1.0,
        "Poison": 0.625,
        "Psychic": 1.0,
        "Rock": 1.0,
        "Steel": 0.625,
        "Water": 1.0
    },
    "Fighting": {
        "Bug": 0.625,
        "Dark": 1.6,
        "Dragon": 1.0,
        "Electric": 1.0,
        "Fairy": 0.625,
        "Fighting": 1.0,
        "Fire": 1.0,
        "Flying": 0.625,
        "Ghost": 0.390625,
        "Grass": 1.0,
        "Ground": 1.0,
        "Ice": 1.6,
        "Normal": 1.6,
        "Poison": 0.625,
        "Psychic": 0.625,
        "Rock": 1.6,
        "Steel": 1.6,
        "Water": 1.0
    },
    "Fire": {
        "Bug": 1.6,
        "Dark": 1.0,
        "Dragon": 0.625,
        "Electric": 1.0,
        "Fairy": 1.0,
        "Fighting": 1.0,
        "Fire": 0.625,
        "Flying": 1.0,
        "Ghost": 1.0,
        "Grass": 1.6,
        "Ground": 1.0,
        "Ice": 1.6,
        "Normal": 1.0,
        "Poison": 1.0,
        "Psychic": 1.0,
        "Rock": 0.625,
        "Steel": 1.6,
        "Water": 0.625
    },
    "Flying": {
        "Bug": 1.6,
        "Dark": 1.0,
        "Dragon": 1.0,
        "Electric": 0.625,
        "Fairy": 1.0,
        "Fighting": 1.6,
        "Fire": 1.0,
        "Flying": 1.0,
        "Ghost": 1.0,
        "Grass": 1.6,
        "Ground": 1.0,
        "Ice": 1.0,
        "Normal": 1.0,
        "Poison": 1.0,
        "Psychic": 1.0,
        "Rock": 0.625,
        "Steel": 0.625,
        "Water": 1.0
    },
    "Ghost": {
        "Bug": 1.0,
        "Dark": 0.625,
        "Dragon": 1.0,
        "Electric": 1.0,
        "Fairy": 1.0,
        "Fighting": 1.0,
        "Fire": 1.0,
        "Flying": 1.0,
        "Ghost": 1.6,
        "Grass": 1.0,
        "Ground": 1.0,
        "Ice": 1.0,
        "Normal": 0.390625,
        "Poison": 1.0,
        "Psychic": 1.6,
        "Rock": 1.0,
        "Steel": 1.0,
        "Water": 1.0
    },
    "Grass": {
        "Bug": 0.625,
        "Dark": 1.0,
        "Dragon": 0.625,
        "Electric": 1.0,
        "Fairy": 1.0,
        "Fighting": 1.0,
        "Fire": 0.625,
        "Flying": 0.625,
        "Ghost": 1.0,
        "Grass": 0.625,
        "Ground": 1.6,
        "Ice": 1.0,
        "Normal": 1.0,
        "Poison": 0.625,
        "Psychic": 1.0,
        "Rock": 1.6,
        "Steel": 0.625,
        "Water": 1.6
    },
    "Ground": {
        "Bug": 0.625,
        "Dark": 1.0,
        "Dragon": 1.0,
        "Electric": 1.6,
        "Fairy": 1.0,
        "Fighting": 1.0,
        "Fire": 1.6,
        "Flying": 0.390625,
        "Ghost": 1.0,
        "Grass": 0.625,
        "Ground": 1.0,
        "Ice": 1.0,
        "Normal": 1.0,
        "Poison": 1.6,
        "Psychic": 1.0,
        "Rock": 1.6,
        "Steel": 1.6,
        "Water": 1.0
    },
    "Ice": {
        "Bug": 1.0,
        "Dark": 1.0,
        "Dragon": 1.6,
        "Electric": 1.0,
        "Fairy": 1.0,
        "Fighting": 1.0,
        "Fire": 0.625,
        "Flying": 1.6,
        "Ghost": 1.0,
        "Grass": 1.6,
        "Ground": 1.6,
        "Ice": 0.625,
        "Normal": 1.0,
        "Poison": 1.0,
        "Psychic": 1.0,
        "Rock": 1.0,
        "Steel": 0.625,
        "Water": 0.625
    },
    "Normal": {
        "Bug": 1.0,
        "Dark": 1.0,
        "Dragon": 1.0,
        "Electric": 1.0,
        "Fairy": 1.0,
        "Fighting": 1.0,
        "Fire": 1.0,
        "Flying": 1.0,
        "Ghost": 0.390625,
        "Grass": 1.0,
        "Ground": 1.0,
        "Ice": 1.0,
        "Normal": 1.0,
        "Poison": 1.0,
        "Psychic": 1.0,
        "Rock": 0.625,
        "Steel": 0.625,
        "Water": 1.0
    },
    "Poison": {
        "Bug": 1.0,
        "Dark": 1.0,
        "Dragon": 1.0,
        "Electric": 1.0,
        "Fairy": 1.6,
        "Fighting": 1.0,
        "Fire": 1.0,
        "Flying": 1.0,
        "Ghost": 0.625,
        "Grass": 1.6,
        "Ground": 0.625,
        "Ice": 1.0,
        "Normal": 1.0,
        "Poison": 0.625,
        "Psychic": 1.0,
        "Rock": 0.625,
        "Steel": 0.390625,
        "Water": 1.0
    },
    "Psychic": {
        "Bug": 1.0,
        "Dark": 0.390625,
        "Dragon": 1.0,
        "Electric": 1.0,
        "Fairy": 1.0,
        "Fighting": 1.6,
        "Fire": 1.0,
        "Flying": 1.0,
        "Ghost": 1.0,
        "Grass": 1.0,
        "Ground": 1.0,
        "Ice": 1.0,
        "Normal": 1.0,
        "Poison": 1.6,
        "Psychic": 0.625,
        "Rock": 1.0,
        "Steel": 0.625,
        "Water": 1.0
    },
    "Rock": {
        "Bug": 1.6,
        "Dark": 1.0,
        "Dragon": 1.0,
        "Electric": 1.0,
        "Fairy": 1.0,
        "Fighting": 0.625,
        "Fire": 1.6,
        "Flying": 1.6,
        "Ghost": 1.0,
        "Grass": 1.0,
        "Ground": 0.625,
        "Ice": 1.6,
        "Normal": 1.0,
        "Poison": 1.0,
        "Psychic": 1.0,
        "Rock": 1.0,
        "Steel": 0.625,
        "Water": 1.0
    },
    "Steel": {
        "Bug": 1.0,
        "Dark": 1.0,
        "Dragon": 1.0,
        "Electric": 0.625,
        "Fairy": 1.6,
        "Fighting": 1.0,
        "Fire": 0.625,
        "Flying": 1.0,
        "Ghost": 1.0,
        "Grass": 1.0,
        "Ground": 1.0,
        "Ice": 1.6,
        "Normal": 1.0,
        "Poison": 1.0,
        "Psychic": 1.0,
        "Rock": 1.6,
        "Steel": 0.625,
        "Water": 0.625
    },
    "Water": {
        "Bug": 1.0,
        "Dark": 1.0,
        "Dragon": 0.625,
        "Electric": 1.0,
        "Fairy": 1.0,
        "Fighting": 1.0,
        "Fire": 1.6,
        "Flying": 1.0,
        "Ghost": 1.0,
        "Grass": 0.625,
        "Ground": 1.6,
        "Ice": 1.0,
        "Normal": 1.0,
        "Poison": 1.0,
        "Psychic": 1.0,
        "Rock": 1.6,
        "Steel": 1.0,
        "Water": 0.625
    }
}

export default type_effectiveness;