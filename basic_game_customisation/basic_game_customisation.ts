import { quitError, defaultError } from "./errors";
import { rl, cliProgress, colors, Enquirer, figlet } from "../base_game/lib";
import { Character, currentPlayer } from "../base_game/interfaces";

// fonction qui démarre le jeu avec title screen
export async function printTitleScreen() {
  await figlet.text(
    "Welcome to\nThe hyrule Castle",
    function (err, welcomeMessage) {
      if (err) {
        console.log("Error with screen title");
        console.dir(err);
        return;
      }
      console.log(colors.green(welcomeMessage));
      console.log("\n");
    }
  );
}

// fontion qui permet à l'utilisateur son mode de jeu
export async function difficultyType() {
  const level = new Enquirer.Select({
    name: "difficulty",
    message: "Set the difficulty : ",
    choices: ["Normal", "Difficult", "Insane"],
  });

  let choice: string = level.run();
  return choice;
}

//fonction qui définie le mode difficile : every enemy statistics is multiplied by 1.5
export function difficultMode(listOfFighters: currentPlayer[]) {
  listOfFighters[1].maxhp = listOfFighters[1].maxhp * 1.5;
  listOfFighters[1].currenthp = listOfFighters[1].currenthp * 1.5;
  listOfFighters[1].str = listOfFighters[1].str * 1.5;
  return listOfFighters;
}

// fonction qui définie le mode insane : every enemy statistics is multiplied by 2
export function insaneMode(listOfFighters: currentPlayer[]) {
  listOfFighters[1].maxhp = listOfFighters[1].maxhp * 2;
  listOfFighters[1].currenthp = listOfFighters[1].currenthp * 2;
  listOfFighters[1].str = listOfFighters[1].str * 2;
  return listOfFighters;
}
