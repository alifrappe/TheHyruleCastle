import { Rarity, Character, currentPlayer } from "./interfaces";
import { getAction, attack, heal, opponentAttack, displayHP } from "./action";
import { getJson, getCharacter } from "./start";
import { figlet, colors } from "./lib";
import {
  difficultMode,
  difficultyType,
  insaneMode,
} from "../basic_game_customisation/basic_game_customisation";

// fonction pour initialiser le niveau avec boss
export function initBoss(mode) {
  const characters: Character[] = getJson("./json/players.json");
  const boss: Character[] = getJson("./json/bosses.json");

  let listOfFighters: currentPlayer[] = [];
  const player = getCharacter(characters, "player");
  const opponent = getCharacter(boss, "boss");

  if (player) {
    listOfFighters.push(player);
  } // get random character
  if (opponent) {
    listOfFighters.push(opponent);
  } // get random opponent

  if (mode === "Difficult") {
    listOfFighters = difficultMode(listOfFighters);
  } else if (mode === "Insane") {
    listOfFighters = difficultMode(listOfFighters);
  }

  return listOfFighters;
}

//
export async function displayBoss(listOfFighters: currentPlayer[]) {
  console.log("=========================================");

  await figlet.text(`${listOfFighters[1].name}`, function (err, endMessage) {
    if (err) {
      console.log("Error with end message");
      console.dir(err);
      return;
    }
    console.log(colors.red(endMessage));
    console.log("\n");
  });

  // display life bar
  console.log(`${listOfFighters[0].name}`);
  displayHP(listOfFighters[0]);
  console.log(listOfFighters[1].name);
  displayHP(listOfFighters[1]);
}
