import { askEndGame, endGame, fightEndMessage } from "./end";
import { displayBoss, initBoss } from "./bosses";
import { launchAllFloors, launchFloorFights } from "./floor";
import { currentPlayer } from "./interfaces";

export default async function base_game(mode: string) {
  let listOfFighters: currentPlayer[] = [];
  console.clear();
  await launchAllFloors(mode);
  console.clear();
}
