"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayOpponent = exports.displayPlayer = exports.getCharacter = exports.getJson = void 0;
var lib_1 = require("./lib");
// fonction pour exporter json
function getJson(path) {
    try {
        var jsonPath = lib_1.fs.readFileSync(path, { encoding: "utf8", flag: "r" });
        var jsonObject = JSON.parse(jsonPath);
        return jsonObject;
    }
    catch (_a) {
        console.error("Error: Wrong use of the getJson function.");
    }
}
exports.getJson = getJson;
//fonction qui définie le personnage (début)
function getCharacter(characters, kindOfChar) {
    var rarityProb = getJson("./json/rarity.json");
    var weights = rarityProb.map(function (element, index) {
        return Number(element.probability);
    });
    // calcul des poids cumulées
    var cumulativeWeights = [];
    for (var i = 0; i < weights.length; i++) {
        cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
    }
    var randomNumber = Math.random();
    //trouve valeur la plus proche en calculant la différence min entre chaque valeur et la valeur recherchée
    var difference = cumulativeWeights.map(function (element) {
        return Math.abs(element - randomNumber);
    });
    // trouve l'indice de la plus petite difference
    var randomIndex = difference.indexOf(Math.min.apply(Math, difference));
    // trouve l'id de rareté correspondant
    var rarityTier = rarityProb[randomIndex].rarity;
    //Personnage correspondant
    for (var n = 0; n < characters.length; n++) {
        if (characters[n].rarity == rarityTier) {
            switch (kindOfChar) {
                case "player":
                    return displayPlayer(characters[n]);
                case "enemi":
                    return displayOpponent(characters[n]);
                case "boss":
                    return displayOpponent(characters[n]);
            }
        }
    }
}
exports.getCharacter = getCharacter;
// fonction pour afficher le player
function displayPlayer(chosenCharacter) {
    console.log("You are playing with ".concat(chosenCharacter.name, "."));
    var player = {
        name: chosenCharacter.name,
        maxhp: chosenCharacter.hp,
        currenthp: chosenCharacter.hp,
        str: chosenCharacter.str,
    };
    return player;
}
exports.displayPlayer = displayPlayer;
// fonction pour afficher l'ennemi
function displayOpponent(chosenCharacter) {
    console.log("You encounter a ".concat(chosenCharacter.name, "."));
    var opponentInterface = {
        name: chosenCharacter.name,
        maxhp: chosenCharacter.hp,
        currenthp: chosenCharacter.hp,
        str: chosenCharacter.str,
    };
    return opponentInterface;
}
exports.displayOpponent = displayOpponent;
