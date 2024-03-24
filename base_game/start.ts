import { Rarity, Character, currentPlayer } from "./interfaces";
import { rl, cliProgress, colors, Enquirer, fs } from "./lib";

// fonction pour exporter json
export function getJson(path: string) {
  try {
    const jsonPath = fs.readFileSync(path, { encoding: "utf8", flag: "r" });
    const jsonObject = JSON.parse(jsonPath);

    return jsonObject;
  } catch {
    console.error("Error: Wrong use of the getJson function.");
  }
}

//fonction qui définie le personnage (début)
export function getCharacter(characters: Character[], kindOfChar: string) {
  const rarityProb = getJson("./json/rarity.json");

  const weights: number[] = rarityProb.map((element, index) => {
    return Number(element.probability);
  });

  // calcul des poids cumulées
  let cumulativeWeights: number[] = [];
  for (let i = 0; i < weights.length; i++) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }

  const randomNumber = Math.random();

  //trouve valeur la plus proche en calculant la différence min entre chaque valeur et la valeur recherchée
  const difference: number[] = cumulativeWeights.map((element) => {
    return Math.abs(element - randomNumber);
  });

  // trouve l'indice de la plus petite difference
  const randomIndex: number = difference.indexOf(
    Math.min.apply(Math, difference)
  );

  // trouve l'id de rareté correspondant
  const rarityTier = rarityProb[randomIndex].rarity;

  //Personnage correspondant
  for (let n = 0; n < characters.length; n++) {
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

// fonction pour afficher le player
export function displayPlayer(chosenCharacter: Character) {
  console.log(`You are playing with ${chosenCharacter.name}.`);
  let player: currentPlayer = {
    name: chosenCharacter.name,
    maxhp: chosenCharacter.hp,
    currenthp: chosenCharacter.hp,
    str: chosenCharacter.str,
  };
  return player;
}

// fonction pour afficher l'ennemi
export function displayOpponent(chosenCharacter: Character) {
  console.log(`You encounter a ${chosenCharacter.name}.`);
  const opponentInterface: currentPlayer = {
    name: chosenCharacter.name,
    maxhp: chosenCharacter.hp,
    currenthp: chosenCharacter.hp,
    str: chosenCharacter.str,
  };
  return opponentInterface;
}
