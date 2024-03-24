import { Rarity, Character, currentPlayer } from "./interfaces";
import { cliProgress, colors, Enquirer } from "./lib";
import { getJson, getCharacter } from "./start";

// fonction pour afficher niveau de vie
export function displayHP(currentCharacter: currentPlayer) {
  try {
    const currentHP: number = currentCharacter.currenthp;
    const maxHP: number = currentCharacter.maxhp;

    // change de couleur à <50% de maxHP, puis à <30% de maxHP
    let format: string = "";

    if (currentHP >= maxHP * 0.5) {
      format = colors.green("{bar}") + " {value}/{total} HP";
    } else if (currentHP > maxHP * 0.3 && currentHP < maxHP * 0.5) {
      format = colors.yellow("{bar}") + " {value}/{total} HP";
    } else {
      format = colors.red("{bar}") + " {value}/{total} HP";
    }

    // definition de la barre de vie
    const lifeBar = new cliProgress.SingleBar({
      format: format,
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
      hideCursor: true,
    });

    // initialisation de la bar
    lifeBar.start(maxHP, 0, {
      speed: "N/A",
    });

    // maj de la valeur avec currentHP
    lifeBar.increment();
    lifeBar.update(currentHP);
    lifeBar.stop();

    console.log("");
  } catch {
    console.error("Error: struggling to display HP");
  }
}

// fonction attack : deals damage to the opponent equal to the STR stat of the character
export async function attack(listOfFighters: currentPlayer[]) {
  if (listOfFighters[1].currenthp > listOfFighters[0].str) {
    console.log(
      `You attacked the ${listOfFighters[1].name} and dealt ${listOfFighters[0].str} damages!`
    );
    listOfFighters[1].currenthp -= listOfFighters[0].str;
  } else {
    listOfFighters[1].currenthp = 0;
  }

  return listOfFighters;
}

// fonction heal : will heal the character by half of his maximum HP
export async function heal(listOfFighters: currentPlayer[]) {
  if (listOfFighters[0].currenthp < 0.5 * listOfFighters[0].maxhp) {
    console.log(`You used heal and gain ${0.5 * listOfFighters[0].maxhp} HP!`);
    listOfFighters[0].currenthp += 0.5 * listOfFighters[0].maxhp;
  } else {
    listOfFighters[0].currenthp = listOfFighters[0].maxhp;
  }

  return listOfFighters;
}

// fonction d'attaque de l'opposant
export async function opponentAttack(listOfFighters: currentPlayer[]) {
  if (listOfFighters[0].currenthp > listOfFighters[1].str) {
    console.log(
      `The ${listOfFighters[1].name} attacked and dealt ${listOfFighters[1].str} damages!`
    );
    listOfFighters[0].currenthp -= listOfFighters[1].str;
  } else {
    listOfFighters[0].currenthp = 0;
  }

  return listOfFighters;
}

//fonction qui permet de choisir des options entre attack et heal
export async function getAction() {
  const askAction = new Enquirer.Select({
    name: "action",
    message: "What do you do :",
    choices: ["Attack", "Heal"],
  });

  let action: string = askAction.run();

  return action;
}
