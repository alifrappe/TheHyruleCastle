import {
  difficultMode,
  difficultyType,
  insaneMode,
} from "../basic_game_customisation/basic_game_customisation";
import { getAction, attack, heal, opponentAttack, displayHP } from "./action";
import { askEndGame, endGame, fightEndMessage } from "./end";
import { Rarity, Character, currentPlayer } from "./interfaces";
import { cliProgress, colors, Enquirer } from "./lib";
import { getJson, getCharacter } from "./start";
import { displayBoss, initBoss } from "./bosses";

// fonction pour initialiser un floor
export function initFloor(player: currentPlayer, mode: string) {
  const enemies: Character[] = getJson("./json/enemies.json");

  let listOfFighters: currentPlayer[] = [];
  const opponent = getCharacter(enemies, "enemi");

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

  // display life bar
  console.log(`${listOfFighters[0].name}`);
  displayHP(listOfFighters[0]);
  console.log(listOfFighters[1].name);
  displayHP(listOfFighters[1]);

  return listOfFighters;
}

//fonction combat
export async function launchFight(
  listOfFighters: currentPlayer[],
  nbFloor: number
) {
  // attaque player
  if ((await getAction()) === "Attack") {
    listOfFighters = await attack(listOfFighters);
  } else if ((await getAction()) === "Heal") {
    listOfFighters = await heal(listOfFighters);
  }

  // attaque opponent
  listOfFighters = await opponentAttack(listOfFighters);

  // display life bar
  console.log(`${listOfFighters[0].name}`);
  displayHP(listOfFighters[0]);

  console.log(listOfFighters[1].name);
  displayHP(listOfFighters[1]);

  return listOfFighters;
}

//fonction qui lance un niveau (i.e. floor)
export async function launchFloorFights(listOfFighters: currentPlayer[]) {
  let hp_player: number = listOfFighters[0].currenthp;
  let hp_opponent: number = listOfFighters[1].currenthp;
  let nbRound: number = 1;

  do {
    listOfFighters = await launchFight(listOfFighters, nbRound);
    hp_player = listOfFighters[0].currenthp;
    hp_opponent = listOfFighters[1].currenthp;
    nbRound++;
  } while (hp_opponent > 0 && hp_player > 0);

  return listOfFighters;
}

// fonction qui lance tous les floors
export async function launchAllFloors(mode) {
  const characters: Character[] = getJson("./json/players.json");
  const player = getCharacter(characters, "player");

  for (let i = 9; i < 11; i++) {
    console.log(`=========== FLOOR ${i + 1} ===========`);
    if (player) {
      let listOfFighters = initFloor(player, mode);

      listOfFighters = await launchFloorFights(listOfFighters);
      // setTimeout({console.log(" ")
      // }, 1000);

      if (fightEndMessage(listOfFighters) == "end") {
        console.clear();
        const choice: string = await askEndGame(listOfFighters);
        endGame(choice);
        break;
      }
    }

    if (i == 10) {
      let listOfFighters = initBoss(mode);
      await displayBoss(listOfFighters);
      listOfFighters = await launchFloorFights(listOfFighters);
      const situation = fightEndMessage(listOfFighters);
      if (fightEndMessage(listOfFighters) == "end") {
        console.clear();
        const choice: string = await askEndGame(listOfFighters);
        endGame(choice);
      }
    }
  }
  return;
}
