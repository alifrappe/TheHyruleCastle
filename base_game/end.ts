import { rl, cliProgress, colors, Enquirer, figlet } from "./lib";
import { Rarity, Character, currentPlayer } from "./interfaces";
import { initGame } from "../game";

// fonction pour faire apparaître message avec figlet
export async function DefeatMessage(message) {
  await figlet.text(message, function (err, endMessage) {
    if (err) {
      console.log("Error with end message");
      console.dir(err);
      return;
    }
    console.log(colors.blue(endMessage));
    console.log("\n");
  });
}

// fonction pour afficher message à la fin d'un combat
export function fightEndMessage(listOfFighters: currentPlayer[]) {
  if (listOfFighters[0].currenthp == 0) {
    DefeatMessage("You died !");
    return "end";
  } else if (listOfFighters[1].currenthp == 0) {
    DefeatMessage("You Win! ");
    return "continue";
  }
}

//
export async function askEndGame(listOfFighters: currentPlayer[]) {
  const askAction = new Enquirer.Select({
    name: "end",
    message: "Do you want to restart ?",
    choices: ["Yes", "No"],
  });

  fightEndMessage(listOfFighters);
  const action: string = await askAction.run();

  return action;
}

export function endGame(action: string) {
  if (action === "Yes") {
    console.clear();
    return initGame();
  } else {
    return console.log("See you next time!");
  }
}
