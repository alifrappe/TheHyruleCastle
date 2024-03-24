import * as bgc from "./basic_game_customisation/basic_game_customisation";
import { Rarity, Character } from "./base_game/interfaces";
import { getJson } from "./base_game/start";
import base_game from "./base_game/base_game";
import { colors } from "./base_game/lib";

export async function initGame() {
  const characters: Character[] = getJson("./json/players.json");
  const enemies: Character[] = getJson("./json/enemies.json");

  console.clear();
  await bgc.printTitleScreen(); // print message de bienvenue

  const mode: string = await bgc.difficultyType(); // set difficulty

  base_game(mode);
}

initGame();
